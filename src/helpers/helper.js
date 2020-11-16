// eslint-disable-next-line import/prefer-default-export
export function paginate(page, pageSize) {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
}

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
