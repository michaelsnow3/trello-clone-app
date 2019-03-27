import { LIST_TITLE_CHANGE } from '../constants/addListConstants';

const initialStateListTitle = {
  value: ''
};

export const handleListTitleChange = (
  state = initialStateListTitle,
  action = {}
) => {
  switch (action.type) {
    case LIST_TITLE_CHANGE:
      return { ...state, value: action.payload };
    default:
      return state;
  }
};
