import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // Revalidate the entire site when content changes
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
