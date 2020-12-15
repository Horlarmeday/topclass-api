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

export function startOfTheYear() {
  const date = new Date('January 01, 2020');
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m, 1);
  // const lastDay = new Date(y, m + 1, 0);
}

export function reduceArray(arr) {
  return arr
    .filter(cost => cost.Invoice !== null)
    .map(cost => Number(cost.amount))
    .reduce((a, b) => a + b, 0);
}

export function removeNullInvoice(arr) {
  return arr.filter(cost => cost.Invoice !== null);
}
