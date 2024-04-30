export const formatNumberRow = (number: number) => {
  if (number > 0) return `+${number}`;

  return number;
};
