import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import NavBarComponent from './NavBarComponent';
import GoogleLogout from './googleLogout';
import BrandLogo from '../images/Logo-small.svg';
import '../css/dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.currentUser);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const accessData = JSON.parse(localStorage.getItem('accessData'));

  const userMenuHandler = (e) => {
    if (e.target.textContent === 'arrow_drop_down') {
      e.target.textContent = 'arrow_drop_up';
    } else {
      e.target.textContent = 'arrow_drop_down';
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='DashbordContainer'>
      <NavBarComponent
        BrandLogo={BrandLogo}
        user={user}
        userMenuHandler={userMenuHandler}
      />
      {accessData && accessData.socialLogin ? (
        <GoogleLogout />
      ) : (
        <p
          style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={logoutHandler}
        >
          Logout
        </p>
      )}
    </div>
  );
};

export default Dashboard;
