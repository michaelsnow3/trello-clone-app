import {
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED,
  REQUEST_BOARD_INFO_PENDING,
  REQUEST_BOARD_INFO_SUCCESS,
  REQUEST_BOARD_INFO_FAILED
} from '../constants/userInfoConstants';

export const setUserInfo = (getUserBoards) => dispatch => {
  dispatch({ type: REQUEST_USER_INFO_PENDING });
  fetch('http://localhost:8888/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: 'mike',
      passwordHash: 'asdf'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
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
  fetch(`http://localhost:8888/boards/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json())
    .then(data => {
      dispatch({ type: REQUEST_BOARD_INFO_SUCCESS, payload: data.boards });
    })
    .catch(error =>
      dispatch({ type: REQUEST_BOARD_INFO_FAILED, payload: error })
    );
};
