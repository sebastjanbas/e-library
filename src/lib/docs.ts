export  const badgeStatus = {
    not_started: "Not Started",
    reading: "Reading",
    finished: "Finished",
  } as const;
  export type ReadingStatus = keyof typeof badgeStatus;


export const formatDate = (
  dateString: string,
  locale: string = "en-US"
): string => {
  if (!dateString) return "";

  // Use regex or string split to extract parts
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return dateString;

  // JS months are 0-indexed
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};


export const BookCategories = [
  "Art & Design",
  "Biographies & Memoirs",
  "Business",
  "Children & Young Adult",
  "Comics & Graphic Novels",
  "Cooking & Food",
  "Crafts & DIY",
  "Education",
  "Fantasy & Sci-Fi",
  "Fiction",
  "Finance",
  "Health & Wellness",
  "History",
  "Language & Reference",
  "Mental Health",
  "Music & Photography",
  "Non-Fiction",
  "Personal Development",
  "Philosophy & Religion",
  "Productivity",
  "Romance",
  "Science",
  "Self-Help",
  "Social Sciences",
  "Technology",
  "Textbook",
  "Thriller & Mystery",
  "Travel & Culture"
];

export const languageMap: Record<string, string> = {
  af: "Afrikaans",
  ar: "Arabic",
  az: "Azerbaijani",
  be: "Belarusian",
  bg: "Bulgarian",
  bn: "Bengali",
  bs: "Bosnian",
  ca: "Catalan",
  cs: "Czech",
  da: "Danish",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  et: "Estonian",
  fa: "Persian",
  fi: "Finnish",
  fil: "Filipino",
  fr: "French",
  ga: "Irish",
  gu: "Gujarati",
  he: "Hebrew",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  is: "Icelandic",
  it: "Italian",
  ja: "Japanese",
  jv: "Javanese",
  ka: "Georgian",
  kk: "Kazakh",
  ko: "Korean",
  lt: "Lithuanian",
  lv: "Latvian",
  mk: "Macedonian",
  ml: "Malayalam",
  mn: "Mongolian",
  mr: "Marathi",
  ms: "Malay",
  nb: "Norwegian Bokmål",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sl: "Slovene",
  sr: "Serbian",
  sv: "Swedish",
  sw: "Swahili",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  vi: "Vietnamese",
  zh: "Chinese"
};
