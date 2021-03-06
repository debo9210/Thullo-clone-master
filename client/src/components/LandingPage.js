import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';
import {
  registerUser,
  loginUser,
  updateUserPass,
} from '../redux/actions/authActions';
import { showPassHandler } from '../utils/showPassHandler';
import GoogleLogin from './googleLogin';
import landingLogo from '../images/Logo.svg';
import googleLogo from '../images/google-logo.jpg';
import '../css/landing.css';
import { GET_CURRENT_PASSWORD_SUCCESS } from '../redux/constant';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');
  const [loginSide, setLoginSide] = useState(true);
  const [signUpSide, setSignUpSide] = useState(false);
  const [resetPassSide, setResetPassSide] = useState(false);

  const errors = useSelector((state) => state.errors);
  const registerStatus = useSelector((state) => state.registerUser);
  const currentUser = useSelector((state) => state.currentUser);
  const { currentPass } = useSelector((state) => state.pass);

  const signUpHandler = () => {
    // navigate('/sign-up');

    const formData = {
      name,
      email,
      password,
      password2,
    };

    dispatch(registerUser(formData));

    setTimeout(() => {
      setName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    }, 2000);
  };

  const loginUserHandler = () => {
    // navigate('/sign-up');

    const formData = {
      email,
      password,
    };

    dispatch(loginUser(formData));
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

  const getCurrentPassHandler = () => {
    const formData = {
      email,
      password,
      newPass,
      newPass2,
    };
    dispatch(updateUserPass(formData));
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
            inputValueHandler={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <InputGroup
            labelName='Email address'
            inputType='email'
            inputName='email'
            placeholderName='name@mail.com'
            inputValueHandler={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <InputGroup
            labelName='Password'
            inputType='password'
            inputName='password'
            placeholderName='Password here'
            inputValueHandler={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <InputGroup
            labelName='Confirm Password'
            inputType='password'
            inputName='confirm-password'
            placeholderName='Confirm Password'
            inputValueHandler={(e) => setPassword2(e.target.value)}
            error={errors.password2}
          />

          <button className='SignUpBtn' onClick={signUpHandler}>
            Sign up
          </button>
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
            inputValueHandler={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <div className='InputGroup'>
            <label htmlFor='password'>Password</label>
            <div className='PasswordContainer'>
              <input
                type='password'
                name='password'
                placeholder='Password here'
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={toggleAuthHandler}>Reset Password</span>
            </div>
            <small className='errorMsg'>{errors ? errors.password : ''}</small>
          </div>
          <div className='InputGroup2'>
            <input type='checkbox' name='checkbox' />
            <small className='rememberPasword'>Remember Password</small>
          </div>
          <button className='LoginBtn' onClick={loginUserHandler}>
            Login
          </button>
          <div className='InputGroup2 NoAcct'>
            <small>Don't have an account?</small>
            <small className='SignUp' onClick={toggleAuthHandler}>
              Sign up
            </small>
          </div>
          <h4 className='BreakLine'>or</h4>
          {/* <button className='GoogleAuth' onClick={socialLoginHandler}>
            <img src={googleLogo} alt='google-logo' />
            <span>Authorize with Google</span>
          </button> */}
          <GoogleLogin googleLogo={googleLogo} />
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
            labelName='Email address'
            inputType='email'
            inputName='email'
            placeholderName='name@mail.com'
            inputValueHandler={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <InputGroup
            labelName='Current Password'
            inputType='password'
            inputName='current-password'
            placeholderName='Current Password'
            inputValueHandler={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className='InputGroup'>
            <label htmlFor='newPassword'>New Password</label>
            <div className='PasswordContainer'>
              <input
                type='password'
                name='newPassword'
                placeholder='New Password'
                onChange={(e) => setNewPass(e.target.value)}
              />
              <i
                className='material-icons visibilityIcon'
                onClick={showPassHandler}
              >
                visibility_off
              </i>
            </div>
            <small className='errorMsg'>{errors ? errors.newPass : ''}</small>
          </div>

          <div className='InputGroup'>
            <label htmlFor='confirm-new-password'>Confirm New Password</label>
            <div className='PasswordContainer'>
              <input
                type='password'
                name='confirm-new-password'
                placeholder='Confirm New Password'
                onChange={(e) => setNewPass2(e.target.value)}
              />
              <i
                className='material-icons visibilityIcon'
                onClick={showPassHandler}
              >
                visibility_off
              </i>
            </div>
            <small className='errorMsg'>{errors ? errors.newPass2 : ''}</small>
          </div>
        </div>
        <button className='UpdatePassBtn' onClick={getCurrentPassHandler}>
          Update Password
        </button>
        <small className='goBack' onClick={toggleAuth2}>
          Back
        </small>
      </div>
    </div>
  );

  useEffect(() => {
    if (registerStatus.isUserRegistered) {
      setSignUpSide(false);
      setLoginSide(true);
    }

    if (currentPass && currentPass.passUpdated) {
      setResetPassSide(false);
      setLoginSide(true);

      dispatch({
        type: GET_CURRENT_PASSWORD_SUCCESS,
        payload: {},
      });
    }

    if (currentUser && currentUser.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [registerStatus, currentUser, navigate, currentPass, dispatch]);

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
