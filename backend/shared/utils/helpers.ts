export const stripObjProps = (inputArr: object[], stripArr: string[]): object[] => {
  return inputArr.map(obj => {
    const newObj = { ...obj };
    stripArr.forEach(str => {
      delete newObj[str];
    });
    return newObj;
  });
};
