import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './clock.css';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faClock } from '@fortawesome/free-regular-svg-icons';

//const element = <FontAwesomeIcon icon={faClock} />;

const Clock = ({ totalTime }) => {
  const [timer, setTimer] = useState(totalTime);
  // const [isActive, setIsActive] = useState(false);
  // const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    // start button logic here
    // setIsActive(true);
    // setIsPaused(true);
    console.log(parseInt(localStorage.getItem('time')));
    const count = parseInt(localStorage.getItem('time')) || totalTime;
    setTimer(count);
    countRef.current = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
  };

  //   const handlePause = () => {
  //     // Pause button logic here
  //     clearInterval(countRef.current);
  //     setIsPaused(false);
  //   };

  //   const handleResume = () => {
  //     // Resume button logic here
  //     setIsPaused(true);
  //     countRef.current = setInterval(() => {
  //       setTimer(timer => timer + 1);
  //     }, 1000);
  //   };

  //   const handleReset = () => {
  //     // Reset button logic here
  //     clearInterval(countRef.current);
  //     setIsActive(false);
  //     setIsPaused(false);
  //     setTimer(0);
  //   };

  const { loading } = useSelector(state => state.studentResponseSheet);
  useEffect(() => {
    if (loading) {
      handleStart();
    }
  }, []);
  const formatTime = () => {
    if (localStorage.getItem('time') === null)
      localStorage.setItem('time', timer);
    else if (timer !== totalTime) localStorage.setItem('time', timer);

    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  return (
    <div className="clock" style={{ marginTop: '100px', marginLeft: '80px' }}>
      <h3>Remaining Time</h3>
      <div className="stopwatch-card">
        <p>{formatTime()}</p>
        {/* <i className="fas fa-clock fa-4x"></i> */}
        <div className="buttons">
          {/* {!isActive && !isPaused ? ( */}
          {/* <button onClick={handleStart}>Start</button> */}
          {/* ) : isPaused ? (
            <button onClick={handlePause}>Pause</button>
          ) : (
            <button onClick={handleResume}>Resume</button>
          )}
          <button onClick={handleReset} disabled={!isActive}>
            Reset
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Clock;
