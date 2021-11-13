export const SET_CURRENT_DECK_TITLE = "SET_CURRENT_DECK_TITLE";

export const setCurrentDeckTitle = (title) => {
  return {
    type: SET_CURRENT_DECK_TITLE,
    title,
  };
};
