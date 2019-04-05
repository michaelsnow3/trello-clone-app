import {
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED,
  REQUEST_BOARD_INFO_PENDING,
  REQUEST_BOARD_INFO_SUCCESS,
  REQUEST_BOARD_INFO_FAILED,
  SET_USER_INFO,
  USER_LOGOUT
} from '../constants/userInfoConstants';

const initialStateUserInfo = {
  userId: null,
  username: null,
  redirectPath: null,
  error: null,
  isPending: true,
  usernameExists: false
};

export const userInfo = (state = initialStateUserInfo, action = {}) => {
  switch (action.type) {
    case REQUEST_USER_INFO_PENDING:
      return { ...state, isPending: true };
    case REQUEST_USER_INFO_SUCCESS:
      return {
        ...state,
        isPending: false,
        userId: action.payload.userId,
        username: action.payload.username
      };
    case REQUEST_USER_INFO_FAILED:
      return { ...state, error: action.payload };
    case SET_USER_INFO:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        redirectPath: action.payload.redirectPath,
        usernameExists: action.payload.usernameExists
      };
    case USER_LOGOUT:
      return { ...state, userId: null, username: null };
    default:
      return state;
  }
};

const initialStateUserBoards = {
  boards: [],
  error: null,
  isPending: true
};

export const getUserBoards = (state = initialStateUserBoards, action = {}) => {
  switch (action.type) {
    case REQUEST_BOARD_INFO_PENDING:
      return { ...state, isPending: true };
    case REQUEST_BOARD_INFO_SUCCESS:
      return {
        ...state,
        boards: action.payload,
        isPending: false
      };
    case REQUEST_BOARD_INFO_FAILED:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
};
