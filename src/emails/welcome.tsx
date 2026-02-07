import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  email?: string;
}

export default function WelcomeEmail({ email = "suscriptor@ejemplo.com" }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenido a SPNG Media - Tu fuente de noticias de Chile</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>SPNG Media</Heading>
          <Hr style={hr} />

          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Bienvenido a nuestro newsletter
            </Heading>
            <Text style={text}>
              Gracias por suscribirte a SPNG Media. A partir de ahora recibiras
              las noticias mas importantes de Chile directamente en tu bandeja de
              entrada.
            </Text>
            <Text style={text}>
              Te enviaremos un resumen diario con lo mas relevante en politica,
              deportes, internacional y mucho mas.
            </Text>
          </Section>

          <Section style={buttonSection}>
            <Link href="https://spng.stream" style={button}>
              Visitar SPNG Media
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Recibiste este correo porque te suscribiste con {email}.
            <br />
            <Link href="https://spng.stream" style={footerLink}>
              SPNG Media
            </Link>{" "}
            - Portal de Noticias de Chile
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fafafa",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const heading = {
  color: "#0a0a0a",
  fontSize: "32px",
  fontWeight: "700" as const,
  textAlign: "center" as const,
  margin: "0 0 20px",
};

const subheading = {
  color: "#0a0a0a",
  fontSize: "20px",
  fontWeight: "600" as const,
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "20px 0",
};

const section = {
  padding: "0 20px",
};

const text = {
  color: "#404040",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 12px",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#84cc16",
  borderRadius: "6px",
  color: "#0a0a0a",
  fontSize: "14px",
  fontWeight: "600" as const,
  padding: "12px 24px",
  textDecoration: "none",
};

const footer = {
  color: "#a3a3a3",
  fontSize: "12px",
  lineHeight: "1.5",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#84cc16",
  textDecoration: "underline",
};
