import {
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED
} from '../constants/userInfoConstants';

const initialStateUserInfo = {
  userId: null,
  username: null,
  boards: [],
  error: null,
  isPending: true
};

export const userInfo = (state = initialStateUserInfo, action = {}) => {
  switch (action.type) {
    case REQUEST_USER_INFO_PENDING:
      return { ...state, isPending: true };
    case REQUEST_USER_INFO_SUCCESS:
      return {
        ...state,
        isPending: false,
        userId: action.userId,
        username: action.username,
        boards: action.boards
      };
    case REQUEST_USER_INFO_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
