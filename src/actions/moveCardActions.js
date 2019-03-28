import {
  SET_TARGET_CARD,
  CLEAR_TARGET_CARD
} from '../constants/moveCardConstants';

export const setTargetCard = (targetCard, currentList) => {
  return {
    type: SET_TARGET_CARD,
    payload: {
      targetCard,
      currentList
    }
  };
};
export const clearTargetCard = (targetCard, currentList) => {
  return {
    type: CLEAR_TARGET_CARD
  };
};
