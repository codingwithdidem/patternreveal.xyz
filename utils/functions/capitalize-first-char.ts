/**
 * Capitalizes the first character of a string
 * @param str - The string to capitalize
 * @returns The string with its first character capitalized
 */
export function capitalizeFirstChar(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
