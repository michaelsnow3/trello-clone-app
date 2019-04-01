import {
  SET_TARGET_CARD,
  SET_TARGET_LIST
} from '../constants/moveComponentConstants';

export const setTargetCard = (targetCard, currentList) => {
  return {
    type: SET_TARGET_CARD,
    payload: {
      targetCard,
      currentList
    }
  };
};

export const setTargetList = (targetList, hoveredList) => {
  return {
    type: SET_TARGET_LIST,
    payload: {
      targetList,
      hoveredList
    }
  };
};

