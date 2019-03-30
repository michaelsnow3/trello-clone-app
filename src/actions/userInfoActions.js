import {
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED,
  REQUEST_BOARD_INFO_PENDING,
  REQUEST_BOARD_INFO_SUCCESS,
  REQUEST_BOARD_INFO_FAILED
} from '../constants/userInfoConstants';

import {getFetch, postFetch} from '../fetchRequests'

export const setUserInfo = (getUserBoards) => dispatch => {
  dispatch({ type: REQUEST_USER_INFO_PENDING });
  let body = {
    username: 'mike',
    passwordHash: 'asdf'
  }
  postFetch('/user/login', body)
    .then(data => data.json())
    .then(data => {
      getUserBoards(data.userId)
      dispatch({
        type: REQUEST_USER_INFO_SUCCESS,
        userId: data.userId,
        username: data.username,
        boards: data.boards
      })
    }
    )
    .catch(error =>
      dispatch({ type: REQUEST_USER_INFO_FAILED, payload: error })
    );
};

export const getUserBoards = userId => dispatch => {
  dispatch({ type: REQUEST_BOARD_INFO_PENDING });
  getFetch(`/boards/${userId}`)
    .then(data => data.json())
    .then(data => {
      dispatch({ type: REQUEST_BOARD_INFO_SUCCESS, payload: data.boards });
    })
    .catch(error =>
      dispatch({ type: REQUEST_BOARD_INFO_FAILED, payload: error })
    );
};
