import { SET_ACTIVE_BOARD } from '../constants/activeBoardConstants';

export const setUserInfo = board => {
  return { type: SET_ACTIVE_BOARD, payload: board };
};
