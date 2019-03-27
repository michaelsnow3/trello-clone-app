import { LIST_TITLE_CHANGE, BOARD_TITLE_CHANGE } from '../constants/onValueChangeConstants';

const initialStateListTitle = {
  value: ''
};

export const handleListTitleChange = (
  state = initialStateListTitle,
  action = {}
) => {
  switch (action.type) {
    case LIST_TITLE_CHANGE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const initialStateBoardTitle = {
  value: ''
};

export const handleBoardTitleChange = (
  state = initialStateBoardTitle,
  action = {}
) => {
  switch (action.type) {
    case BOARD_TITLE_CHANGE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
