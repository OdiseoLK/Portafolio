import type { Metadata } from 'next';
import LegalShell, { LegalSection } from '@/components/layout/LegalShell';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — ODISEO',
  description:
    'Términos y condiciones de uso del sitio de ODISEO: propiedad intelectual, testimonios, responsabilidad y contacto.',
};

export default function TerminosPage() {
  return (
    <LegalShell title="Términos y Condiciones" updated="Agosto 2026">
      <LegalSection title="Sobre este sitio">
        <p>
          Este sitio es el portafolio profesional de Alexis (ODISEO), desarrollador web con sede
          en Orizaba, Veracruz, México. Al navegarlo aceptas estos términos. Su propósito es
          mostrar trabajo realizado, habilidades y medios de contacto; el uso del sitio es
          gratuito y no requiere registro.
        </p>
      </LegalSection>

      <LegalSection title="Propiedad intelectual">
        <p>
          El diseño, el código, los textos y los elementos gráficos de este sitio son propiedad
          de su autor, salvo que se indique lo contrario. Los proyectos mostrados en el
          portafolio fueron desarrollados para clientes; las marcas, nombres comerciales y
          logotipos de dichos clientes pertenecen a sus respectivos titulares y se muestran
          únicamente con fines ilustrativos del trabajo realizado. Los iconos de tecnologías
          pertenecen a sus respectivas marcas.
        </p>
        <p>
          No está permitido reproducir o reutilizar el contenido de este sitio con fines
          comerciales sin autorización previa por escrito.
        </p>
      </LegalSection>

      <LegalSection title="Testimonios">
        <p>
          Al enviar un testimonio a través del formulario correspondiente, autorizas su
          publicación en este sitio junto con el nombre y el puesto o empresa que tú mismo
          proporciones. Todos los testimonios pasan por una revisión manual antes de publicarse y
          pueden ser editados por extensión o rechazados si contienen lenguaje inapropiado.
          Puedes solicitar la modificación o el retiro de tu testimonio en cualquier momento
          escribiendo al correo de contacto.
        </p>
      </LegalSection>

      <LegalSection title="Limitación de responsabilidad">
        <p>
          La información de este sitio se ofrece de buena fe y con fines informativos. Aunque se
          procura mantenerla precisa y actualizada, no se garantiza la ausencia de errores ni la
          disponibilidad ininterrumpida del sitio. Los enlaces a sitios externos (como proyectos
          en vivo o repositorios) se proporcionan por conveniencia; su contenido es
          responsabilidad de sus respectivos titulares.
        </p>
      </LegalSection>

      <LegalSection title="Privacidad">
        <p>
          El tratamiento de los datos personales recabados a través de los formularios de este
          sitio se rige por el{' '}
          <a
            href="/privacidad"
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Aviso de Privacidad
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Legislación aplicable">
        <p>
          Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier
          controversia se resolverá preferentemente de manera amistosa a través del correo de
          contacto:{' '}
          <a
            href="mailto:Developerlk23@gmail.com"
            className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
          >
            Developerlk23@gmail.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
