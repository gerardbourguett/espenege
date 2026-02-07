import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Email invalido"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noticias@spng.stream";

    if (!apiKey) {
      // Mock success when no API key configured
      return NextResponse.json({ success: true, message: "Suscripcion exitosa (modo demo)" });
    }

    // Add contact to Resend Audience
    if (audienceId) {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);

      await resend.contacts.create({
        email,
        audienceId,
      });

      // Send welcome email
      const WelcomeEmail = (await import("@/emails/welcome")).default;

      await resend.emails.send({
        from: `SPNG Media <${fromEmail}>`,
        to: email,
        subject: "Bienvenido a SPNG Media",
        react: WelcomeEmail({ email }),
      });
    }

    return NextResponse.json({ success: true, message: "Suscripcion exitosa" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues;
      return NextResponse.json(
        { success: false, message: issues[0]?.message || "Email invalido" },
        { status: 400 }
      );
    }

    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, message: "Error al procesar la suscripcion" },
      { status: 500 }
    );
  }
}
