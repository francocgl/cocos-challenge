export const isPositiveNumber = (num: number) => {
  if (num > 0) return 'cocos__positive-number';
  if (num < 0) return 'cocos__negative-number';
  return '';
};
