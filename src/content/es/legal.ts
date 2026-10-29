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
    outline: [
      "Quién opera el sitio web y cómo contactarle",
      "Finalidad del sitio (información general; no es una solicitud ni una inscripción)",
      "Uso del contenido y propiedad intelectual",
      "Enlaces a sitios de terceros (Medicare.gov, proveedor de agenda…)",
      "Limitación de responsabilidad",
      "Ley y estado aplicables",
      "Cambios en estos términos y fecha de entrada en vigor",
    ],
    sections: [],
  },
  disclosures: {
    metaTitle: "Avisos legales",
    metaDescription: "Avisos importantes sobre este sitio web y la información que contiene.",
    title: "Avisos legales",
    lead: "Información importante sobre este sitio web.",
    nonAffiliation:
      "Este sitio web lo opera {brand}, un negocio privado de seguros médicos. No está vinculado con el gobierno de EE. UU., el programa federal Medicare ni ninguna agencia estatal de Medicaid, ni cuenta con su respaldo.",
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
