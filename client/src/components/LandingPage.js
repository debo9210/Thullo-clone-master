import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';
import landingLogo from '../images/Logo.svg';
import googleLogo from '../images/google-logo.jpg';
import '../css/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const [loginSide, setLoginSide] = useState(true);
  const [signUpSide, setSignUpSide] = useState(false);
  const [resetPassSide, setResetPassSide] = useState(false);

  const signUpHandler = () => {
    navigate('/sign-up');
  };

  const toggleAuthHandler = (e) => {
    if (e.target.textContent === 'Sign up') {
      setSignUpSide(true);
      setLoginSide(false);
      setResetPassSide(false);
    } else if (signUpSide) {
      setLoginSide(true);
      setSignUpSide(false);
      setResetPassSide(false);
    } else if (e.target.textContent === 'Reset Password') {
      setResetPassSide(true);
      setLoginSide(false);
      setSignUpSide(false);
    }
  };

  const toggleAuth2 = () => {
    setResetPassSide(false);
    setLoginSide(true);
    // setSignUpSide(false);
  };

  const SIGNUP = (
    <div className='SignUpSide'>
      <div className='SignUpContainer'>
        <h2>Sign Up</h2>
        <div className='SignUpInputGroup'>
          <InputGroup
            labelName='Your Name'
            inputType='text'
            inputName='name'
            placeholderName='Name'
          />

          <InputGroup
            labelName='Email address'
            inputType='email'
            inputName='email'
            placeholderName='name@mail.com'
          />

          <InputGroup
            labelName='Password'
            inputType='password'
            inputName='password'
            placeholderName='Password here'
          />

          <InputGroup
            labelName='Confirm Password'
            inputType='password'
            inputName='confirm-password'
            placeholderName='Confirm Password'
          />

          <button className='SignUpBtn'>Sign up</button>
          <small className='goBack' onClick={toggleAuthHandler}>
            Back
          </small>
        </div>
      </div>
    </div>
  );

  const LOGIN = (
    <div className='LoginSide'>
      <div className='LoginContainer'>
        <h2>Login</h2>
        <div className='LoginInputGroup'>
          <InputGroup
            labelName='Email address'
            inputType='email'
            inputName='email'
            placeholderName='name@mail.com'
          />

          <div className='InputGroup'>
            <label htmlFor='password'>Password</label>
            <div className='PasswordContainer'>
              <input
                type='password'
                name='password'
                placeholder='Password here'
              />
              <span onClick={toggleAuthHandler}>Reset Password</span>
            </div>
          </div>
          <div className='InputGroup2'>
            <input type='checkbox' name='checkbox' />
            <small className='rememberPasword'>Remember Password</small>
          </div>
          <button className='LoginBtn'>Login</button>
          <div className='InputGroup2 NoAcct'>
            <small>Don't have an account?</small>
            <small className='SignUp' onClick={toggleAuthHandler}>
              Sign up
            </small>
          </div>
          <h4 className='BreakLine'>or</h4>
          <button className='GoogleAuth'>
            <img src={googleLogo} alt='google-logo' />
            <span>Authorize with Google</span>
          </button>
        </div>
      </div>
    </div>
  );

  const RESET_PASSWORD = (
    <div className='ResetPassSide'>
      <div className='ResetPassSideContainer'>
        <h2>Reset Pass</h2>
        <div className='SignUpInputGroup'>
          <InputGroup
            labelName='Current Password'
            inputType='password'
            inputName='current-password'
            placeholderName='Current Password'
          />

          <InputGroup
            labelName='New Password'
            inputType='password'
            inputName='password'
            placeholderName='New Password'
          />

          <InputGroup
            labelName='Confirm New Password'
            inputType='password'
            inputName='confirm-new-password'
            placeholderName='Confirm New Password'
          />
        </div>
        <button className='UpdatePassBtn'>Update Password</button>
        <small className='goBack' onClick={toggleAuth2}>
          Back
        </small>
      </div>
    </div>
  );

  return (
    <div className='Landing'>
      <div className='LandingContainer'>
        <div className='LandingLogo'>
          <img className='LandingImage' src={landingLogo} alt='landing-logo' />
        </div>
        <div className='AuthContainer'>
          {signUpSide && SIGNUP}
          {loginSide && LOGIN}
          {resetPassSide && RESET_PASSWORD}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
