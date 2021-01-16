import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';

const Timer = ({ testId, time, duration, endTest }) => {
  let t1 = moment(time);
  let t2 = new Date();
  t2 = moment(t2);

  let sec = t2.diff(t1, 'second');
  //   let min = t2.diff(t1, 'minute');
  //   let hours = t2.diff(t1, 'hour');
  let d = duration * 60 - sec;
  const [timer, setTimer] = useState(d);
  const countRef = useRef(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
  };

  useEffect(() => {
    handleStart();
  }, []);
  const formatTime = () => {
    if (timer <= 0) {
      if (timer === 0) endTest(testId);
      return `00:00:00`;
    } else {
      const getSeconds = `0${timer % 60}`.slice(-2);
      const minutes = `${Math.floor(timer / 60)}`;
      const getMinutes = `0${minutes % 60}`.slice(-2);
      const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
      return `${getHours} : ${getMinutes} : ${getSeconds}`;
    }
  };

  return <>{formatTime()}</>;
};

export default Timer;
