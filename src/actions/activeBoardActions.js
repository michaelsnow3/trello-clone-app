import { SET_ACTIVE_BOARD } from '../constants/activeBoardConstants';

export const setBoardInfo = board => {
  return { type: SET_ACTIVE_BOARD, payload: board };
};
