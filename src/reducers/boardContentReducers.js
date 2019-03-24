import {
  REQUEST_BOARD_CONTENT_PENDING,
  REQUEST_BOARD_CONTENT_SUCCESS,
  REQUEST_BOARD_CONTENT_FAILED
} from '../constants/boardContentConstants';

const initialStateUserInfo = {
  boardLists: [],
  error: null,
  isPending: true
};

export const boardContent = (state = initialStateUserInfo, action = {}) => {
  switch (action.type) {
    case REQUEST_BOARD_CONTENT_PENDING:
      return { ...state, isPending: true };
    case REQUEST_BOARD_CONTENT_SUCCESS:
      return {
        ...state,
        isPending: false,
        boardLists: action.boardLists
      };
    case REQUEST_BOARD_CONTENT_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
