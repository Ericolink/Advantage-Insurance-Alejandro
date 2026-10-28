// Guía "Nuevo en Medicare" (español). Solo educativa — PENDIENTE de revisión de cumplimiento.
import type { GuideContent } from "../types";

export const guide: GuideContent = {
  metaTitle: "Nuevo en Medicare: guía en lenguaje sencillo",
  metaDescription: "Qué es Medicare, diferencias entre Medicare Original y Medicare Advantage, cobertura de medicamentos y preguntas para preparar.",
  title: "Nuevo en Medicare",
  lead: "Una guía breve y general para quienes empiezan a informarse sobre Medicare y para los familiares que les ayudan.",
  sections: [
    {
      heading: "¿Qué es Medicare?",
      paragraphs: [
        "Medicare es el programa federal de seguro médico para personas de 65 años o más. Algunas personas más jóvenes con ciertas discapacidades o enfermedades también pueden calificar.",
        "Medicare tiene distintas partes, y cada una cubre servicios diferentes:",
      ],
      list: [
        "Parte A — seguro de hospital (por ejemplo, hospitalizaciones).",
        "Parte B — seguro médico (por ejemplo, consultas médicas y atención ambulatoria).",
        "Parte C — Medicare Advantage, planes de compañías privadas aprobadas por Medicare.",
        "Parte D — cobertura de medicamentos recetados.",
      ],
    },
  ],
  compare: {
    heading: "Medicare Original y Medicare Advantage: diferencias generales",
    intro: "Son dos formas distintas de recibir su cobertura de Medicare. Esta tabla es un resumen general, no una comparación de planes específicos.",
    columns: ["", "Medicare Original", "Medicare Advantage"],
    rows: [
      ["Quién lo ofrece", "El gobierno federal", "Compañías privadas aprobadas por Medicare"],
      ["Qué incluye", "Parte A y Parte B", "Parte A y Parte B en un solo plan; muchos planes incluyen medicamentos"],
      ["Médicos y hospitales", "En general, proveedores de todo el país que aceptan Medicare", "Normalmente una red de proveedores, con reglas que varían según el plan"],
      ["Cobertura de medicamentos", "Con un plan aparte de la Parte D", "Incluida en muchos planes"],
      ["Ayuda con gastos de bolsillo", "Puede combinarse con una póliza Medigap", "Medigap no funciona con Medicare Advantage"],
    ],
    note: "Los costos, beneficios, redes y disponibilidad varían según el plan y la ubicación.",
  },
  drugCoverage: {
    heading: "Qué significa la cobertura de medicamentos",
    paragraphs: [
      "La cobertura de medicamentos de Medicare (Parte D) ayuda a pagar medicamentos recetados. Cada plan tiene una lista de medicamentos cubiertos, llamada formulario, y sus propios costos y reglas de farmacias.",
      "Si pasa un tiempo sin cobertura de medicamentos acreditable después de cumplir los requisitos por primera vez, es posible que deba pagar una multa por inscripción tardía. Es un buen tema para preguntar.",
    ],
  },
  checklist: {
    heading: "Preguntas para preparar antes de hablar con un agente",
    intro: "Anotarlas ayuda a que la conversación sea clara y útil:",
    items: [
      "¿Cuándo cumplo (o cumple mi padre o madre) los requisitos? ¿Ya tengo la Parte A o la Parte B?",
      "¿Tengo cobertura por mi trabajo, por mi cónyuge o por un empleador anterior?",
      "¿Qué médicos, hospitales o farmacias me gustaría conservar?",
      "¿Viajo o paso parte del año en otro estado?",
      "¿Qué es lo más importante para mí: costos previsibles, flexibilidad para elegir proveedores u otras cosas?",
      "¿Quién más debería participar en la conversación (un hijo, una hija o un cuidador)?",
    ],
    warning: "Lleve esta información a la conversación. Por favor, no envíe números de Medicare o del Seguro Social ni datos médicos por el sitio web.",
  },
  officialLinks: [
    { label: "Medicare.gov en español — sitio oficial del gobierno de EE. UU. para Medicare", href: "https://es.medicare.gov/" },
    { label: "Administración del Seguro Social — inscripción en Medicare", href: "https://www.ssa.gov/espanol/" },
    { label: "SHIP — programas estatales gratuitos e imparciales de asistencia (en inglés)", href: "https://www.shiphelp.org/" },
  ],
};
