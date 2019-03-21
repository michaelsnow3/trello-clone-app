import { 
  REQUEST_USER_INFO_PENDING,
  REQUEST_USER_INFO_SUCCESS,
  REQUEST_USER_INFO_FAILED 
} from './constants'

export const setUserInfo = () => (dispatch) => {
  dispatch({ type: REQUEST_USER_INFO_PENDING })
  fetch('http://localhost:8888/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'mike',
        passwordHash: 'asdf'
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
    .then(data => dispatch({ type: REQUEST_USER_INFO_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_USER_INFO_FAILED, payload: error }))
}