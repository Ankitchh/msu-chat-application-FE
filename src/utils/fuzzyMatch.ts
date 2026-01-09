export const fuzzyMatch = (text: string, query: string): boolean => {
  if (!query) return true;

  text = text.toLowerCase();
  query = query.toLowerCase();

  let textIndex = 0;

  for (let i = 0; i < query.length; i++) {
    const foundIndex = text.indexOf(query[i], textIndex);
    if (foundIndex === -1) return false;
    textIndex = foundIndex + 1;
  }

  return true;
};
