import {
  SET_ACTIVE_BOARD
} from '../constants/activeBoardConstants';

const initialStateActiveBoard = {
  activeBoard: null
};

export const boardInfo = (state = initialStateActiveBoard, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_BOARD:
      return { ...state, activeBoard: action.payload };
    default:
      return state;
  }
};