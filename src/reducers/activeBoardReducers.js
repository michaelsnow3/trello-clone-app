import {
  SET_ACTIVE_BOARD,
  TOGGLE_SETTINGS_MENU
} from '../constants/activeBoardConstants';

const initialStateActiveBoard = {
  activeBoard: null
};

export const boardInfo = (state = initialStateActiveBoard, action = {}) => {
  switch (action.type) {
    case SET_ACTIVE_BOARD:
      return { ...state, activeBoard: action.payload };
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
