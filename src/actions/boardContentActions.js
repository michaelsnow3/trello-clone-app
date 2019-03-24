import {
  REQUEST_BOARD_CONTENT_PENDING,
  REQUEST_BOARD_CONTENT_SUCCESS,
  REQUEST_BOARD_CONTENT_FAILED
} from '../constants/boardContentConstants';

export const setBoardContent = boardId => dispatch => {
  dispatch({ type: REQUEST_BOARD_CONTENT_PENDING });
  fetch(`http://localhost:8888/board/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json())
    .then(data =>
      dispatch({
        type: REQUEST_BOARD_CONTENT_SUCCESS,
        boardLists: data.boardLists
      })
    )
    .catch(error =>
      dispatch({ type: REQUEST_BOARD_CONTENT_FAILED, payload: error })
    );
};
