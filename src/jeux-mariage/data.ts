export type GameId = 'soiree' | 'mimes' | 'classez' | 'qui' | 'encheres' | 'killer'
export type TeamId = 'yahya' | 'floriane'
export type ScoreGameId = Exclude<GameId, 'soiree'>

export const GAMES: { id: GameId; label: string; short: string }[] = [
  { id: 'soiree', label: 'Soirée', short: 'Soirée' },
  { id: 'mimes', label: 'Mimes', short: 'Mimes' },
  { id: 'classez', label: 'Classez-les', short: 'Classez' },
  { id: 'qui', label: 'Qui des deux', short: 'Qui' },
  { id: 'encheres', label: 'Enchères', short: 'Enchères' },
  { id: 'killer', label: 'Killer', short: 'Killer' },
]

export const MIME_GROUPS: { id: string; words: string[] }[] = [
  { id: 'G1', words: ['Accouchement', 'Coincé dans un ascenseur', 'Titanic', 'Premiers pas sur la Lune'] },
  { id: 'G2', words: ['Gueule de bois', 'Cours de yoga', 'Matrix', 'Chute du mur de Berlin'] },
  { id: 'G3', words: ['Demande en mariage', 'Rater son avion', 'Rocky', 'Newton reçoit une pomme sur la tête'] },
  { id: 'G4', words: ['Faire un créneau', 'Se faire poursuivre par un chien', 'Le Roi Lion', 'Construction des pyramides'] },
  { id: 'G5', words: ['Changer une couche', 'Sauter en parachute', 'Harry Potter', 'Débarquement de Normandie'] },
  { id: 'G6', words: ['Monter un meuble IKEA', 'Contrôle de police', 'Jurassic Park', 'Extinction des dinosaures'] },
  { id: 'G7', words: ['Marcher sur un Lego', 'Christophe Colomb découvre l’Amérique', 'Se brûler en cuisinant', 'Éteindre un incendie'] },
  { id: 'G8', words: ['Passer un entretien d’embauche', 'Star Wars', 'La prise de la Bastille', 'Zidane donne un coup de tête à Materazzi'] },
]

export const MIME_PHRASES: { sujet: string; verbe: string; complement: string }[] = [
  { sujet: 'Titanic', verbe: 'heurte', complement: 'iceberg' },
  { sujet: 'Newton', verbe: 'reçoit', complement: 'pomme' },
  { sujet: 'Cendrillon', verbe: 'perd', complement: 'chaussure' },
  { sujet: 'Spider-Man', verbe: 'grimpe', complement: 'mur' },
  { sujet: 'Aladdin', verbe: 'vole', complement: 'tapis' },
  { sujet: 'Astronaute', verbe: 'plante', complement: 'drapeau' },
  { sujet: 'Policier', verbe: 'poursuit', complement: 'voleur' },
  { sujet: 'Mariée', verbe: 'lance', complement: 'bouquet' },
  { sujet: 'Pêcheur', verbe: 'attrape', complement: 'poisson' },
  { sujet: 'Harry Potter', verbe: 'lance', complement: 'sort' },
]

export const CLASSEZ_CRITERES = {
  maries: [
    'De celui qui connaît Yahya / Floriane depuis le moins longtemps au plus longtemps',
    'De celui qui a rencontré le conjoint le plus récemment à celui qui l’a rencontré en premier',
    'Du moins de voyages faits avec Yahya / Floriane au plus',
    'Du moins de voyages faits avec le couple au plus',
    'Du moins de soirées passées avec Yahya / Floriane au plus',
    'De celui qui a vécu le moins longtemps dans la même ville que Yahya / Floriane à celui qui y a vécu le plus longtemps',
    'Du dernier à avoir rencontré Yahya / Floriane au premier',
    'Du moins de membres de la famille des mariés connus au plus',
    'Du moins de vacances passées avec Yahya / Floriane au plus',
    'Du dernier à avoir appris qu’ils étaient ensemble au premier',
  ],
  droles: [
    'Du moins de contraventions reçues au plus',
    'Du moins de déménagements au plus',
    'Du moins de paires de chaussures au plus',
    'Du moins de fois où elle a raté un avion ou un train au plus',
    'Du plus petit nombre de réveils nécessaires le matin au plus grand',
    'Du moins de temps pour répondre à un WhatsApp au plus',
    'Du moins de commandes à manger par mois au plus',
    'Du moins de cafés par jour au plus',
    'Du plus petit nombre de photos dans le téléphone au plus grand',
    'Du moins de temps passé sur les réseaux au plus',
  ],
}

