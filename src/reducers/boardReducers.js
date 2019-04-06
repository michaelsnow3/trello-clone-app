import {
  REQUEST_BOARD_CONTENT_PENDING,
  REQUEST_BOARD_CONTENT_SUCCESS,
  REQUEST_BOARD_CONTENT_FAILED,
  UPDATE_LIST_POSITION,
  SET_ACTIVE_BOARD,
  TOGGLE_SETTINGS_MENU,
  SET_ACTIVE_BOARD_COLOUR
} from '../constants/boardConstants';

const initialStateUserInfo = {
  activeBoard: null,
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
    case UPDATE_LIST_POSITION:
      return {
        ...state,
        boardLists: action.payload.boardLists
      };
    default:
      return state;
  }
};

const initialStateActiveBoard = {
  board: null
};

export const activeBoard = (state = initialStateActiveBoard, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_BOARD:
      return { ...state, board: action.payload.board };
    default:
      return state;
  }
};

const initialStateSettingsMenu = {
  showMenu: false,
  menuType: '',
  targetId: null
};

export const settingsMenu = (state = initialStateSettingsMenu, action = {}) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_MENU:
      return {
        ...state,
        showMenu: !state.showMenu,
        menuType: action.payload.menuType,
        targetId: action.payload.targetId
      };
    default:
      return state;
  }
};
