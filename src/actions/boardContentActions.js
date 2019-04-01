import {
  REQUEST_BOARD_CONTENT_PENDING,
  REQUEST_BOARD_CONTENT_SUCCESS,
  REQUEST_BOARD_CONTENT_FAILED,
  UPDATE_LIST_POSITION
} from '../constants/boardContentConstants';

import { getFetch } from '../fetchRequests';

export const setBoardContent = boardId => dispatch => {
  dispatch({ type: REQUEST_BOARD_CONTENT_PENDING });
  getFetch(`/board/${boardId}`)
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

export const updateListPosition = boardLists => {
  return { type: UPDATE_LIST_POSITION, payload: { boardLists } };
};
