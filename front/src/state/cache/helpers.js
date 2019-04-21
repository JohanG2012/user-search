export const generateSearchCache = (state, action) => {
  const newCache = {};
  newCache[action.payload.queryString] = {
    data: action.payload.data,
    next: action.payload.next,
  };
  const search = {
    ...state.search,
    ...newCache,
  };

  let entries = Object.entries(search);
  if (entries.length > 50) {
    entries = entries.slice(entries.length - 50);
  }

  const newSearch = {};

  entries.forEach(([key, value]) => {
    newSearch[key] = value;
  });

  return {
    search: {
      ...newSearch,
    },
  };
};

export default {
  generateSearchCache,
};
