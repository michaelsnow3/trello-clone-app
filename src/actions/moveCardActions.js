import { TARGET_CARD, NEW_LIST } from '../constants/moveCardConstants';

export const setTargetCard = card => {
  return {
    type: TARGET_CARD,
    payload: card
  };
};

export const updateCardList = newList => {
  return {
    type: NEW_LIST,
    payload: newList
  };
};
