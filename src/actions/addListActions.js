import {LIST_TITLE_CHANGE} from '../constants/addListConstants'

export const handleListTitleChange = value => {
  return { type: LIST_TITLE_CHANGE, payload: value };
};