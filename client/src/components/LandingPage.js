import React from 'react';
import landingLogo from '../images/Logo.svg';
import googleLogo from '../images/google-logo.jpg';
import '../css/landing.css';

const LandingPage = () => {
  return (
    <div className='Landing'>
      <div className='LandingContainer'>
        <div className='LandingLogo'>
          <img className='LandingImage' src={landingLogo} alt='landing-logo' />
        </div>
        <div className='LoginSide'>
          <div className='LoginContainer'>
            <h2>Login</h2>
            <div className='LoginInputGroup'>
              <div className='InputGroup'>
                <label htmlFor='email'>Email address</label>
                <input type='email' name='email' placeholder='name@mail.com' />
              </div>
              <div className='InputGroup'>
                <label htmlFor='password'>Password</label>
                <div className='PasswordContainer'>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password here'
                  />
                  <span>Reset Password</span>
                </div>
              </div>
              <div className='InputGroup2'>
                <input type='checkbox' name='checkbox' />
                <small className='rememberPasword'>Remember Password</small>
              </div>
              <button className='LoginBtn'>Login</button>
              <div className='InputGroup2 NoAcct'>
                <small>Don't have an account?</small>
                <small className='SignUp'>Sign up</small>
              </div>
              <h4 className='BreakLine'>or</h4>
              <button className='GoogleAuth'>
                <img src={googleLogo} alt='google-logo' />
                <span>Authorize with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
