import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
const HomeScreen = ({ history }) => {
  const { userInfo } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, []);

  return <div></div>;
};

export default HomeScreen;
