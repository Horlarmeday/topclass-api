/**
 * @return {string}
 */
function generateUniqueId(num) {
  const year = new Date().getFullYear();
  const randomNumbers = Math.floor(
    // eslint-disable-next-line no-restricted-properties
    Math.pow(10, num - 1) + Math.random() * 9 * Math.pow(10, num - 1)
  );
  return `${year}${randomNumbers}`;
}
export const generatedReference = generateUniqueId(6);

/**
 * pad id with leading zeros
 *
 * @function
 * @returns {string} generated id data
 * @param {number} num
 * @param {number} targetLength
 */
export function generateId(num, targetLength) {
  return num.toString().padStart(targetLength, 0);
}
