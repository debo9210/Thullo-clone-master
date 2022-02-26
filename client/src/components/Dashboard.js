import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';
import GoogleLogout from './googleLogout';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.currentUser);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const accessData = JSON.parse(localStorage.getItem('accessData'));

  useEffect(() => {
    if (!currentUser.isAuthenticated) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div>
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
      {/* <p
        style={{
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={logoutHandler}
      >
        Logout
      </p> */}
      <h1>dashboard</h1>
      {/* <GoogleLogout /> */}
    </div>
  );
};

export default Dashboard;
