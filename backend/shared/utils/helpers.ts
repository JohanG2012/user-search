export const stripObjProps = (inputArr: object[], stripArr: string[]): object[] => {
  return inputArr.map(obj => {
    const newObj = { ...obj };
    stripArr.forEach(str => {
      delete newObj[str];
    });
    return newObj;
  });
};


export const getRequestedFields = (fields: string) => {
  const fieldsArr = fields.split(',');
  const requestedFields = { _id: 0 };
  fieldsArr.forEach(field => (requestedFields[field] = 1));
  return requestedFields;
};