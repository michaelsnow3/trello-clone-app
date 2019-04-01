import { SET_TARGET_CARD, SET_TARGET_LIST } from '../constants/moveComponentConstants';

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
    default:
      return state;
  }
};

const moveListInitialState = {
  targetList: null,
  hoveredList: null
};

export const moveList = (state = moveListInitialState, action = {}) => {
  switch (action.type) {
    case SET_TARGET_LIST:
      return {
        ...state,
        targetList: action.payload.targetList,
        hoveredList: action.payload.hoveredList
      };
    default:
      return state;
  }
}
