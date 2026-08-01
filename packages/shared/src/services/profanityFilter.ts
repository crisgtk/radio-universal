// Spanish profanity filter for Radio Universal forum moderation

const PROFANITY_LIST = [
  'mierda', 'puta', 'puto', 'concha', 'weon', 'weón', 'wn', 'culiao', 'qlio', 'qlo',
  'bastardo', 'pendejo', 'maricon', 'maricón', 'perra', 'malnacido', 'estupido',
  'estúpido', 'idiota', 'imbecil', 'imbécil', 'cabron', 'cabrón', 'chupalo', 'chúpalo',
  'pico', 'tula', 'verga', 'pene', 'vagina', 'zorra', 'maldito'
];

/**
 * Checks if a given string contains offensive or profane words.
 */
export function containsProfanity(text: string): boolean {
  if (!text) return false;
  const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return PROFANITY_LIST.some(word => {
    const wordNormalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(`\\b${wordNormalized}\\b`, 'i');
    return regex.test(normalized);
  });
}

/**
 * Replaces offensive words with asterisks.
 */
export function sanitizeText(text: string): string {
  if (!text) return text;
  let cleanText = text;

  PROFANITY_LIST.forEach(word => {
    const wordNormalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(`\\b${wordNormalized}\\b`, 'gi');
    cleanText = cleanText.replace(regex, '***');
  });

  return cleanText;
}

/**
 * Inspects a message, flags it if profane, and cleans the text.
 */
export function processForumSubmission(author: string, message: string): {
  isFlagged: boolean;
  cleanAuthor: string;
  cleanMessage: string;
  flagReason?: string;
} {
  const authorFlagged = containsProfanity(author);
  const messageFlagged = containsProfanity(message);
  const isFlagged = authorFlagged || messageFlagged;

  return {
    isFlagged,
    cleanAuthor: sanitizeText(author),
    cleanMessage: sanitizeText(message),
    flagReason: isFlagged ? 'Contiene términos no apropiados para el foro' : undefined
  };
}
