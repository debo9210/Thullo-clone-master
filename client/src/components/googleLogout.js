import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';
import { SET_CURRENT_USER } from '../redux/constant';

//google clientID
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLogout = () => {
  const navigate = useNavigate();

  const onLogoutSuccess = (res) => {
    localStorage.removeItem('accessData');

    // set token to auth headers
    setAuthToken(false);

    //set current user
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: {},
    });

    navigate('/');

    // alert('Logout successfully');
  };

  const onFailure = () => {
    console.log('handle failure issues');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button
      // className='GoogleAuth'
      onClick={signOut}
      style={{ border: '1px solid red', cursor: 'pointer' }}
    >
      {/* <img src={googleLogo} alt='google-logo' />
      <span>Authorize with Google</span> */}
      Google logout
    </button>
  );
};

export default GoogleLogout;
