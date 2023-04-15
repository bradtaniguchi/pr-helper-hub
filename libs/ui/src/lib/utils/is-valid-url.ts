/**
 * Utility function that uses URL to check if a string is a valid URL.
 *
 * @param url The string to check.
 */
export function isValidUrl(url: string) {
  if (typeof url !== 'string') {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Returns the error message if the string is not a valid URL.
 *
 * @param url the string to check
 */
export function getInvalidUrlError(url: string) {
  if (typeof url !== 'string') return new Error('URL is not a string');
  try {
    new URL(url);
    return;
  } catch (e) {
    return e as Error;
  }
}
