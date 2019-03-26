import { BOARD_TITLE_CHANGE } from '../constants/addBoardConstants';

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
