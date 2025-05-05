interface Example {
  en: string;
  es: string;
}

interface Structure {
  affirmative: string[];
  negative: string[];
  interrogative: string[];
}

interface VerbTense {
  id: string;
  name: string;
  nameEs: string;
  shortDesc: string;
  category: 'present' | 'past' | 'future';
  path: string;
  structure: Structure;
  examples: {
    affirmative: Example[];
    negative: Example[];
    interrogative: Example[];
  };
  uses: Array<{
    title: string;
    description: string;
    example?: Example;
  }>;
  exceptions?: string[];
  timeMarkers?: string[];
}

const verbTensesData: VerbTense[] = [
  {
    id: "simple-present",
    name: "Simple Present",
    nameEs: "Presente Simple",
    shortDesc: "Para hechos, hábitos y rutinas",
    category: 'present',
    path: "/tenses/simple-present",
    structure: {
      affirmative: [
        "I/You/We/They + verbo en forma base",
        "He/She/It + verbo + -s/-es"
      ],
      negative: [
        "I/You/We/They + do not (don't) + verbo en forma base",
        "He/She/It + does not (doesn't) + verbo en forma base"
      ],
      interrogative: [
        "Do + I/you/we/they + verbo en forma base?",
        "Does + he/she/it + verbo en forma base?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I work every day.", es: "Trabajo todos los días." },
        { en: "He works every day.", es: "Él trabaja todos los días." }
      ],
      negative: [
        { en: "I don't work on Sundays.", es: "No trabajo los domingos." },
        { en: "She doesn't work on Sundays.", es: "Ella no trabaja los domingos." }
      ],
      interrogative: [
        { en: "Do you work on weekends?", es: "¿Trabajas los fines de semana?" },
        { en: "Does she work on weekends?", es: "¿Ella trabaja los fines de semana?" }
      ]
    },
    uses: [
      {
        title: "Hechos permanentes",
        description: "Para expresar verdades universales y hechos científicos.",
        example: { en: "Water boils at 100°C.", es: "El agua hierve a 100°C." }
      },
      {
        title: "Hábitos y rutinas",
        description: "Para expresar acciones habituales y recurrentes.",
        example: { en: "I go to the gym three times a week.", es: "Voy al gimnasio tres veces a la semana." }
      },
      {
        title: "Verdades generales",
        description: "Para expresar ideas aceptadas como verdad.",
        example: { en: "The sun rises in the east.", es: "El sol sale por el este." }
      },
      {
        title: "Horarios programados",
        description: "Para hablar de eventos programados (especialmente transportes).",
        example: { en: "The train leaves at 5 PM.", es: "El tren sale a las 5 PM." }
      }
    ],
    exceptions: [
      "Verbos que terminan en -o, -ch, -sh, -ss, -x, -z añaden -es en tercera persona: go → goes, watch → watches",
      "Verbos que terminan en consonante + y cambian y por i + es: study → studies"
    ]
  },
  {
    id: "present-continuous",
    name: "Present Continuous",
    nameEs: "Presente Continuo",
    shortDesc: "Para acciones en progreso y planes futuros",
    category: 'present',
    path: "/tenses/present-continuous",
    structure: {
      affirmative: [
        "I + am + verbo-ing",
        "You/We/They + are + verbo-ing",
        "He/She/It + is + verbo-ing"
      ],
      negative: [
        "I + am not (I'm not) + verbo-ing",
        "You/We/They + are not (aren't) + verbo-ing",
        "He/She/It + is not (isn't) + verbo-ing"
      ],
      interrogative: [
        "Am + I + verbo-ing?",
        "Are + you/we/they + verbo-ing?",
        "Is + he/she/it + verbo-ing?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I am studying right now.", es: "Estoy estudiando en este momento." },
        { en: "She is studying right now.", es: "Ella está estudiando en este momento." },
      ],
      negative: [
        { en: "I am not watching TV.", es: "No estoy viendo la tele." },
        { en: "They aren't watching TV.", es: "Ellos no están viendo la tele." },
      ],
      interrogative: [
        { en: "Are you working?", es: "¿Estás trabajando?" },
        { en: "Is he working?", es: "¿Él está trabajando?" },
      ]
    },
    uses: [
      {
        title: "Acciones en progreso",
        description: "Para acciones que ocurren en este momento.",
        example: { en: "I am cooking dinner.", es: "Estoy cocinando la cena." }
      },
      {
        title: "Situaciones temporales",
        description: "Para situaciones que duran un tiempo limitado.",
        example: { en: "I am staying with my parents until I find an apartment.", es: "Me estoy quedando con mis padres hasta encontrar un apartamento." }
      },
      {
        title: "Planes futuros acordados",
        description: "Para planes ya confirmados en el futuro cercano.",
        example: { en: "We are meeting tomorrow at 8 PM.", es: "Nos reuniremos mañana a las 8 PM." }
      },
      {
        title: "Tendencias actuales",
        description: "Para describir tendencias o cambios en curso.",
        example: { en: "More people are learning languages online.", es: "Más personas están aprendiendo idiomas en línea." }
      }
    ],
    exceptions: [
      "Verbos de estado (state verbs) raramente se usan en forma continua: know, believe, like, love, understand, want, need, prefer."
    ]
  },
  // Resto de tiempos verbales se añadirían con estructura similar
  {
    id: "present-perfect",
    name: "Present Perfect",
    nameEs: "Presente Perfecto",
    shortDesc: "Para conectar el pasado con el presente",
    category: 'present',
    path: "/tenses/present-perfect",
    structure: {
      affirmative: [
        "I/You/We/They + have + participio pasado",
        "He/She/It + has + participio pasado"
      ],
      negative: [
        "I/You/We/They + have not (haven't) + participio pasado",
        "He/She/It + has not (hasn't) + participio pasado"
      ],
      interrogative: [
        "Have + I/you/we/they + participio pasado?",
        "Has + he/she/it + participio pasado?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I have visited Paris twice.", es: "He visitado París dos veces." },
        { en: "She has visited Paris twice.", es: "Ella ha visitado París dos veces." },
      ],
      negative: [
        { en: "I haven't finished my homework.", es: "No he terminado mi tarea." },
        { en: "He hasn't finished his homework.", es: "Él no ha terminado su tarea." },
      ],
      interrogative: [
        { en: "Have you ever eaten sushi?", es: "¿Has comido sushi alguna vez?" },
        { en: "Has she ever eaten sushi?", es: "¿Ella ha comido sushi alguna vez?" },
      ]
    },
    uses: [
      {
        title: "Experiencias en la vida",
        description: "Para hablar de experiencias sin especificar exactamente cuándo ocurrieron.",
        example: { en: "I have traveled to Japan.", es: "He viajado a Japón." }
      },
      {
        title: "Acciones con relevancia presente",
        description: "Para acciones completadas con resultados en el presente.",
        example: { en: "I have lost my keys.", es: "He perdido mis llaves y todavía no las encuentro." }
      },
      {
        title: "Acciones que continúan",
        description: "Para acciones que empezaron en el pasado y continúan hasta ahora.",
        example: { en: "I have lived here for ten years.", es: "He vivido aquí durante diez años." }
      },
      {
        title: "Acciones recientes",
        description: "Para acciones que acaban de ocurrir.",
        example: { en: "She has just arrived.", es: "Ella acaba de llegar." }
      }
    ],
    timeMarkers: [
      "since (desde un punto en el tiempo)",
      "for (durante un período)",
      "already, yet, just, ever, never"
    ]
  },
  {
    id: "present-perfect-continuous",
    name: "Present Perfect Continuous",
    nameEs: "Presente Perfecto Continuo",
    shortDesc: "Para acciones que comenzaron en el pasado y continúan",
    category: 'present',
    path: "/tenses/present-perfect-continuous",
    structure: {
      affirmative: [
        "I/You/We/They + have been + verbo-ing",
        "He/She/It + has been + verbo-ing"
      ],
      negative: [
        "I/You/We/They + have not (haven't) been + verbo-ing",
        "He/She/It + has not (hasn't) been + verbo-ing"
      ],
      interrogative: [
        "Have + I/you/we/they + been + verbo-ing?",
        "Has + he/she/it + been + verbo-ing?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I have been working all day.", es: "He estado trabajando todo el día." },
        { en: "She has been working all day.", es: "Ella ha estado trabajando todo el día." },
      ],
      negative: [
        { en: "I haven't been sleeping well lately.", es: "No he estado durmiendo bien últimamente." },
        { en: "He hasn't been sleeping well lately.", es: "Él no ha estado durmiendo bien últimamente." },
      ],
      interrogative: [
        { en: "Have you been waiting long?", es: "¿Has estado esperando mucho tiempo?" },
        { en: "Has she been waiting long?", es: "¿Ella ha estado esperando mucho tiempo?" },
      ]
    },
    uses: [
      {
        title: "Acciones continuas hasta el presente",
        description: "Para acciones que comenzaron en el pasado y continúan hasta ahora, enfatizando la continuidad.",
        example: { en: "I have been learning English for two years.", es: "He estado aprendiendo inglés durante dos años." }
      },
      {
        title: "Explicación de situaciones presentes",
        description: "Para explicar el estado actual como resultado de una actividad reciente.",
        example: { en: "I'm tired because I have been running.", es: "Estoy cansado porque he estado corriendo." }
      },
      {
        title: "Acciones con efecto visible",
        description: "Para acciones recientes que tienen un efecto visible en el presente.",
        example: { en: "It has been raining.", es: "Ha estado lloviendo (las calles están mojadas)." }
      }
    ]
  },
  {
    id: "simple-past",
    name: "Simple Past",
    nameEs: "Pasado Simple",
    shortDesc: "Para acciones completadas en el pasado",
    category: 'past',
    path: "/tenses/simple-past",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + verbo en pasado simple"
      ],
      negative: [
        "I/You/He/She/It/We/They + did not (didn't) + verbo en forma base"
      ],
      interrogative: [
        "Did + I/you/he/she/it/we/they + verbo en forma base?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I worked yesterday.", es: "Trabajé ayer." },
        { en: "She worked yesterday.", es: "Ella trabajó ayer." },
      ],
      negative: [
        { en: "I didn't study last night.", es: "No estudié anoche." },
        { en: "He didn't study last night.", es: "Él no estudió anoche." },
      ],
      interrogative: [
        { en: "Did you call me?", es: "¿Me llamaste?" },
        { en: "Did she call me?", es: "¿Ella me llamó?" },
      ]
    },
    uses: [
      {
        title: "Acciones completadas",
        description: "Para acciones finalizadas en un tiempo definido del pasado.",
        example: { en: "I visited my grandmother last week.", es: "Visité a mi abuela la semana pasada." }
      },
      {
        title: "Estados en el pasado",
        description: "Para describir estados o situaciones que existieron en el pasado.",
        example: { en: "I lived in Spain for five years.", es: "Viví en España cinco años." }
      },
      {
        title: "Acciones habituales pasadas",
        description: "Para rutinas o hábitos que ya no existen.",
        example: { en: "She always walked to school.", es: "Ella siempre caminaba a la escuela." }
      },
      {
        title: "Secuencia de acciones",
        description: "Para narrar acciones consecutivas en el pasado.",
        example: { en: "He got up, took a shower, and went to work.", es: "Se levantó, se duchó e fue al trabajo." }
      }
    ],
    timeMarkers: [
      "yesterday, last week/month/year, in 2010, x days/months/years ago"
    ]
  },
  {
    id: "past-continuous",
    name: "Past Continuous",
    nameEs: "Pasado Continuo",
    shortDesc: "Para acciones en desarrollo en el pasado",
    category: 'past',
    path: "/tenses/past-continuous",
    structure: {
      affirmative: [
        "I/He/She/It + was + verbo-ing",
        "You/We/They + were + verbo-ing"
      ],
      negative: [
        "I/He/She/It + was not (wasn't) + verbo-ing",
        "You/We/They + were not (weren't) + verbo-ing"
      ],
      interrogative: [
        "Was + I/he/she/it + verbo-ing?",
        "Were + you/we/they + verbo-ing?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I was studying when you called.", es: "Estaba estudiando cuando llamaste." },
        { en: "She was studying when you called.", es: "Ella estaba estudiando cuando llamaste." },
      ],
      negative: [
        { en: "I wasn't sleeping at 3 AM.", es: "No estaba durmiendo a las 3 AM." },
        { en: "They weren't sleeping at 3 AM.", es: "Ellos no estaban durmiendo a las 3 AM." },
      ],
      interrogative: [
        { en: "Were you working last night?", es: "¿Estabas trabajando anoche?" },
        { en: "Was he working last night?", es: "¿Él estaba trabajando anoche?" },
      ]
    },
    uses: [
      {
        title: "Acciones en progreso",
        description: "Para acciones en desarrollo en un momento específico del pasado.",
        example: { en: "At 7 PM, I was having dinner.", es: "A las 7 PM, estaba cenando." }
      },
      {
        title: "Acciones interrumpidas",
        description: "Para acciones interrumpidas por otra acción.",
        example: { en: "I was taking a shower when the phone rang.", es: "Estaba duchándome cuando sonó el teléfono." }
      },
      {
        title: "Acciones simultáneas",
        description: "Para dos o más acciones que ocurrían al mismo tiempo.",
        example: { en: "While I was cooking, my sister was setting the table.", es: "Mientras yo cocinaba, mi hermana ponía la mesa." }
      },
      {
        title: "Descripción de escenas",
        description: "Para crear el escenario o ambiente en una narración.",
        example: { en: "When I arrived, people were dancing and children were playing.", es: "Cuando llegué, la gente estaba bailando y los niños jugando." }
      }
    ]
  },
  {
    id: "past-perfect",
    name: "Past Perfect",
    nameEs: "Pasado Perfecto",
    shortDesc: "Para acciones anteriores a otro momento del pasado",
    category: 'past',
    path: "/tenses/past-perfect",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + had + participio pasado"
      ],
      negative: [
        "I/You/He/She/It/We/They + had not (hadn't) + participio pasado"
      ],
      interrogative: [
        "Had + I/you/he/she/it/we/they + participio pasado?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I had finished my homework before dinner.", es: "Había terminado mi tarea antes de cenar." },
        { en: "She had finished her homework before dinner.", es: "Ella había terminado su tarea antes de cenar." },
      ],
      negative: [
        { en: "I hadn't seen that movie before.", es: "No había visto esa película antes." },
        { en: "They hadn't seen that movie before.", es: "Ellos no habían visto esa película antes." },
      ],
      interrogative: [
        { en: "Had you ever visited London before that trip?", es: "¿Habías visitado Londres antes de ese viaje?" },
        { en: "Had he ever visited London before that trip?", es: "¿Él había visitado Londres antes de ese viaje?" },
      ]
    },
    uses: [
      {
        title: "Acciones anteriores",
        description: "Para acciones completadas antes de otra acción pasada.",
        example: { en: "When I arrived, the train had already left.", es: "Cuando llegué, el tren ya se había ido." }
      },
      {
        title: "Experiencias previas",
        description: "Para experiencias anteriores a un momento específico del pasado.",
        example: { en: "I had never eaten sushi before I visited Japan.", es: "Nunca había comido sushi antes de visitar Japón." }
      },
      {
        title: "Situaciones anteriores",
        description: "Para situaciones que existieron hasta un punto específico del pasado.",
        example: { en: "She had lived there for ten years before she moved.", es: "Ella había vivido allí durante diez años antes de mudarse." }
      }
    ]
  },
  {
    id: "past-perfect-continuous",
    name: "Past Perfect Continuous",
    nameEs: "Pasado Perfecto Continuo",
    shortDesc: "Para acciones continuas anteriores a otro momento del pasado",
    category: 'past',
    path: "/tenses/past-perfect-continuous",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + had been + verbo-ing"
      ],
      negative: [
        "I/You/He/She/It/We/They + had not (hadn't) been + verbo-ing"
      ],
      interrogative: [
        "Had + I/you/he/she/it/we/they + been + verbo-ing?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I had been working for three hours when she called.", es: "Había estado trabajando durante tres horas cuando ella llamó." },
        { en: "She had been working for three hours when I called.", es: "Ella había estado trabajando durante tres horas cuando llamé." },
      ],
      negative: [
        { en: "I hadn't been feeling well before I saw the doctor.", es: "No me había sentido bien antes de ver al médico." },
        { en: "They hadn't been feeling well before they arrived.", es: "Ellos no se habían sentido bien antes de llegar." },
      ],
      interrogative: [
        { en: "Had you been waiting long before he arrived?", es: "¿Habías estado esperando mucho tiempo antes de que él llegara?" },
        { en: "Had he been waiting long before she arrived?", es: "¿Él había estado esperando mucho tiempo antes de que ella llegara?" },
      ]
    },
    uses: [
      {
        title: "Duración antes de un momento pasado",
        description: "Para enfatizar la duración de una acción hasta otro momento del pasado.",
        example: { en: "They had been living in Paris for five years before they moved to London.", es: "Habían estado viviendo en París durante cinco años antes de mudarse a Londres." }
      },
      {
        title: "Causa y efecto en el pasado",
        description: "Para explicar la causa de una situación en el pasado.",
        example: { en: "She was tired because she had been working all day.", es: "Ella estaba cansada porque había estado trabajando todo el día." }
      }
    ]
  },
  {
    id: "simple-future",
    name: "Simple Future",
    nameEs: "Futuro Simple",
    shortDesc: "Para predicciones y decisiones espontáneas",
    category: 'future',
    path: "/tenses/simple-future",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + will + verbo en forma base"
      ],
      negative: [
        "I/You/He/She/It/We/They + will not (won't) + verbo en forma base"
      ],
      interrogative: [
        "Will + I/you/he/she/it/we/they + verbo en forma base?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I will call you tomorrow.", es: "Te llamaré mañana." },
        { en: "She will call you tomorrow.", es: "Ella te llamará mañana." },
      ],
      negative: [
        { en: "I won't be at home this weekend.", es: "No estaré en casa este fin de semana." },
        { en: "He won't be at home this weekend.", es: "Él no estará en casa este fin de semana." },
      ],
      interrogative: [
        { en: "Will you attend the party?", es: "¿Asistirás a la fiesta?" },
        { en: "Will she attend the party?", es: "¿Ella asistirá a la fiesta?" },
      ]
    },
    uses: [
      {
        title: "Predicciones",
        description: "Para hacer predicciones sobre el futuro.",
        example: { en: "I think it will rain tomorrow.", es: "Creo que lloverá mañana." }
      },
      {
        title: "Decisiones espontáneas",
        description: "Para decisiones tomadas en el momento de hablar.",
        example: { en: "The phone is ringing. I'll answer it.", es: "El teléfono está sonando. Lo contestaré." }
      },
      {
        title: "Promesas",
        description: "Para hacer promesas o compromisos.",
        example: { en: "I will always love you.", es: "Siempre te amaré." }
      },
      {
        title: "Hechos futuros",
        description: "Para hechos que ocurrirán en el futuro independientemente de la voluntad.",
        example: { en: "The sun will rise at 5:30 AM tomorrow.", es: "El sol saldrá a las 5:30 AM mañana." }
      }
    ]
  },
  {
    id: "future-continuous",
    name: "Future Continuous",
    nameEs: "Futuro Continuo",
    shortDesc: "Para acciones en desarrollo en un momento futuro",
    category: 'future',
    path: "/tenses/future-continuous",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + will be + verbo-ing"
      ],
      negative: [
        "I/You/He/She/It/We/They + will not (won't) be + verbo-ing"
      ],
      interrogative: [
        "Will + I/you/he/she/it/we/they + be + verbo-ing?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I will be working at this time tomorrow.", es: "Estaré trabajando a esta hora mañana." },
        { en: "She will be working at this time tomorrow.", es: "Ella estará trabajando a esta hora mañana." },
      ],
      negative: [
        { en: "I won't be studying tonight.", es: "No estudiaré esta noche." },
        { en: "They won't be studying tonight.", es: "Ellos no estudiarán esta noche." },
      ],
      interrogative: [
        { en: "Will you be using the car later?", es: "¿Vas a usar el coche más tarde?" },
        { en: "Will she be using the car later?", es: "¿Ella va a usar el coche más tarde?" },
      ]
    },
    uses: [
      {
        title: "Acciones en progreso futuras",
        description: "Para acciones que estarán en progreso en un momento específico del futuro.",
        example: { en: "This time tomorrow, I will be flying to Paris.", es: "A esta hora mañana, estaré volando a París." }
      },
      {
        title: "Planes futuros",
        description: "Para planes futuros ya establecidos.",
        example: { en: "I will be attending college next year.", es: "Asistiré a la universidad el próximo año." }
      },
      {
        title: "Preguntas corteses",
        description: "Para preguntar sobre planes futuros de manera cortés.",
        example: { en: "Will you be going to the market?", es: "¿Irás al mercado?" }
      },
      {
        title: "Acciones que ocurrirán naturalmente",
        description: "Para acciones que ocurrirán como parte del curso normal de acontecimientos.",
        example: { en: "Don't call at 8 PM. I will be having dinner.", es: "No llames a las 8 PM. Estaré cenando." }
      }
    ]
  },
  {
    id: "future-perfect",
    name: "Future Perfect",
    nameEs: "Futuro Perfecto",
    shortDesc: "Para acciones que estarán completadas en un momento futuro",
    category: 'future',
    path: "/tenses/future-perfect",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + will have + participio pasado"
      ],
      negative: [
        "I/You/He/She/It/We/They + will not (won't) have + participio pasado"
      ],
      interrogative: [
        "Will + I/you/he/she/it/we/they + have + participio pasado?"
      ]
    },
    examples: {
      affirmative: [
        { en: "I will have finished this project by Friday.", es: "Habré terminado este proyecto para el viernes." },
        { en: "She will have finished this project by Friday.", es: "Ella habrá terminado este proyecto para el viernes." },
      ],
      negative: [
        { en: "I won't have completed my studies by then.", es: "No habré completado mis estudios para entonces." },
        { en: "They won't have completed their studies by then.", es: "Ellos no habrán completado sus estudios para entonces." },
      ],
      interrogative: [
        { en: "Will you have read the book by next week?", es: "¿Habrás leído el libro para la próxima semana?" },
        { en: "Will he have read the book by next week?", es: "¿Él habrá leído el libro para la próxima semana?" },
      ]
    },
    uses: [
      {
        title: "Acciones completadas futuras",
        description: "Para acciones que estarán completadas antes de un momento específico en el futuro.",
        example: { en: "By next month, I will have finished my degree.", es: "Para el próximo mes, habré terminado mi título." }
      },
      {
        title: "Proyecciones de logros",
        description: "Para proyectar logros o eventos completados hasta un punto futuro.",
        example: { en: "By the end of this year, I will have worked here for ten years.", es: "Para fin de año, habré trabajado aquí diez años." }
      },
      {
        title: "Suposiciones sobre el pasado",
        description: "Para hacer suposiciones sobre acciones que ya deberían haber ocurrido.",
        example: { en: "Don't call her now. She will have gone to bed already.", es: "No la llames ahora. Ya se habrá acostado." }
      }
    ],
    timeMarkers: [
      "by + momento futuro (by next week, by the end of the year)"
    ]
  },
  {
    id: "future-perfect-continuous",
    name: "Future Perfect Continuous",
    nameEs: "Futuro Perfecto Continuo",
    shortDesc: "Para enfatizar duración hasta un punto en el futuro",
    category: 'future',
    path: "/tenses/future-perfect-continuous",
    structure: {
      affirmative: [
        "I/You/He/She/It/We/They + will have been + verbo-ing"
      ],
      negative: [
        "I/You/He/She/It/We/They + will not (won't) have been + verbo-ing"
      ],
      interrogative: [
        "Will + I/you/he/she/it/we/they + have been + verbo-ing?"
      ]
    },
    examples: {
      affirmative: [
        { en: "By December, I will have been studying English for five years.", es: "Para diciembre, habré estado estudiando inglés durante cinco años." },
        { en: "By December, she will have been studying English for five years.", es: "Para diciembre, ella habrá estado estudiando inglés durante cinco años." },
      ],
      negative: [
        { en: "I won't have been working here for long enough to get a promotion.", es: "No habré estado trabajando aquí el tiempo suficiente para recibir un ascenso." },
        { en: "They won't have been working here for long enough to get a promotion.", es: "Ellos no habrán estado trabajando aquí el tiempo suficiente para recibir un ascenso." },
      ],
      interrogative: [
        { en: "Will you have been living here for ten years by then?", es: "¿Habrás vivido aquí diez años para entonces?" },
        { en: "Will he have been living here for ten years by then?", es: "¿Él habrá vivido aquí diez años para entonces?" },
      ]
    },
    uses: [
      {
        title: "Duración continua",
        description: "Para enfatizar la duración continua de una acción hasta un punto futuro.",
        example: { en: "By next month, I will have been working on this project for a year.", es: "Para el próximo mes, habré estado trabajando en este proyecto durante un año." }
      },
      {
        title: "Causa de resultado futuro",
        description: "Para explicar la causa de un estado futuro.",
        example: { en: "I will be tired because I will have been working all day.", es: "Estaré cansado porque habré estado trabajando todo el día." }
      },
      {
        title: "Proyecciones de tiempo",
        description: "Para proyectar la duración de una acción hasta un punto futuro.",
        example: { en: "When I retire, I will have been teaching for 30 years.", es: "Cuando me jubile, habré estado enseñando durante 30 años." }
      }
    ]
  }
];

export default verbTensesData; 