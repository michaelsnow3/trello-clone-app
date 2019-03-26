import { BOARD_TITLE_CHANGE } from '../constants/addBoardConstants';

const boardTitleState = {
  value: ''
};

export const handleBoardTitleChange = (
  state = boardTitleState,
  action = {}
) => {
  switch (action.type) {
    case BOARD_TITLE_CHANGE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
