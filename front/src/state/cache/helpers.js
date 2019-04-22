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

/* eslint-disable no-underscore-dangle */
export const removeDeprecatedCache = (state, action) => {
  const stateEntries = Object.entries(state.search);
  const keepEntries = stateEntries.filter(([, obj]) => {
    let exists = true;
    obj.data.forEach(user => {
      if (user._id === action.payload.id) {
        exists = false;
      }
    });
    return exists;
  });

  const newSearch = {};

  keepEntries.forEach(([key, value]) => {
    newSearch[key] = value;
  });

  return {
    search: {
      ...newSearch,
    },
  };
};
/* eslint-enable no-underscore-dangle */

export default {
  generateSearchCache,
};
