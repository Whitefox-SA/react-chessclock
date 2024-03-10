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
    onExpire: () => {
      window.alert(`${playerName} timed up`)
    }, 
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

export default function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [umbral, setUmbral] = useState(60);
  const [totalTime, setTotalTime] = useState(600);
  const [repTime, setRepTime] = useState(30);
  const [color, setColor] = useState('zinc');
  const [playing, setPlaying] = useState(false)
  const [colors, setColors] = useState([
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose']);
  
  useEffect(() => {
    if (players.length > 0) setColor(players[currentPlayer].color);
    setPlaying(players.length > 0);
    console.log(playing)
  }, [currentPlayer, players, color]);

  const selectColor = () => { 
    const colorindex = Math.floor(Math.random() * colors.length) || 0;
    const selectedColor = colors[colorindex] || 'gray';
    setColors(colors.toSpliced(colorindex, 1));
    console.log(colors);
    return selectedColor;
  }

  const addPlayer = () => {
    const newPlayers = [...players];
    newPlayers.pop();
    const selectedColor = selectColor();
    console.log('selectedColor', selectedColor)
    console.log(players)
    const newPlayer = { 
      name: `${selectedColor} player`,
      color: selectedColor,
      expiryTimestamp: new Date(new Date().getTime() + totalTime * 1000),
    };
    const hiddenPlayer = { 
      name: `Hidden`,
      hidden: true,
      expiryTimestamp: new Date(new Date().getTime() + totalTime * 1000),
    };
    setPlayers([...newPlayers, newPlayer, hiddenPlayer]);
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1)
    setPlayers(newPlayers);

    if (players.length == currentPlayer) {
      setCurrentPlayer(0);
    }
    if (players.length == currentPlayer) {
      setCurrentPlayer(0);
    }
  };

  const changeName = (index) => {
    const newPlayers = [...players];
    const newName = prompt("Please write down the new player name")
    newPlayers[index].name = newName ? newName : players[index].color + " player";
    setPlayers(newPlayers);
  };

  return (
    <div className={`${playing ? 'bg-'+color+'-950' : 'bg-zinc-800'} text-zinc-200 h-screen`}> 
    <div className="hidden">
      <div className={`hidden mt-4 border-red-800 bg-red-950 hover:border-red-900 hover:bg-red-600/75 active:bg-red-900 mx-4 text-red-300`}></div>
      <div className={`hidden mt-4 border-orange-800 bg-orange-950 hover:border-orange-900 hover:bg-orange-600/75 active:bg-orange-900 mx-4 text-orange-300`}></div>
      <div className={`hidden mt-4 border-amber-800 bg-amber-950 hover:border-amber-900 hover:bg-amber-600/75 active:bg-amber-900 mx-4 text-amber-300`}></div>
      <div className={`hidden mt-4 border-yellow-800 bg-yellow-950 hover:border-yellow-900 hover:bg-yellow-600/75 active:bg-yellow-900 mx-4 text-yellow-300`}></div>
      <div className={`hidden mt-4 border-lime-800 bg-lime-950 hover:border-lime-900 hover:bg-lime-600/75 active:bg-lime-900 mx-4 text-lime-300`}></div>
      <div className={`hidden mt-4 border-green-800 bg-green-950 hover:border-green-900 hover:bg-green-600/75 active:bg-green-900 mx-4 text-green-300`}></div>
      <div className={`hidden mt-4 border-emerald-800 bg-emerald-950 hover:border-emerald-900 hover:bg-emerald-600/75 active:bg-emerald-900 mx-4 text-emerald-300`}></div>
      <div className={`hidden mt-4 border-teal-800 bg-teal-950 hover:border-teal-900 hover:bg-teal-600/75 active:bg-teal-900 mx-4 text-teal-300`}></div>
      <div className={`hidden mt-4 border-cyan-800 bg-cyan-950 hover:border-cyan-900 hover:bg-cyan-600/75 active:bg-cyan-900 mx-4 text-cyan-300`}></div>
      <div className={`hidden mt-4 border-sky-800 bg-sky-950 hover:border-sky-900 hover:bg-sky-600/75 active:bg-sky-900 mx-4 text-sky-300`}></div>
      <div className={`hidden mt-4 border-blue-800 bg-blue-950 hover:border-blue-900 hover:bg-blue-600/75 active:bg-blue-900 mx-4 text-blue-300`}></div>
      <div className={`hidden mt-4 border-indigo-800 bg-indigo-950 hover:border-indigo-900 hover:bg-indigo-600/75 active:bg-indigo-900 mx-4 text-indigo-300`}></div>
      <div className={`hidden mt-4 border-violet-800 bg-violet-950 hover:border-violet-900 hover:bg-violet-600/75 active:bg-violet-900 mx-4 text-violet-300`}></div>
      <div className={`hidden mt-4 border-purple-800 bg-purple-950 hover:border-purple-900 hover:bg-purple-600/75 active:bg-purple-900 mx-4 text-purple-300`}></div>
      <div className={`hidden mt-4 border-fuchsia-800 bg-fuchsia-950 hover:border-fuchsia-900 hover:bg-fuchsia-600/75 active:bg-fuchsia-900 mx-4 text-fuchsia-300`}></div>
      <div className={`hidden mt-4 border-pink-800 bg-pink-950 hover:border-pink-900 hover:bg-pink-600/75 active:bg-pink-900 mx-4 text-pink-300`}></div>
      <div className={`hidden mt-4 border-rose-800 bg-rose-950 hover:border-rose-900 hover:bg-rose-600/75 active:bg-rose-900 mx-4 text-rose-300`}></div>
    </div>
      <h1 className="py-8 text-4xl text-center">Chess Clock</h1>
      <div className='top-4 left-4 z-20 absolute w-1/3'>
        <div className='grid grid-cols-2'>
          <p>Total Time: </p><p className={`${playing ? 'text-zinc-500' : 'cursor-pointer' }`} onClick={() =>{
            if (!playing) {
              const newVal = prompt("Please write down the new total time in seconds", "600")
              setTotalTime(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal))
            }
          }}>{totalTime}"</p>
          <p>Rep Umbral: </p><p className={`${playing ? 'text-zinc-500' : 'cursor-pointer'}`} onClick={() => {
            if (!playing) {
              const newVal = prompt("Please write down the new umbral time in seconds", "60")
              setUmbral(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal))
            }
          }}>{umbral}"</p>
          <p>Rep Time: </p><p className={`${playing ? 'text-zinc-500' : 'cursor-pointer'}`} onClick={() => {
            if (!playing) {
              const newVal = prompt("Please write down the new reposition time in seconds", "30")
              setRepTime(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal))
            }
          }}>{repTime}"</p>
        </div>
        <hr className='my-2'></hr>
        <div className='grid grid-cols-1'>
          {players.map((player, index) => (
           !player.hidden ? (
              <p>
                <span className={`cursor-pointer text-${player.color}-300`} onClick={() => {changeName(index)}}>{player.name}</span>
                <span className='ms-20'><i className="cursor-pointer bi bi-trash" onClick={() => {removePlayer(index)}}></i></span>
              </p>
          ) : null))}
          <p className='cursor-pointer' onClick={addPlayer}>Add Player</p>
        </div>
      </div>
      <div className="flex justify-center">
      </div>
      <div className='bottom-12 absolute w-screen'>
        {players.map((player, index) => (
          <PlayerTimer
            key={index}
            name={player.name}
            expiryTimestamp={player.expiryTimestamp}
            umbral={umbral}
            totalTime={totalTime}
            repTime={repTime}
            colors={colors}
            color={color}
            playerIndex={index}
            players={players}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
        ))}
      </div>
    </div>
  );
}
