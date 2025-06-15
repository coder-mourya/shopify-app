import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/authSlice';
import { dummyUser, dummyShopInfo } from '../data/dummyData';

const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isCompleted } = useSelector((state) => state.setup);

  useEffect(() => {
    // Auto-login with dummy data for development
    if (!isAuthenticated) {
      dispatch(loginSuccess({
        user: dummyUser,
        shopInfo: dummyShopInfo,
      }));
    }

    // Redirect to setup if not completed
    if (isAuthenticated && !isCompleted) {
      navigate('/welcome');
    }
  }, [isAuthenticated, isCompleted, dispatch, navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (!isCompleted) {
    return null;
  }

  return children;
};

export default AuthGuard;