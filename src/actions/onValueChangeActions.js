import {LIST_TITLE_CHANGE, BOARD_TITLE_CHANGE} from '../constants/onValueChangeConstants'

export const handleListTitleChange = value => {
  return { type: LIST_TITLE_CHANGE, payload: value };
};

export const handleBoardTitleChange = value => {
  return { type: BOARD_TITLE_CHANGE, payload: value };
};
