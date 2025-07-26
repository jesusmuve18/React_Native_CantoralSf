import { token_set_ratio } from 'fuzzball';

const SIMILARITY_THRESHOLD = 70;
const SHORT_INPUT_THRESHOLD = 4;

/**
 * Verifica si `input` está difusamente contenido en `context`
 */
export function Matches(input, context) {
  const inputNorm = input.trim().toLowerCase();
  const contextNorm = context.trim().toLowerCase();

  const inputWords = inputNorm.split(/\s+/);
  const contextWords = contextNorm.split(/\s+/);

  // 🔹 Caso 1: input corto → comparar contra palabras individuales y subcadenas
  if (inputNorm.length <= SHORT_INPUT_THRESHOLD) {
    for (const word of contextWords) {
      const score = token_set_ratio(inputNorm, word);
      if (score >= SIMILARITY_THRESHOLD) return true;

      if (word.includes(inputNorm)) return true; // extra: substring directa
    }
    return false;
  }

  // 🔹 Caso 2: input largo → usar ventanas deslizantes por número de palabras
  const windowSize = inputWords.length;
  for (let i = 0; i <= contextWords.length - windowSize; i++) {
    const window = contextWords.slice(i, i + windowSize).join(' ');
    const score = token_set_ratio(inputNorm, window);
    if (score >= SIMILARITY_THRESHOLD) return true;
  }

  return false;
}
