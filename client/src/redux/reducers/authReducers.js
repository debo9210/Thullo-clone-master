import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SET_CURRENT_USER,
} from '../constant';
import isEmpty from '../../validation/isEmpty';

const initialState = {
  isAuthenticated: false,
  isUserRegistered: false,
  user: {},
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserRegistered: action.payload,
      };
    default:
      return state;
  }
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