export const QUI_DUELS: { duel: string; questions: string[] }[] = [
  {
    duel: 'Duel 1 — M1 vs F1',
    questions: [
      'Qui dort le plus ?',
      'Qui a dit « je t’aime » en premier ?',
      'Qui est le plus romantique ?',
      'Qui s’excuse généralement en premier après une dispute ?',
      'Qui était le plus stressé pendant les préparatifs du mariage ?',
    ],
  },
  {
    duel: 'Duel 2 — M2 vs F2',
    questions: [
      'Qui a parlé mariage en premier ?',
      'Qui est le plus têtu dans le couple ?',
      'Qui organise le plus souvent les surprises ?',
      'Qui pourrait participer à Koh-Lanta ?',
      'Qui est le plus jaloux ?',
    ],
  },
  {
    duel: 'Duel 3 — M3 vs F3',
    questions: [
      'Qui est le plus mauvais perdant ?',
      'Qui est le plus romantique ?',
      'Qui a le plus souvent le dernier mot ?',
      'Qui est le plus susceptible d’organiser les vacances du couple ?',
      'Qui a pris le plus de décisions concernant le mariage ?',
    ],
  },
]

export const QUI_SECOURS = [
  'Qui des deux est le plus susceptible d’organiser une surprise pour l’anniversaire de mariage ?',
  'Qui des deux est le plus susceptible d’oublier une date importante du couple ?',
]

export const ENCHERES_DUELS: { duel: string; categories: { titre: string; question: string }[] }[] = [
  {
    duel: 'Duel 1 — M1 vs F1',
    categories: [
      { titre: 'Capitales d’Afrique', question: 'Combien de capitales africaines pouvez-vous citer ?' },
      { titre: 'Personnages de Harry Potter', question: 'Combien de personnages de l’univers Harry Potter pouvez-vous citer ?' },
      { titre: 'Films avec Leonardo DiCaprio', question: 'Combien de films avec Leonardo DiCaprio pouvez-vous citer ?' },
      { titre: 'Pays bordant la Méditerranée', question: 'Combien de pays ayant une côte sur la mer Méditerranée pouvez-vous citer ?' },
    ],
  },
  {
    duel: 'Duel 2 — M2 vs F2',
    categories: [
      { titre: 'Capitales d’Europe', question: 'Combien de capitales européennes pouvez-vous citer ?' },
      { titre: 'Chansons de Michael Jackson', question: 'Combien de chansons de Michael Jackson pouvez-vous citer ?' },
      { titre: 'Films Disney avec un animal', question: 'Combien de films Disney dont un perso principal est un animal pouvez-vous citer ?' },
      { titre: 'Pays JO d’été', question: 'Combien de pays ayant déjà accueilli les JO d’été pouvez-vous citer ?' },
    ],
  },
  {
    duel: 'Duel 3 — M3 vs F3',
    categories: [
      { titre: 'Vainqueurs du Ballon d’Or', question: 'Combien de vainqueurs différents du Ballon d’Or pouvez-vous citer ?' },
      { titre: 'Personnages du Seigneur des Anneaux', question: 'Combien de personnages de l’univers du Seigneur des Anneaux pouvez-vous citer ?' },
      { titre: 'Films avec Tom Hanks', question: 'Combien de films avec Tom Hanks pouvez-vous citer ?' },
      { titre: 'Drapeaux avec une étoile', question: 'Combien de pays dont le drapeau contient au moins une étoile pouvez-vous citer ?' },
    ],
  },
]

export const ENCHERES_SECOURS: { titre: string; question: string }[] = [
  { titre: 'Pays d’Amérique du Sud', question: 'Combien de pays d’Amérique du Sud pouvez-vous citer ?' },
  { titre: 'Chansons de Rihanna', question: 'Combien de chansons de Rihanna pouvez-vous citer ?' },
  { titre: 'Personnages de Friends', question: 'Combien de personnages de la série Friends pouvez-vous citer ?' },
  { titre: 'Films avec un dinosaure', question: 'Combien de films contenant au moins un dinosaure pouvez-vous citer ?' },
]

export type KillerMission = {
  n: number
  points: 1 | 2 | 3
  text: string
  photo?: boolean
}

