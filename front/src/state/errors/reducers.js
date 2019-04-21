const errorsReducer = (state = {}, action) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);

  if (!match) return state;

  const [, stateName, status] = match;
  return {
    ...state,
    [stateName]: status === 'FAILURE' ? action.payload : '',
  };
};

export default errorsReducer;
