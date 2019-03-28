import { TARGET_CARD } from '../constants/moveCardConstants';

export const setTargetCard = (targetCard, currentList) => {
  return {
    type: TARGET_CARD,
    payload: {
      targetCard,
      currentList
    }
  };
};