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
