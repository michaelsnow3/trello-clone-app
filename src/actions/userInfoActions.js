import {
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED,
  REQUEST_BOARD_INFO_PENDING,
  REQUEST_BOARD_INFO_SUCCESS,
  REQUEST_BOARD_INFO_FAILED,
  SET_USER_INFO,
  USER_LOGOUT,
  SET_INCORRECT_LOGIN
} from '../constants/userInfoConstants';

import { getFetch, postFetch } from '../fetchRequests';

export const userLogin = (username, password) => dispatch => {
  dispatch({ type: REQUEST_USER_INFO_PENDING });
  let body = { username, password };

  postFetch(`/user/login/`, body)
    .then(data => data.json())
    .then(data => {
      localStorage.setItem('jwt', data.token);
      dispatch({
        type: REQUEST_USER_INFO_SUCCESS,
        payload: {
          userId: data.userId,
          username: data.username,
          incorrectLogin: data.incorrectLogin
        }
      });
    })
    .catch(error =>
      dispatch({ type: REQUEST_USER_INFO_FAILED, payload: error })
    );
};

export const getUserBoards = userId => dispatch => {
  dispatch({ type: REQUEST_BOARD_INFO_PENDING });
  getFetch(`/board/all/${userId}`)
    .then(data => data.json())
    .then(data => {
      dispatch({ type: REQUEST_BOARD_INFO_SUCCESS, payload: data.boards });
    })
    .catch(error =>
      dispatch({ type: REQUEST_BOARD_INFO_FAILED, payload: error })
    );
};

export const setUserInfo = (userId, username, redirectPath) => {
  return {
    type: SET_USER_INFO,
    payload: {
      userId,
      username,
      redirectPath
    }
  };
};

export const userLogout = () => {
  return { type: USER_LOGOUT };
};

export const setIncorrectLogin = incorrectLogin => {
  return { type: SET_INCORRECT_LOGIN, payload: { incorrectLogin } };
};