export const KILLER_MISSIONS: KillerMission[] = [
  { n: 1, points: 1, text: 'Fais faire un high-five à quelqu’un.' },
  { n: 2, points: 1, text: 'Fais faire un check du poing à quelqu’un.' },
  { n: 3, points: 1, text: 'Fais en sorte que quelqu’un tienne ton téléphone au moins 5 secondes.' },
  { n: 4, points: 1, text: 'Fais en sorte que quelqu’un te donne l’heure.' },
  { n: 5, points: 1, text: 'Fais en sorte que quelqu’un trinque avec toi.' },
  { n: 6, points: 1, text: 'Fais en sorte que quelqu’un te montre quelque chose sur son téléphone.' },
  { n: 7, points: 1, text: 'Fais en sorte que quelqu’un te recommande quelque chose à manger ou à boire.' },
  { n: 8, points: 1, text: 'Fais dire « Sérieusement ? »' },
  { n: 9, points: 1, text: 'Fais dire « Exactement. »' },
  { n: 10, points: 1, text: 'Fais dire « Ça dépend. »' },
  { n: 11, points: 1, text: 'Fais dire « Impossible. »' },
  { n: 12, points: 1, text: 'Fais dire « J’en sais rien. »' },
  { n: 13, points: 1, text: 'Fais dire « Bonne question. »' },
  { n: 14, points: 1, text: 'Fais dire « Franchement… »' },
  { n: 15, points: 1, text: 'Fais prononcer le mot « Japon ».' },
  { n: 16, points: 1, text: 'Fais prononcer le mot « Titanic ».' },
  { n: 17, points: 1, text: 'Fais prononcer le mot « Millionnaire ».' },
  { n: 18, points: 1, text: 'Fais en sorte que quelqu’un te donne trois exemples de quelque chose.' },
  { n: 19, points: 2, text: 'Fais dire « C’est n’importe quoi. »' },
  { n: 20, points: 2, text: 'Fais dire « Je ne suis pas d’accord. »' },
  { n: 21, points: 2, text: 'Fais dire « C’est compliqué. »' },
  { n: 22, points: 2, text: 'Fais dire « T’es sérieux ? »' },
  { n: 23, points: 2, text: 'Fais dire « Mais pourquoi ? »' },
  { n: 24, points: 2, text: 'Fais dire « Je te jure. »' },
  { n: 25, points: 2, text: 'Fais dire « Normalement… »' },
  { n: 26, points: 2, text: 'Fais dire « J’aurais jamais fait ça. »' },
  { n: 27, points: 2, text: 'Fais prononcer « Lune de miel ».' },
  { n: 28, points: 2, text: 'Fais prononcer « Crocodile ».' },
  { n: 29, points: 2, text: 'Fais prononcer « Pokémon ».' },
  { n: 30, points: 2, text: 'Fais prononcer « Las Vegas ».' },
  { n: 31, points: 2, text: 'Fais en sorte que quelqu’un te rapporte ou te serve un verre.' },
  { n: 32, points: 2, text: 'Fais en sorte que quelqu’un t’aide à chercher quelque chose que tu prétends avoir perdu.' },
  { n: 33, points: 2, text: 'Fais en sorte que quelqu’un compte quelque chose pour toi à voix haute.' },
  { n: 34, points: 2, text: 'Fais en sorte que quelqu’un essaie de deviner ton âge.' },
  { n: 35, points: 2, text: 'Fais en sorte que quelqu’un te montre avec ses mains une taille ou une distance.' },
  { n: 36, points: 2, text: 'Fais prononcer trois noms de pays différents dans la même conversation.' },
  { n: 37, points: 2, text: 'Fais en sorte que quelqu’un te recommande un film ou une série.' },
  { n: 38, points: 2, text: 'Fais dire « Attends, je vais te montrer. »' },
  { n: 39, points: 2, text: 'Dis volontairement quelque chose de faux et fais-toi corriger (ex. « Sydney est la capitale de l’Australie, non ? »).' },
  { n: 40, points: 2, text: 'Fais en sorte que quelqu’un te demande « Pourquoi tu me demandes ça ? »' },
  { n: 41, points: 3, text: 'Fais parler quelqu’un en anglais avec toi pendant au moins 15 secondes.' },
  { n: 42, points: 3, text: 'Fais dire « Attends, j’ai une idée. »' },
  { n: 43, points: 3, text: 'Fais en sorte que quelqu’un t’explique spontanément comment faire quelque chose (vraie méthode, pas un oui/non).' },
  { n: 44, points: 3, text: 'Fais dire « Non, écoute… » avant d’expliquer quelque chose.' },
  { n: 45, points: 3, text: 'Fais en sorte que quelqu’un te donne son téléphone pour que tu regardes quelque chose dessus.' },
  { n: 46, points: 3, text: 'Fais en sorte que quelqu’un t’apprenne un mot ou une expression dans une autre langue.' },
  { n: 47, points: 3, text: 'Fais prononcer, dans la même conversation, « mariage », « voyage » et « voiture » (n’importe quel ordre).' },
  { n: 48, points: 3, text: 'Fais citer trois capitales européennes différentes dans la même conversation.' },
  { n: 49, points: 3, text: 'Prends une photo de quelqu’un en train de faire un dab (volontairement).', photo: true },
  { n: 50, points: 3, text: 'Obtiens un selfie avec quelqu’un faisant un cœur avec les mains.', photo: true },
]
