import { TARGET_CARD, NEW_LIST } from '../constants/moveCardConstants';

const moveCardInitialState = {
  targetCard: null,
  newList: null
};

export const moveCard = (state = moveCardInitialState, action = {}) => {
  switch (action.type) {
    case TARGET_CARD:
      return { ...state, targetCard: action.payload };
    case NEW_LIST:
      return { ...state, newList: action.payload };
    default:
      return state;
  }
};
