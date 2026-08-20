export type RewardType =
  | "facts"
  | "questionsAnswers"
  | "flags"
  | "randomFactWidget"
  | "quoteOfTheDayWidget"
  | "vocabulary"
  | "dadJokeWidget";

export interface QuestionAnswerReward {
  question: string;
  answer: string;
}

export interface FlagReward {
  countryName: string;
  flagCode: string;
}

export interface VocabularyReward {
  question: string;
  answer: string;
}

export interface Reward {
  type: RewardType;
  content: string | QuestionAnswerReward | FlagReward | VocabularyReward | null;
}

const allFacts: string[] = [
  "Wussten Sie, dass die Chinesische Mauer nicht vom Mond aus sichtbar ist?",
  "Die kürzeste Kriegsgeschichte dauerte nur 38 Minuten (zwischen Großbritannien und Sansibar im Jahr 1896).",
  "Kleopatra lebte näher an der Erfindung des iPhones als am Bau der Pyramiden.",
  "Das Römische Reich existierte länger als die Vereinigten Staaten bisher.",
  "Die erste aufgezeichnete Verwendung des Wortes 'OK' war 1839 in einer Bostoner Zeitung.",
  "Die Pyramiden von Gizeh wurden gebaut, als Mammuts noch lebten.",
  "Die Wikinger benutzten Sonnensteine, um an bewölkten Tagen zu navigieren.",
  "Die älteste bekannte Melodie ist ein 3.400 Jahre altes Lied aus Ugarit, Syrien.",
  "Die erste Kamera benötigte 8 Stunden Belichtungszeit für ein einziges Bild.",
  "Im antiken Rom war Purpur die Farbe der Kaiser und Senatoren, da der Farbstoff extrem teuer war.",
  "Die Bibliothek von Alexandria war eine der größten und bedeutendsten Bibliotheken der Antike.",
  "Die erste gedruckte Bibel wurde von Johannes Gutenberg im 15. Jahrhundert hergestellt.",
  "1492 entdeckte Kolumbus Amerika. Eselsbrücke: 'Vierzehn – neunzig – zwei, Amerika ruft: Juhu!'",
  "1914 begann der Erste Weltkrieg.",
  "Marie Curie ist die einzige Person, die Nobelpreise in zwei verschiedenen Naturwissenschaften gewonnen hat – Physik und Chemie.",
  "Honig ist das einzige Lebensmittel, das niemals verdirbt.",
  "Ein Blitz ist fünfmal heißer als die Oberfläche der Sonne.",
  "Das menschliche Gehirn wiegt etwa 1,4 kg, verbraucht aber 20% des gesamten Sauerstoffs.",
  "Es gibt mehr Sterne im Universum als Sandkörner auf allen Stränden der Erde.",
  "Wasser kann in drei Aggregatzuständen gleichzeitig existieren: fest, flüssig und gasförmig (Tripelpunkt).",
  "Das Licht der Sonne braucht etwa 8 Minuten und 20 Sekunden, um die Erde zu erreichen.",
  "Haie haben keine Knochen, ihr Skelett besteht vollständig aus Knorpel.",
  "Ein Kolibri ist der einzige Vogel, der rückwärts fliegen kann.",
  "Die DNA in einer einzigen menschlichen Zelle ist entrollt etwa 2 Meter lang.",
  "Delfine geben sich gegenseitig individuelle Namen über spezifische Pfeiftöne.",
  "Eine Gruppe von Eulen wird 'Parlament' genannt.",
  "Erdbeeren sind botanisch gesehen keine Beeren, Bananen hingegen schon."
];

