// Aviso de privacidad y avisos legales (español). BORRADORES — PENDIENTES de revisión legal y de cumplimiento.
// El texto TPMO NO está aquí: viene de site.ts.
import type { LegalContent } from "../types";

export const legal: LegalContent = {
  privacy: {
    metaTitle: "Aviso de privacidad",
    metaDescription: "Cómo trata este sitio web la información que usted envía mediante el formulario de contacto.",
    title: "Aviso de privacidad",
    lead: "Este aviso explica qué información recoge este sitio web y cómo se utiliza.",
    updated: "Última actualización: pendiente de aprobación",
    sections: [
      {
        heading: "Responsable",
        paragraphs: ["Este sitio web lo opera {brand}. Puede contactarnos con los datos que aparecen en la página de contacto."],
      },
      {
        heading: "Información que usted nos envía",
        paragraphs: ["Cuando usa el formulario de contacto, solo recogemos:"],
        list: [
          "Su nombre y número de teléfono.",
          "Su correo electrónico, si decide indicarlo.",
          "El mejor horario para llamarle y el tema general de su consulta.",
          "Un mensaje breve, si decide escribirlo.",
          "Su aceptación de ser contactado/a, el idioma de la página y la fecha y hora de la solicitud.",
        ],
      },
      {
        heading: "Información que no pedimos",
        paragraphs: [
          "El formulario no pide números de Medicare o del Seguro Social, fechas de nacimiento, ingresos, diagnósticos, medicamentos ni otra información médica. Por favor, no los incluya.",
        ],
      },
      {
        heading: "Cómo la usamos",
        paragraphs: [
          "Usamos su información solo para responder a su solicitud. No vendemos su información personal.",
          "Para entregar las solicitudes, el sitio utiliza proveedores de servicios (por ejemplo, alojamiento web y envío de correos). Ellos tratan la información solo para prestar ese servicio.",
        ],
      },
      {
        heading: "Cookies y analítica",
        paragraphs: [
          "El sitio guarda una cookie con su preferencia de idioma.",
          "Si se activa, Google Analytics se usa solo después de que usted lo permita, para contar visitas y clics en los botones de contacto. Nunca se envían a la analítica su nombre, teléfono, correo ni las respuestas del formulario. Puede cambiar su elección en “Preferencias de analítica”, al final de cada página.",
          "Si abre el calendario de citas, lo proporciona un tercero bajo su propia política de privacidad.",
        ],
      },
      {
        heading: "Cuánto tiempo la conservamos",
        paragraphs: ["Plazo de conservación pendiente de definir por el negocio."],
      },
      {
        heading: "Sus opciones",
        paragraphs: ["Puede pedirnos en cualquier momento que dejemos de contactarle, o que corrijamos o eliminemos la información que nos envió."],
      },
    ],
  },
  terms: {
    metaTitle: "Términos de uso",
    metaDescription: "Términos que se aplican al uso de este sitio web.",
    title: "Términos de uso",
    lead: "Los términos que se aplican cuando usted usa este sitio web.",
    updated: "Última actualización: 29 de octubre de 2026",
    outline: [
      "Quién opera el sitio web y cómo contactarle",
      "Finalidad del sitio (información general; no es una solicitud ni una inscripción)",
      "Uso del contenido y propiedad intelectual",
      "Enlaces a sitios de terceros (Medicare.gov, proveedor de agenda…)",
      "Limitación de responsabilidad",
      "Ley y estado aplicables",
      "Cambios en estos términos y fecha de entrada en vigor",
    ],
    // Texto proporcionado el 29 de octubre de 2026. Pendiente de aprobación (site.approvals.terms).
    sections: [
      {
        heading: "1. Información general y responsable del sitio web",
        paragraphs: [
          "Este sitio web es operado por **{name}**, agente privado de seguros médicos que ofrece información y orientación sobre opciones de cobertura médica en Estados Unidos.",
          "Para consultas relacionadas con este sitio web, puede comunicarse mediante los siguientes canales:",
        ],
        listStyle: "bullet",
        list: ["**Nombre:** {name}", "**Teléfono:** {phone}", "**Correo electrónico:** {email}", "**Sitio web:** {website}"],
        after: [
          "Al utilizar este sitio web, usted reconoce que ha leído estos Términos de uso. Si no está de acuerdo con ellos, deberá abstenerse de utilizar el sitio.",
        ],
      },
      {
        heading: "2. Finalidad del sitio web",
        paragraphs: [
          "El propósito de este sitio web es proporcionar información general sobre seguros médicos, opciones de cobertura y servicios de orientación relacionados con Medicare, Medicaid y los planes de seguro médico disponibles a través del Mercado de Seguros Médicos (ACA), según corresponda.",
          "La información publicada tiene fines informativos y comerciales. **La navegación por el sitio, el envío de un mensaje o la solicitud de información no constituyen por sí mismos una solicitud formal de seguro, una inscripción en un plan ni una confirmación de elegibilidad.**",
          "Cualquier solicitud, inscripción o cambio de cobertura deberá realizarse mediante los procedimientos oficiales correspondientes y estará sujeto a los requisitos, plazos y condiciones aplicables.",
          "El contenido de este sitio no sustituye los documentos oficiales de los planes, las condiciones de las pólizas ni la información proporcionada por las aseguradoras o los organismos gubernamentales competentes.",
        ],
      },
      {
        heading: "3. Uso permitido del sitio web",
        paragraphs: ["El usuario se compromete a utilizar este sitio de manera lícita y responsable. No deberá:"],
        listStyle: "bullet",
        list: [
          "Utilizar el sitio para actividades fraudulentas, ilegales o engañosas.",
          "Intentar acceder sin autorización a sistemas, cuentas o información restringida.",
          "Interferir con el funcionamiento, la seguridad o la disponibilidad del sitio.",
          "Enviar contenido malicioso, información deliberadamente falsa o comunicaciones que vulneren los derechos de terceros.",
        ],
        after: [
          "{name} se reserva el derecho de adoptar medidas razonables para proteger el sitio y a sus usuarios frente a usos indebidos, de conformidad con la legislación aplicable.",
        ],
      },
      {
        heading: "4. Propiedad intelectual",
        paragraphs: [
          "Salvo que se indique lo contrario, los textos, diseños, elementos gráficos, logotipos, fotografías y demás contenidos originales de este sitio web pertenecen a {name} o se utilizan con la autorización correspondiente.",
          "Queda prohibida la reproducción, distribución, modificación o utilización comercial de estos materiales sin autorización previa del titular de los derechos, excepto cuando la legislación aplicable lo permita.",
          "Los nombres, marcas, logotipos y materiales de aseguradoras, programas gubernamentales y terceros pertenecen a sus respectivos titulares. Su aparición en este sitio no implica necesariamente una relación de patrocinio, afiliación o respaldo.",
        ],
      },
      {
        heading: "5. Enlaces a sitios web de terceros",
        paragraphs: [
          "Este sitio puede incluir enlaces a páginas externas para facilitar el acceso a información adicional, recursos oficiales o servicios de terceros. Entre ellos pueden encontrarse:",
        ],
        listStyle: "bullet",
        list: [
          "Medicare: https://www.medicare.gov/",
          "Mercado de Seguros Médicos: https://www.healthcare.gov/",
          "Otros sitios de aseguradoras o proveedores de servicios, cuando corresponda.",
        ],
        after: [
          "Estos enlaces se proporcionan como recurso de consulta. {name} no controla necesariamente el contenido, la disponibilidad, las políticas de privacidad ni las prácticas de seguridad de dichos sitios.",
          "La inclusión de un enlace no implica respaldo, asociación comercial ni garantía sobre los productos o servicios ofrecidos por el tercero. El uso de las páginas externas se rige por sus propios términos y políticas.",
          "Si este sitio incorpora herramientas externas de agenda, formularios o comunicación, el usuario deberá revisar las condiciones aplicables de esos proveedores antes de utilizarlas.",
        ],
      },
      {
        heading: "6. Exactitud y disponibilidad de la información",
        paragraphs: [
          "Se procura mantener la información de este sitio actualizada y comprensible. Sin embargo, los beneficios, precios, requisitos de elegibilidad, períodos de inscripción y condiciones de los seguros pueden cambiar.",
          "No se garantiza que todo el contenido esté libre de errores, que se encuentre actualizado en todo momento o que el sitio permanezca disponible sin interrupciones.",
          "El usuario debe verificar la información relevante con la aseguradora, el organismo oficial o el proveedor correspondiente antes de tomar decisiones relacionadas con su cobertura médica.",
        ],
      },
      {
        heading: "7. Limitación de responsabilidad",
        paragraphs: [
          "En la medida permitida por la legislación aplicable, {name} no garantiza que el uso del sitio sea ininterrumpido, libre de errores o compatible con todos los dispositivos y sistemas.",
          "El contenido se proporciona con fines informativos generales y no constituye una garantía de cobertura, elegibilidad, aceptación de una solicitud ni disponibilidad de un producto específico.",
          "En la medida permitida por la ley, {name} no será responsable por pérdidas o daños derivados del uso o la imposibilidad de utilizar el sitio, de la confianza depositada exclusivamente en información general publicada en él o del contenido y funcionamiento de páginas externas.",
          "**Nada de lo dispuesto en esta sección excluye ni limita responsabilidades que legalmente no puedan excluirse o limitarse**, ni afecta los derechos que correspondan al consumidor conforme a la legislación aplicable.",
        ],
      },
      {
        heading: "8. Privacidad y protección de datos",
        paragraphs: [
          "El tratamiento de los datos personales que el usuario proporcione a través del sitio web se regirá por la Política de privacidad correspondiente.",
          "Se recomienda consultar dicha política antes de enviar información personal. Los datos relacionados con la salud, la cobertura médica u otras circunstancias sensibles deben proporcionarse únicamente cuando sea necesario y a través de los canales adecuados.",
          "Si se utilizan formularios, herramientas de agenda u otros servicios de terceros, podrán aplicarse también las políticas de privacidad de sus respectivos proveedores.",
        ],
      },
      {
        heading: "9. Ley aplicable y jurisdicción",
        paragraphs: [
          "Estos Términos de uso se interpretarán de conformidad con las leyes aplicables del Estado de Texas y las leyes federales de los Estados Unidos, según corresponda, sin perjuicio de las normas imperativas que resulten aplicables.",
          "Cualquier controversia relacionada con el uso de este sitio se resolverá ante los tribunales competentes conforme a la legislación aplicable.",
          "La determinación definitiva de la jurisdicción competente y cualquier disposición adicional sobre resolución de controversias deberá ser revisada por la asesoría legal del negocio.",
        ],
      },
      {
        heading: "10. Modificaciones de los términos",
        paragraphs: [
          "{name} podrá actualizar estos Términos de uso cuando sea necesario para reflejar cambios en el sitio web, los servicios ofrecidos o los requisitos legales aplicables.",
          "Las modificaciones se publicarán en esta página junto con la fecha de actualización correspondiente. Se recomienda a los usuarios revisar periódicamente este documento.",
          "Cuando la legislación aplicable exija notificación o consentimiento específico para determinados cambios, se seguirán los procedimientos correspondientes.",
        ],
      },
      {
        heading: "11. Contacto",
        paragraphs: ["Si tiene preguntas sobre estos Términos de uso, puede comunicarse a través de los siguientes medios:"],
        listStyle: "bullet",
        list: ["**Responsable:** {name}", "**Teléfono:** {phone}", "**Correo electrónico:** {email}"],
        after: ["**Fecha de entrada en vigor:** [Fecha de aprobación y publicación definitiva]."],
      },
    ],
  },
  disclosures: {
    metaTitle: "Avisos legales",
    metaDescription: "Avisos importantes sobre este sitio web y la información que contiene.",
    title: "Avisos legales",
    lead: "Información importante sobre este sitio web.",
    nonAffiliation:
      "Este sitio web es operado por {name}, agente de seguros médicos. No está afiliado, conectado ni respaldado por el gobierno de los Estados Unidos, Medicare ni ninguna agencia gubernamental estatal o federal, incluido Medicaid.",
    educational: {
      heading: "Información general",
      paragraphs: [
        "El contenido de este sitio web es general y educativo. No es una recomendación de ningún plan y no constituye asesoría legal, fiscal ni médica.",
        "La disponibilidad, los costos, los beneficios y las reglas de los planes varían según el plan y la ubicación, y pueden cambiar. Revise siempre los documentos oficiales del plan antes de tomar una decisión.",
        "Enviar una solicitud por este sitio web no es una solicitud de seguro y no le inscribe en ningún plan.",
      ],
    },
    aca: {
      heading: "Cobertura del Mercado (ACA)",
      paragraphs: [
        "Las solicitudes sobre cobertura del Mercado están sujetas al proceso de consentimiento y documentación que el negocio utiliza para el Mercado. La casilla de contacto de este sitio web no sustituye esos consentimientos.",
      ],
    },
    officialHeading: "Fuentes oficiales de información",
    officialLinks: [
      { label: "Medicare.gov en español", href: "https://es.medicare.gov/" },
      { label: "CuidadoDeSalud.gov", href: "https://www.cuidadodesalud.gov/es/" },
      { label: "Medicaid.gov (en inglés)", href: "https://www.medicaid.gov/" },
      { label: "SHIP — programas estatales de asistencia sobre seguros médicos (en inglés)", href: "https://www.shiphelp.org/" },
    ],
    medicareContact: "1-800-MEDICARE (1-800-633-4227), TTY 1-877-486-2048, las 24 horas, los 7 días de la semana.",
  },
};
