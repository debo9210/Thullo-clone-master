import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';

//refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

import { SET_CURRENT_USER } from '../redux/constant';

//google clientID
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLogin = ({ googleLogo }) => {
  const onSuccess = (res) => {
    // console.log('Login Success: currentUser:', res.profileObj);
    // console.log(res);
    const accessData = {
      token: res.accessToken,
      socialLogin: true,
    };
    localStorage.setItem('accessData', JSON.stringify(accessData));

    // set token to auth headers
    setAuthToken(res.accessToken);

    const socialUser = {
      id: res.profileObj.googleId,
      name: res.profileObj.name,
      email: res.profileObj.email,
      image: res.profileObj.imageUrl,
      iat: res.tokenObj.expires_at,
      exp: res.tokenObj.first_issued_at,
    };

    //set current user
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: socialUser,
    });
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <button className='GoogleAuth' onClick={signIn}>
      <img src={googleLogo} alt='google-logo' />
      <span>Authorize with Google</span>
    </button>
  );
};

export default GoogleLogin;
