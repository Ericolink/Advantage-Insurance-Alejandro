// Páginas de servicios (español). Texto general y educativo — PENDIENTE de revisión de cumplimiento.
// No añada precios, primas, beneficios concretos, nombres de aseguradoras ni promesas de elegibilidad.
import type { ServiceId } from "@/config/types";
import type { ServiceContent } from "../types";

const medicareGov = { label: "Medicare.gov en español — sitio oficial del gobierno de EE. UU. para Medicare", href: "https://es.medicare.gov/" };
const ship = { label: "SHIP — programas estatales gratuitos e imparciales de asistencia sobre seguros médicos (en inglés)", href: "https://www.shiphelp.org/" };
const medicaidGov = { label: "Medicaid.gov — información federal oficial sobre Medicaid (en inglés)", href: "https://www.medicaid.gov/" };
const cuidadoDeSalud = { label: "CuidadoDeSalud.gov — Mercado de Seguros Médicos oficial", href: "https://www.cuidadodesalud.gov/es/" };
const ssa = { label: "Administración del Seguro Social — inscripción en Medicare", href: "https://www.ssa.gov/espanol/" };

export const services: Record<ServiceId, ServiceContent> = {
  "medicare-advantage": {
    title: "Medicare y Medicare Advantage",
    cardText: "Entienda cómo funcionan Medicare Original y los planes Medicare Advantage, y qué preguntas hacer.",
    metaTitle: "Medicare y Medicare Advantage",
    metaDescription: "Explicación sencilla de Medicare Original y Medicare Advantage (Parte C), y cómo solicitar orientación.",
    lead: "Medicare ofrece más de una forma de recibir su cobertura. Conocer las diferencias básicas facilita la conversación sobre sus opciones.",
    sections: [
      {
        heading: "Medicare Original",
        paragraphs: [
          "Medicare Original lo administra el gobierno federal. Incluye la Parte A (seguro de hospital) y la Parte B (seguro médico).",
          "Muchas personas añaden un plan aparte de la Parte D para medicamentos recetados y, en algunos casos, una póliza Medicare Suplementario (Medigap) para ayudar con algunos gastos de bolsillo.",
        ],
      },
      {
        heading: "Medicare Advantage (Parte C)",
        paragraphs: [
          "Los planes Medicare Advantage los ofrecen compañías privadas aprobadas por Medicare. Combinan la cobertura de la Parte A y la Parte B en un solo plan, y muchos incluyen cobertura de medicamentos.",
          "Cada plan tiene su propia red, reglas, costos y beneficios, y la disponibilidad depende de dónde vive. Por eso conviene revisar los detalles de cada plan antes de decidir.",
        ],
      },
    ],
    whoFor: [
      "Personas que ya tienen Medicare y quieren entender sus opciones.",
      "Personas que están por cumplir los requisitos para Medicare.",
      "Familiares que ayudan a un padre, una madre o un pariente a revisar su cobertura.",
    ],
    faqs: [
      {
        q: "¿Pierdo Medicare Original si me inscribo en un plan Medicare Advantage?",
        a: "Usted sigue teniendo Medicare, pero el plan Medicare Advantage le brinda la cobertura de la Parte A y la Parte B con sus propias reglas. Su situación puede revisarse en una conversación.",
      },
      {
        q: "¿Puede un agente decirme cuál es el mejor plan?",
        a: "Un agente puede explicarle las opciones disponibles para usted y cómo se comparan en los puntos que a usted le importan. La decisión siempre es suya.",
      },
    ],
    officialLinks: [medicareGov, ship],
  },
  "medicare-supplement": {
    title: "Medicare Suplementario (Medigap)",
    cardText: "Conozca cómo funcionan las pólizas Medigap junto con Medicare Original.",
    metaTitle: "Medicare Suplementario (Medigap)",
    metaDescription: "Explicación sencilla del seguro Medicare Suplementario (Medigap) y cómo funciona con Medicare Original.",
    lead: "El seguro Medicare Suplementario, también llamado Medigap, lo venden compañías privadas y funciona junto con Medicare Original.",
    sections: [
      {
        heading: "Qué hace Medigap",
        paragraphs: [
          "Una póliza Medigap puede ayudar a pagar algunos costos que Medicare Original no cubre, como ciertos copagos, coseguros y deducibles.",
          "Las pólizas Medigap funcionan solo con Medicare Original. No funcionan con los planes Medicare Advantage y, por lo general, no incluyen cobertura de medicamentos recetados.",
        ],
      },
      {
        heading: "Planes estandarizados",
        paragraphs: [
          "En la mayoría de los estados, los planes Medigap están estandarizados y se identifican con letras. Los planes con la misma letra ofrecen los mismos beneficios básicos, pero el precio puede variar entre compañías.",
          "Las reglas sobre cuándo puede comprar una póliza y cómo se fija su precio pueden variar. Conviene revisar estos detalles en una conversación.",
        ],
      },
    ],
    whoFor: [
      "Personas con Medicare Original que quieren entender cómo manejar los gastos de bolsillo.",
      "Personas que comparan Medicare Original con Medicare Advantage.",
    ],
    faqs: [
      {
        q: "¿Medigap incluye cobertura de medicamentos?",
        a: "Las pólizas Medigap que se venden hoy, por lo general, no incluyen cobertura de medicamentos recetados. Esa cobertura suele obtenerse con un plan aparte de la Parte D.",
      },
    ],
    officialLinks: [medicareGov, ship],
  },
  "part-d": {
    title: "Medicare Parte D (medicamentos recetados)",
    cardText: "Conozca lo básico de la cobertura de medicamentos de Medicare y qué revisar en un plan.",
    metaTitle: "Cobertura de medicamentos de Medicare Parte D",
    metaDescription: "Explicación sencilla de la cobertura de medicamentos de Medicare Parte D y las preguntas que conviene hacer.",
    lead: "La cobertura de medicamentos de Medicare (Parte D) ayuda a pagar medicamentos recetados. La ofrecen compañías privadas aprobadas por Medicare.",
    sections: [
      {
        heading: "Cómo obtener cobertura de medicamentos",
        paragraphs: [
          "Si tiene Medicare Original, puede inscribirse en un plan aparte de la Parte D. Muchos planes Medicare Advantage ya incluyen cobertura de medicamentos.",
          "Cada plan tiene una lista de medicamentos cubiertos (llamada formulario) y sus propios costos y reglas de farmacias. Los planes pueden cambiar de un año a otro.",
        ],
      },
      {
        heading: "Por qué importan las fechas",
        paragraphs: [
          "Si pasa un tiempo sin la Parte D u otra cobertura de medicamentos acreditable después de cumplir los requisitos por primera vez, es posible que deba pagar una multa por inscripción tardía. Pregunte por su situación antes de decidir.",
        ],
      },
    ],
    whoFor: [
      "Personas con Medicare Original que revisan su cobertura de medicamentos.",
      "Personas cuyas recetas han cambiado y quieren entender su cobertura.",
    ],
    faqs: [
      {
        q: "¿Debo enviar mi lista de medicamentos por el sitio web?",
        a: "No. Por favor, no envíe información médica por el sitio web. Puede revisarla durante su conversación.",
      },
    ],
    officialLinks: [medicareGov, ship],
  },
  "dual-eligible": {
    title: "Medicare y Medicaid (doble elegibilidad) y D-SNP",
    cardText: "Información general para personas que podrían calificar para Medicare y Medicaid a la vez.",
    metaTitle: "Doble elegibilidad (Medicare y Medicaid) y planes D-SNP",
    metaDescription: "Explicación sencilla de la doble elegibilidad y de los Planes para Necesidades Especiales Duales (D-SNP).",
    lead: "Algunas personas califican tanto para Medicare como para Medicaid. A menudo se les llama personas con “doble elegibilidad”.",
    sections: [
      {
        heading: "Qué significa la doble elegibilidad",
        paragraphs: [
          "Medicare y Medicaid son programas distintos. Cuando una persona califica para ambos, los dos programas pueden trabajar juntos para cubrir los costos de atención médica.",
          "La elegibilidad para Medicaid la decide cada estado, según sus propias reglas.",
        ],
      },
      {
        heading: "Planes para Necesidades Especiales Duales (D-SNP)",
        paragraphs: [
          "Un D-SNP es un tipo de plan Medicare Advantage diseñado para personas que tienen Medicare y Medicaid. La disponibilidad y los beneficios varían según la ubicación.",
        ],
      },
    ],
    whoFor: [
      "Personas que tienen, o podrían tener, Medicare y Medicaid a la vez.",
      "Familiares y cuidadores que ayudan con las decisiones de cobertura.",
    ],
    faqs: [
      {
        q: "¿Cómo sé si califico para Medicaid?",
        a: "La elegibilidad para Medicaid la determina la agencia de Medicaid de su estado. Un agente puede darle información general, pero no puede decidir su elegibilidad.",
      },
    ],
    officialLinks: [medicareGov, medicaidGov, ship],
  },
  medicaid: {
    title: "Medicaid",
    cardText: "Información general sobre Medicaid y dónde encontrar respuestas oficiales.",
    metaTitle: "Medicaid",
    metaDescription: "Explicación sencilla de Medicaid y recursos oficiales.",
    lead: "Medicaid es un programa que administra cada estado, con participación federal, y que ayuda a cubrir costos de atención médica de las personas que califican.",
    sections: [
      {
        heading: "Cada estado tiene sus propias reglas",
        paragraphs: [
          "La elegibilidad, los beneficios y la forma de solicitarlo dependen del estado donde vive. La agencia de Medicaid de su estado toma la decisión final sobre la elegibilidad.",
          "Algunos estados ofrecen Medicaid a través de planes de atención administrada operados por compañías privadas.",
        ],
      },
    ],
    whoFor: [
      "Personas que quieren entender cómo funciona Medicaid en su estado.",
      "Personas que tienen Medicare y quieren saber sobre Medicaid.",
    ],
    faqs: [
      {
        q: "¿Puedo solicitar Medicaid en este sitio web?",
        a: "No. Este sitio web no tramita solicitudes. Las solicitudes oficiales se presentan ante la agencia de Medicaid de su estado.",
      },
    ],
    officialLinks: [medicaidGov, cuidadoDeSalud],
  },
  "aca-marketplace": {
    title: "Seguro del Mercado (ACA / Obamacare)",
    cardText: "Conozca lo básico de la cobertura individual y familiar a través del Mercado de Seguros Médicos.",
    metaTitle: "Seguro médico del Mercado (ACA / Obamacare)",
    metaDescription: "Explicación sencilla de la cobertura del Mercado de Seguros Médicos bajo la Ley de Cuidado de Salud a Bajo Precio.",
    lead: "El Mercado de Seguros Médicos, creado por la Ley de Cuidado de Salud a Bajo Precio (ACA, también conocida como “Obamacare”), ofrece cobertura para personas y familias.",
    sections: [
      {
        heading: "Cómo funciona el Mercado",
        paragraphs: [
          "Por lo general, puede inscribirse o cambiar de plan durante el Período de Inscripción Abierta de cada año. Fuera de ese período, podría inscribirse si tiene ciertos eventos de vida, como perder otra cobertura.",
          "Según su hogar y sus ingresos, podría calificar para ahorros. La elegibilidad para los ahorros se determina mediante la solicitud oficial.",
        ],
      },
    ],
    whoFor: [
      "Personas y familias sin cobertura a través del trabajo o de Medicare.",
      "Personas que tuvieron un cambio en su vida y necesitan revisar su cobertura.",
    ],
    faqs: [
      {
        q: "¿Este sitio web es el Mercado oficial?",
        a: "No. El Mercado oficial es CuidadoDeSalud.gov (HealthCare.gov) o la plataforma oficial de su estado.",
      },
    ],
    officialLinks: [cuidadoDeSalud],
  },
  "turning-65": {
    title: "Cumplir 65 años",
    cardText: "¿Está por cumplir 65? Conozca cuándo empezar a informarse sobre Medicare y qué preparar.",
    metaTitle: "Cumplir 65: cómo prepararse para Medicare",
    metaDescription: "Información general para personas cerca de los 65 años que empiezan a informarse sobre Medicare.",
    lead: "Al cumplir 65 años, muchas personas reúnen por primera vez los requisitos para Medicare. Empezar con tiempo le permite entender sus opciones.",
    sections: [
      {
        heading: "Su Período de Inscripción Inicial",
        paragraphs: [
          "Para la mayoría de las personas, el Período de Inscripción Inicial dura siete meses: empieza tres meses antes del mes en que cumple 65 años, incluye el mes de su cumpleaños y termina tres meses después.",
          "Algunas personas quedan inscritas automáticamente, por ejemplo, si ya reciben beneficios del Seguro Social. Otras deben inscribirse. Si usted o su cónyuge siguen trabajando y tienen cobertura del empleador, las reglas pueden ser distintas.",
        ],
      },
      {
        heading: "Cómo empezar",
        paragraphs: ["Lea la guía general para personas nuevas en Medicare y anote sus preguntas antes de hablar con un agente."],
      },
    ],
    whoFor: [
      "Personas que cumplirán 65 años en los próximos meses.",
      "Hijos adultos que ayudan a su padre o madre a prepararse para Medicare.",
    ],
    faqs: [
      {
        q: "¿Cuándo debo empezar a informarme sobre Medicare?",
        a: "Muchas personas empiezan unos meses antes de que comience su Período de Inscripción Inicial. Sus fechas concretas pueden revisarse en una conversación o en Medicare.gov.",
      },
    ],
    officialLinks: [medicareGov, ssa, ship],
  },
};
