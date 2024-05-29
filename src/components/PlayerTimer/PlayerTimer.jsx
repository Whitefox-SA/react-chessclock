import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

function PlayerTimer({ playerIndex, expiryTimestamp, totalTime, umbral, repTime, colors, color, players, currentPlayer, setCurrentPlayer }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ 
    expiryTimestamp, 
    onExpire: () => {window.alert(`${playerName} timed up`)}, 
    autoStart: false 
  });

  const [playerName, setPlayerName] = useState(players[playerIndex].name)

  useEffect(() => {
    setPlayerName(players[playerIndex].name);
  }, [players])

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  }

  return (
    <div className={`bg-${color}-950 py-8 ${currentPlayer != playerIndex ? 'hidden' : ''} text-center my-auto text-zinc-200`}>
      <h2 className={`mb-4 text-2xl text-${color}-300`}>{playerName}</h2>
      <div className={`text-6xl ${totalSeconds < umbral ? 'text-rose-700' : ''}`}>
        <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
      </div>
      <div className='mt-4'>
        
        <button className={`${(isRunning || totalSeconds < totalTime) ? 'hidden' : ''} border-1 border-${color}-800 hover:border-${color}-900 hover:bg-${color}-600/75 active:bg-${color}-900 mx-4 px-8 py-2 text-${color}-300 transition-all duration-300`} onClick={start}>Start</button>
        
        <button className={`${isRunning ? '' : 'hidden'} border-1 border-${color}-800 hover:border-${color}-900 hover:bg-${color}-600/75 active:bg-${color}-900 mx-4 px-8 py-2 text-${color}-300 transition-all duration-300`} onClick={() => {
          if (players.length == currentPlayer+1) {
            setCurrentPlayer(0);
          } else {
            setCurrentPlayer(currentPlayer++);
          }

          if (players.length == currentPlayer+1) {
            setCurrentPlayer(0);
          } else {
            setCurrentPlayer(currentPlayer++);
          }

          if (totalSeconds <= umbral) {
            const time = new Date();
            time.setSeconds(time.getSeconds() + totalSeconds + repTime);
            restart(time, false)
          }

          pause();
        }}>Pause</button>
        
        <button className={`${isRunning ? 'hidden' : ''} border-1 border-${color}-800 hover:border-${color}-900 hover:bg-${color}-600/75 active:bg-${color}-900 mx-4 px-8 py-2 text-${color}-300 transition-all duration-300`} onClick={resume}>Resume</button>
      </div>
    </div>
  );
}

export default PlayerTimer;
