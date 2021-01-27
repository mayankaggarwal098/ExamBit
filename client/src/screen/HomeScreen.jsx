import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

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
