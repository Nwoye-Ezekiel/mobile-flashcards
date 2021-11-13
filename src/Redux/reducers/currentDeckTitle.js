import { SET_CURRENT_DECK_TITLE } from "../actions/setCurrentDeckTitle/setCurrentDeckTitle";

export const currentDeckTitle = (state = "", action) => {
  switch (action.type) {
    case SET_CURRENT_DECK_TITLE:
      return action.title;

    default:
      return state;
  }
};
