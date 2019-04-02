import {
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED,
  REQUEST_BOARD_INFO_PENDING,
  REQUEST_BOARD_INFO_SUCCESS,
  REQUEST_BOARD_INFO_FAILED,
  USER_REGISTER
} from '../constants/userInfoConstants';

import { getFetch, postFetch } from '../fetchRequests';

export const userLogin = (username, password) => dispatch => {
  dispatch({ type: REQUEST_USER_INFO_PENDING });
  let body = { username, password };

  postFetch(`/user/login/`, body)
    .then(data => data.json())
    .then(data => {
      dispatch({
        type: REQUEST_USER_INFO_SUCCESS,
        userId: data.userId,
        username: data.username
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

export const userRegister = (userId, username) => {
  return {
    type: USER_REGISTER,
    payload: {
      userId,
      username
    }
  };
};
