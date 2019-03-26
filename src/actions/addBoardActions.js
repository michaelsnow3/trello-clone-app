import { BOARD_TITLE_CHANGE } from '../constants/addBoardConstants';

export const handleBoardTitleChange = value => {
  return { type: BOARD_TITLE_CHANGE, payload: value };
};
