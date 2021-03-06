import {
  CLEAR_ERRORS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_PASSWORD_REQUEST,
  GET_CURRENT_PASSWORD_SUCCESS,
} from '../constant';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// register user
export const registerUser = (formData, navigate) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({ type: REGISTER_USER_REQUEST });

  axios
    .post('api/users/register', formData)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data.registered,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (formData) => (dispatch) => {
  dispatch(clearErrors());

  // console.log(formData);

  axios
    .post('api/users/login', formData)
    .then((res) => {
      // save token to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // set token to auth headers
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//update user pass
export const updateUserPass = (formData) => async (dispatch) => {
  dispatch(clearErrors());

  // console.log(formData);

  try {
    dispatch({ type: GET_CURRENT_PASSWORD_REQUEST });

    const { data } = await axios.put(`api/users/update-pass`, formData);

    dispatch({
      type: GET_CURRENT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//log user out
export const logoutUser = () => (dispatch) => {
  // remove token from storage
  localStorage.removeItem('jwtToken');
  // localStorage.removeItem('accessToken');

  //remove auth header for future requests
  setAuthToken(false);

  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
