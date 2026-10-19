import { HouseInfo, Benefit, Testimonial, FaqItem, QuizQuestion, SpellItem } from './types';

export const HOUSES: Record<string, HouseInfo> = {
  gryffindor: {
    id: 'gryffindor',
    name: 'Gryffindor',
    spanishName: 'Gryffindor',
    colors: 'Escarlata y Oro',
    accentHex: '#d3a625',
    borderHex: '#740001',
    crestEmoji: '🦁',
    animal: 'León',
    element: 'Fuego',
    founder: 'Godric Gryffindor',
    ghost: 'Sir Nicholas de Mimsy-Porpington (Nick Casi Decapitado)',
    traits: ['Valor', 'Caballerosidad', 'Coraje', 'Determinación'],
    motto: '"Donde habitan los valientes de corazón"',
    description: 'La casa de los valientes, donde el coraje, la osadía y el temple distinguen a sus brujas y magos.'
  },
  slytherin: {
    id: 'slytherin',
    name: 'Slytherin',
    spanishName: 'Slytherin',
    colors: 'Verde Esmeralda y Plata',
    accentHex: '#2a623d',
    borderHex: '#1a472a',
    crestEmoji: '🐍',
    animal: 'Serpiente',
    element: 'Agua',
    founder: 'Salazar Slytherin',
    ghost: 'El Barón Sanguinario',
    traits: ['Ambición', 'Astucia', 'Liderazgo', 'Determinación'],
    motto: '"La grandeza aguarda a quienes tienen ambición"',
    description: 'La casa del ingenio y la ambición desmedida, cuna de los magos más astutos e influyentes de la historia mágica.'
  },
  ravenclaw: {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    spanishName: 'Ravenclaw',
    colors: 'Azul Noche y Bronce',
    accentHex: '#005a9c',
    borderHex: '#0e1a40',
    crestEmoji: '🦅',
    animal: 'Águila',
    element: 'Aire',
    founder: 'Rowena Ravenclaw',
    ghost: 'La Dama Gris (Helena Ravenclaw)',
    traits: ['Inteligencia', 'Sabiduría', 'Creatividad', 'Curiosidad'],
    motto: '"Una inteligencia sin límites es el mayor tesoro del hombre"',
    description: 'El hogar de mentes brillantes, amantes del conocimiento arcano, la inventiva y el pensamiento divergente.'
  },
  hufflepuff: {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    spanishName: 'Hufflepuff',
    colors: 'Amarillo Canario y Negro Carbón',
    accentHex: '#ecb939',
    borderHex: '#372e29',
    crestEmoji: '🦡',
    animal: 'Tejón',
    element: 'Tierra',
    founder: 'Helga Hufflepuff',
    ghost: 'El Fraile Gordo',
    traits: ['Lealtad', 'Paciencia', 'Juego Limpio', 'Dedicación'],
    motto: '"Donde son justos, leales y no temen al trabajo duro"',
    description: 'La casa más cálida e inclusiva, donde la lealtad incansable y la integridad son el verdadero pilar de la magia.'
  }
};

