export const pluralize = (singular: string, count: number) => {
  return count === 1 ? singular : `${singular}s`;
};
