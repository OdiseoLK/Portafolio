import type { Metadata } from 'next';
import LegalShell, { LegalSection } from '@/components/layout/LegalShell';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad — ODISEO',
  description:
    'Aviso de privacidad de ODISEO: qué datos personales se recaban, con qué finalidad y cómo ejercer tus derechos ARCO.',
};

export default function PrivacidadPage() {
  return (
    <LegalShell title="Aviso de Privacidad" updated="Agosto 2026">
      <LegalSection title="Responsable del tratamiento">
        <p>
          Alexis, titular de la marca personal ODISEO, con residencia en Orizaba, Veracruz,
          México, es el responsable del tratamiento de los datos personales que se recaban a
          través de este sitio web, de conformidad con la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares (LFPDPPP).
        </p>
      </LegalSection>

      <LegalSection title="Datos que se recaban">
        <p>
          Este sitio recaba únicamente los datos que tú proporcionas de manera voluntaria a
          través de sus formularios: en el formulario de contacto, tu nombre, correo electrónico
          y el mensaje que escribas; en el formulario de testimonios, tu nombre, tu puesto o
          empresa (opcional) y el testimonio que compartas. Si un testimonio incluye fotografía,
          esta se agrega únicamente con autorización de la persona.
        </p>
        <p>
          No se recaban datos personales sensibles, ni datos financieros o patrimoniales de
          ningún tipo.
        </p>
      </LegalSection>

      <LegalSection title="Finalidades del tratamiento">
        <p>
          Los datos del formulario de contacto se utilizan exclusivamente para responder a tu
          mensaje y dar seguimiento a la conversación que tú inicies. Los datos del formulario de
          testimonios se utilizan para, previa revisión y aprobación manual, publicar tu
          testimonio en la sección correspondiente de este sitio. Ningún dato se utiliza con
          fines publicitarios ni se envían comunicaciones no solicitadas.
        </p>
      </LegalSection>

      <LegalSection title="Transferencias y almacenamiento">
        <p>
          Tus datos no se venden, rentan ni comparten con terceros con fines comerciales. Para su
          almacenamiento se utiliza Supabase, un proveedor de infraestructura en la nube que
          actúa como encargado del tratamiento y aloja la información en servidores seguros con
          cifrado en tránsito. El sitio se sirve a través de Vercel.
        </p>
      </LegalSection>

      <LegalSection title="Cookies y analítica">
        <p>
          Este sitio no utiliza cookies de rastreo, publicidad o perfilado. La medición de
          visitas se realiza con Vercel Analytics, una herramienta que no usa cookies y recopila
          únicamente información agregada y anónima (como país de origen y páginas visitadas),
          sin identificar a personas concretas. Por esta razón no se solicita consentimiento de
          cookies: no hay cookies de seguimiento que consentir.
        </p>
      </LegalSection>

      <LegalSection title="Derechos ARCO">
        <p>
          En cualquier momento puedes ejercer tus derechos de Acceso, Rectificación, Cancelación
          u Oposición (ARCO) sobre tus datos personales, así como solicitar el retiro de un
          testimonio publicado. Para hacerlo, envía tu solicitud al correo{' '}
          <a
            href="mailto:Developerlk23@gmail.com"
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Developerlk23@gmail.com
          </a>{' '}
          indicando tu nombre y el derecho que deseas ejercer. Tu solicitud será atendida en un
          plazo máximo de 20 días hábiles.
        </p>
      </LegalSection>

      <LegalSection title="Cambios a este aviso">
        <p>
          Este aviso puede actualizarse para reflejar cambios en el sitio o en la legislación
          aplicable. Cualquier modificación se publicará en esta misma página con su fecha de
          actualización.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