export const BENEFITS: Benefit[] = [
  {
    id: 'b-1',
    iconName: 'Wand2',
    title: 'Dominio de Encantamientos & Pociones',
    subtitle: 'Artes arcanas desde el primer año',
    description: 'Aprende a conjurar desde chispas de luz hasta encantamientos Patronus avanzados y filtros de paz en las mazmorras del castillo.',
    badge: '12 Disciplinas Mágicas',
    spellTip: 'Expelliarmus, Wingardium Leviosa y Felix Felicis'
  },
  {
    id: 'b-2',
    iconName: 'Sparkles',
    title: 'La Varita Elige a su Mago',
    subtitle: 'Ceremonia en Ollivanders',
    description: 'Recibe una varita forjada a mano con núcleos de pluma de fénix, pelo de unicornio o fibra de corazón de dragón en el Callejón Diagon.',
    badge: '100% Personalizada',
    spellTip: 'Maderas sagradas de acebo, tejo y sauce'
  },
  {
    id: 'b-3',
    iconName: 'Compass',
    title: 'Exploración del Castillo y Hogsmeade',
    subtitle: '142 escaleras movedizas y pasajes secretos',
    description: 'Descubre la Sala de los Menesteres, relájate en Las Tres Escobas con una Cerveza de Mantequilla y consulta los estantes de la Biblioteca.',
    badge: 'Mapa del Merodeador',
    spellTip: 'Acceso a pasajes secretos tras las estatuas'
  },
  {
    id: 'b-4',
    iconName: 'Trophy',
    title: 'Liga de Quidditch & Duelos Oficiales',
    subtitle: 'El deporte rey de las alturas',
    description: 'Monta escobas de alta competición Saeta de Fuego, entrena como Buscador o Guardián y compite ante miles de brujas por la Copa de Quidditch.',
    badge: 'Copa Intercasas',
    spellTip: 'Snitch dorada a 150 puntos de victoria'
  },
  {
    id: 'b-5',
    iconName: 'Flame',
    title: 'Red de Polvos Flu y Expreso de Hogwarts',
    subtitle: 'Transporte mágico seguro y puntual',
    description: 'Viaja desde el Andén 9¾ en la locomotora a vapor escarlata a través de los viaductos escoceses, o salta al instante mediante chimeneas habilitadas.',
    badge: 'Plataforma 9¾',
    spellTip: 'Salida fija: 1 de septiembre a las 11:00 am'
  },
  {
    id: 'b-6',
    iconName: 'Shield',
    title: 'Hermandad de Sala Común de por Vida',
    subtitle: 'Tu familia mágica',
    description: 'Comparte chimeneas encendidas, acertijos de entrada, banquetes infinitos creados por elfos y una red de graduados en el Ministerio y San Mungo.',
    badge: 'Fraternidad Eterna',
    spellTip: 'Contraseñas custodiadas por cuadros vivientes'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Hermione Granger',
    title: 'Premio Anual • Ministra de Magia',
    house: 'gryffindor',
    content: 'Hogwarts no solo me enseñó cómo dominar la teoría de encantamientos; me dio amigos por los que arriesgarlo todo y una biblioteca en la que cualquier enigma del universo tiene respuesta.',
    favoriteSpell: 'Alohomora / Time-Turner',
    stars: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 't-2',
    name: 'Albus Dumbledore',
    title: 'Director del Colegio Hogwarts',
    house: 'gryffindor',
    content: 'La ayuda siempre será otorgada en Hogwarts a quienes la pidan. Aquí la magia no reside en la madera ni en la sangre, sino en las elecciones que tomamos cada día.',
    favoriteSpell: 'Fuego de Fénix & Partis Temporus',
    stars: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 't-3',
    name: 'Luna Lovegood',
    title: 'Naturalista Mágica & Colaboradora de El Quisquilloso',
    house: 'ravenclaw',
    content: 'En la torre de Ravenclaw aprendí que ser diferente no es una rareza, sino un superpoder. Las criaturas que nadie más ve son a menudo las más amables.',
    favoriteSpell: 'Expecto Patronum (Liebre)',
    stars: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 't-4',
    name: 'Neville Longbottom',
    title: 'Profesor de Herbología • Héroe de Hogwarts',
    house: 'gryffindor',
    content: 'Llegué tembloroso y perdiendo mi sapo Trevor. Los maestros tuvieron paciencia conmigo y descubrí mi vocación entre Mandrágoras y la espada de Godric.',
    favoriteSpell: 'Herbivicus & Petrificus Totalus',
    stars: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 't-5',
    name: 'Ron Weasley',
    title: 'Guardián de Gryffindor • Auror',
    house: 'gryffindor',
    content: 'Al principio creí que no encajaría teniendo tantos hermanos brillantes, pero los banquetes del Gran Comedor y la emoción de ganar la Copa de Quidditch valieron cada segundo.',
    favoriteSpell: 'Wingardium Leviosa (con acento en el SA)',
    stars: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 't-6',
    name: 'Severus Snape',
    title: 'Maestro de Pociones • Director de Slytherin',
    house: 'slytherin',
    content: 'Les enseñaré cómo embotellar la fama, cocinar la gloria e incluso poner un tapón a la muerte... siempre y cuando no sean tan tontos como la media de alumnos que me envían.',
    favoriteSpell: 'Sectumsempra / Oclumancia',
    stars: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Admisiones',
    question: '¿Cómo sabe Hogwarts que soy un mago si provengo de una familia Muggle?',
    answer: 'La Pluma de Aceptación y el Libro de Admisión detectan la primera señal de magia involuntaria de cada niño británico al nacer. No importa tu ascendencia: si la magia vibra en ti, una lechuza llegará a tu puerta antes de cumplir los 11 años.'
  },
  {
    id: 'faq-2',
    category: 'Materiales',
    question: '¿Es obligatorio comprar mi varita mágica en Ollivanders antes del curso?',
    answer: 'Sí. Garrick Ollivanders es el fabricante más respetado desde el 382 a.C. Cada estudiante debe acudir en persona al Callejón Diagon, pues "la varita es quien escoge al mago", sintonizando con su temperamento y afinidad elemental.'
  },
  {
    id: 'faq-3',
    category: 'Vida en Hogwarts',
    question: '¿Qué tipo de mascotas están permitidas dentro del castillo?',
    answer: 'El estatuto escolar permite una lechuza (óptima para correspondencia), un gato o un sapo. Para casos excepcionales o criaturas no convencionales como ratas o kneazles, se requiere permiso expreso de la subdirectora Minerva McGonagall.'
  },
  {
    id: 'faq-4',
    category: 'Seguridad',
    question: '¿Qué sucede si un estudiante se pierde en las escaleras movedizas o pasajes secretos?',
    answer: 'Las 142 escaleras tienen horarios de movimiento propios. Si te extravías, cualquier cuadro viviente del pasillo te guiará o contactará a los prefectos. Eso sí, procura evitar las trampas de Peeves el poltergeist y los corredores del tercer piso.'
  },
  {
    id: 'faq-5',
    category: 'Vida en Hogwarts',
    question: '¿Cómo funciona el sistema de puntos y la Copa de las Casas?',
    answer: 'Los profesores y prefectos otorgan puntos por respuestas brillantes, actos de valentía o buenas acciones, y restan puntos por infringir toques de queda. Los puntos se acumulan en cuatro grandes relojes de arena con gemas preciosas (rubíes, esmeraldas, zafiros y topacios).'
  },
  {
    id: 'faq-6',
    category: 'Materiales',
    question: '¿Dónde se consiguen los libros de texto y calderos de peltre número 2?',
    answer: 'Todo el material se adquiere en el Callejón Diagon: libros en Flourish & Blotts, túnicas en Madame Malkin, calderos en la Tienda de Calderos de Potage e ingredientes frescos en el boticario del callejón.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Frente a un enigma arcano en la biblioteca prohibida, ¿cuál es tu primer impulso?',
    description: 'Tu curiosidad te delata en la oscuridad.',
    options: [
      { text: 'Analizar cada tomo antiguo hasta descifrar la verdad lógica y universal.', house: 'ravenclaw', trait: 'Sabiduría analítica' },
      { text: 'Avanzar sin dudar y proteger a mis compañeros de cualquier peligro latente.', house: 'gryffindor', trait: 'Coraje incondicional' },
      { text: 'Buscar la manera de utilizar ese poder oculto para alcanzar el éxito y ascender.', house: 'slytherin', trait: 'Visión estratégica' },
      { text: 'Asegurarme de que nadie salga herido y compartir el hallazgo justamente.', house: 'hufflepuff', trait: 'Nobleza comunitaria' },
    ]
  },
  {
    id: 2,
    question: '¿Qué cualidad consideras que define mejor tu verdadera esencia?',
    description: 'El Sombrero mira en lo más profundo de tu alma.',
    options: [
      { text: 'La audacia de desafiar lo imposible por defender a los indefensos.', house: 'gryffindor', trait: 'Temple de león' },
      { text: 'La lealtad inquebrantable a mis promesas y amigos verdaderos.', house: 'hufflepuff', trait: 'Fidelidad absoluta' },
      { text: 'La sed insaciable de conocimiento, creatividad e ingenio libre.', house: 'ravenclaw', trait: 'Mente sin cadenas' },
      { text: 'La determinación implacable para forjar mi propio destino y triunfar.', house: 'slytherin', trait: 'Astucia triunfante' },
    ]
  },
  {
    id: 3,
    question: 'Si pudieras elegir tu animal acompañante mágico, ¿cuál elegirías?',
    description: 'La resonancia de tu espíritu con la naturaleza mágica.',
    options: [
      { text: 'Un Fénix dorado con lágrimas curativas y espíritu inmortal.', house: 'gryffindor', trait: 'Fuego purificador' },
      { text: 'Una Serpiente bicéfala capaz de percibir secretos en las sombras.', house: 'slytherin', trait: 'Percepción oculta' },
      { text: 'Un Búho Nival de mirada penetrante y sabiduría telescópica.', house: 'ravenclaw', trait: 'Clarividencia' },
      { text: 'Un Tejón leal y tenaz, guardián incansable de la madriguera.', house: 'hufflepuff', trait: 'Defensa firme' },
    ]
  },
  {
    id: 4,
    question: 'Al caminar por un cruce de caminos en el Bosque Prohibido, ¿cuál sendero tomas?',
    description: 'El destino premia a los espíritus afines.',
    options: [
      { text: 'El sendero empinado y peligroso donde resuenan ecos de desafíos heroicos.', house: 'gryffindor', trait: 'Búsqueda de gloria justa' },
      { text: 'El camino iluminado por runas brillantes que conduce a un observatorio cósmico.', house: 'ravenclaw', trait: 'Anhelo de misterios' },
      { text: 'El sendero oculto bajo la niebla donde aguardan reliquias de poder soberano.', house: 'slytherin', trait: 'Dominio y ambición' },
      { text: 'El camino suave rodeado de flores nocturnas que une a todos los viajeros.', house: 'hufflepuff', trait: 'Paz y colaboración' },
    ]
  }
];

export const SPELL_ITEMS: SpellItem[] = [
  {
    name: 'Lumos Máxima',
    pronunciation: 'LOO-mos MAK-si-muh',
    category: 'Iluminación',
    effect: 'Crea un haz deslumbrante de luz blanca en la punta de la varita que puede lanzarse al cielo.',
    soundType: 'lumos'
  },
  {
    name: 'Expecto Patronum',
    pronunciation: 'ex-PEK-toh puh-TROH-num',
    category: 'Defensa',
    effect: 'Invoca un guardián plateado de pura energía positiva para repeler dementores.',
    soundType: 'patronus'
  },
  {
    name: 'Wingardium Leviosa',
    pronunciation: 'win-GAR-dee-um lev-ee-OH-suh',
    category: 'Encantamiento',
    effect: 'Hace levitar y maniobrar objetos a través del aire con un suave movimiento y golpe de muñeca.',
    soundType: 'leviosa'
  },
  {
    name: 'Alohomora',
    pronunciation: 'ah-LOH-ho-MOH-rah',
    category: 'Encantamiento',
    effect: 'Abre cerraduras mágicas y mundanas comunes sin dañar el mecanismo de cerrajería.',
    soundType: 'alohomora'
  }
];
