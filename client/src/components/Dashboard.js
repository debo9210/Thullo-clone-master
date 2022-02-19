import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/actions/authActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.currentUser);

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    if (!currentUser.isAuthenticated) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div>
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
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
