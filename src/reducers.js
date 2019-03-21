import { 
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED 
} from './constants'

const initialStateUserInfo = {
  userInfo: null,
  error: null,
  isPending: true,
}

export const setUserInfo = (state=initialStateUserInfo, action={}) => {
  switch (action.type) {
    case REQUEST_USER_INFO_PENDING:
      return { ...state, isPending: true }
    case REQUEST_USER_INFO_SUCCESS:
      return { ...state, isPending: false, userInfo: action.payload }
    case REQUEST_USER_INFO_FAILED:
      return { ...state, error: action.payload }
    default:
      return state
  }
}