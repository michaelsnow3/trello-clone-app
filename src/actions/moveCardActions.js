import {
  SET_TARGET_CARD
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
