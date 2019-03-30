import {
  SET_ACTIVE_BOARD,
  TOGGLE_SETTINGS_MENU
} from '../constants/activeBoardConstants';

export const setBoardInfo = board => {
  return { type: SET_ACTIVE_BOARD, payload: board };
};

export const toggleSettingsMenu = menuType => {
  return { type: TOGGLE_SETTINGS_MENU, payload: { menuType } };
};
