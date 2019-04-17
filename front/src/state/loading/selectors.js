export const getLoadingState = (state, action) => state.loading[action] || false;

export default getLoadingState;
