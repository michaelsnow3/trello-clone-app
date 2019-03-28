import { TARGET_CARD } from '../constants/moveCardConstants';

const moveCardInitialState = {
  targetCard: null,
  currentList: null
};

export const moveCard = (state = moveCardInitialState, action = {}) => {
  switch (action.type) {
    case TARGET_CARD:
      return {
        ...state,
        targetCard: action.payload.targetCard,
        currentList: action.payload.currentList
      };
    default:
      return state;
  }
};