const allQuestionsAnswers: QuestionAnswerReward[] = [
  {
    question: "Was ist die Hauptstadt von Australien?",
    answer: "Canberra"
  },
  {
    question: "Wie viele Planeten hat unser Sonnensystem?",
    answer: "8 Planeten"
  },
  {
    question: "Welches chemische Element hat das Symbol 'Au'?",
    answer: "Gold"
  },
  {
    question: "In welchem Jahr fiel die Berliner Mauer?",
    answer: "1989"
  },
  {
    question: "Wer malte die berühmte 'Mona Lisa'?",
    answer: "Leonardo da Vinci"
  },
  {
    question: "Was ist der höchste Berg der Erde (über dem Meeresspiegel)?",
    answer: "Mount Everest (8.848 m)"
  },
  {
    question: "Wie viele Zähne hat ein erwachsener Mensch normalerweise (inkl. Weisheitszähne)?",
    answer: "32 Zähne"
  },
  {
    question: "Welcher Ozean ist der größte der Erde?",
    answer: "Pazifischer Ozean"
  }
];

const allFlags: FlagReward[] = [
  { countryName: "Deutschland", flagCode: "de" },
  { countryName: "Schweiz", flagCode: "ch" },
  { countryName: "Österreich", flagCode: "at" },
  { countryName: "Frankreich", flagCode: "fr" },
  { countryName: "Italien", flagCode: "it" },
  { countryName: "Spanien", flagCode: "es" },
  { countryName: "Portugal", flagCode: "pt" },
  { countryName: "Niederlande", flagCode: "nl" },
  { countryName: "Schweden", flagCode: "se" },
  { countryName: "Norwegen", flagCode: "no" },
  { countryName: "Finnland", flagCode: "fi" },
  { countryName: "Japan", flagCode: "jp" },
  { countryName: "Kanada", flagCode: "ca" },
  { countryName: "Brasilien", flagCode: "br" },
  { countryName: "Island", flagCode: "is" }
];

const allVocabulary: VocabularyReward[] = [
  {
    question: "Was bedeutet das englische Wort 'serendipity' auf Deutsch?",
    answer: "Glücklicher Zufall / eine überraschende, positive Entdeckung"
  },
  {
    question: "Was bedeutet das französische Wort 'déjà-vu' wörtlich?",
    answer: "Schon gesehen"
  },
  {
    question: "Was bedeutet das lateinische 'Carpe diem'?",
    answer: "Nutze den Tag"
  },
  {
    question: "Was bedeutet das englische Wort 'ubiquitous'?",
    answer: "Allgegenwärtig"
  },
  {
    question: "Was bedeutet das spanische Wort 'sobremesa'?",
    answer: "Das gemütliche Beisammensitzen und Plaudern nach dem Essen am Tisch"
  }
];

export const getRandomReward = (
  completedSessionsToday: number,
  _previousReward?: Reward
): Reward => {
  // 5th session of the day: Quote of the Day
  if (completedSessionsToday === 4) {
    return {
      type: "quoteOfTheDayWidget",
      content: null
    };
  }

  // 6th session of the day: Random Fact Widget
  if (completedSessionsToday === 5) {
    return {
      type: "randomFactWidget",
      content: null
    };
  }

  // 8th session of the day: Dad Joke Widget from icanhazdadjoke API
  if (completedSessionsToday === 7) {
    return {
      type: "dadJokeWidget",
      content: null
    };
  }

  // Regular pool for other sessions
  const availableTypes: RewardType[] = ["facts", "questionsAnswers", "flags", "vocabulary"];
  const selectedType = availableTypes[Math.floor(Math.random() * availableTypes.length)];

  switch (selectedType) {
    case "facts": {
      const fact = allFacts[Math.floor(Math.random() * allFacts.length)];
      return { type: "facts", content: fact };
    }
    case "questionsAnswers": {
      const qa = allQuestionsAnswers[Math.floor(Math.random() * allQuestionsAnswers.length)];
      return { type: "questionsAnswers", content: qa };
    }
    case "flags": {
      const flag = allFlags[Math.floor(Math.random() * allFlags.length)];
      return { type: "flags", content: flag };
    }
    case "vocabulary": {
      const vocab = allVocabulary[Math.floor(Math.random() * allVocabulary.length)];
      return { type: "vocabulary", content: vocab };
    }
    default: {
      const fallbackFact = allFacts[0];
      return { type: "facts", content: fallbackFact };
    }
  }
};