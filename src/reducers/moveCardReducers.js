import { SET_TARGET_CARD, CLEAR_TARGET_CARD } from '../constants/moveCardConstants';

const moveCardInitialState = {
  targetCard: null,
  currentList: null
};

export const moveCard = (state = moveCardInitialState, action = {}) => {
  switch (action.type) {
    case SET_TARGET_CARD:
      return {
        ...state,
        targetCard: action.payload.targetCard,
        currentList: action.payload.currentList
      };
    case CLEAR_TARGET_CARD: 
      return {
        ...state,
        targetCard: null,
        currentList: null
      }
    default:
      return state;
  }
};
