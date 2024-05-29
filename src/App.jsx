import React, { useState, useEffect } from 'react';
import PlayerTimer from './components/PlayerTimer/PlayerTimer';
import PlayerList from './components/PlayerList/PlayerList';
import PlayerSettings from './components/PlayerSettings/PlayerSettings';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [umbral, setUmbral] = useState(60);
  const [totalTime, setTotalTime] = useState(600);
  const [repTime, setRepTime] = useState(30);
  const [color, setColor] = useState('zinc');
  const [playing, setPlaying] = useState(false)
  const [colors, setColors] = useState([
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
  ]);

  useEffect(() => {
    if (players.length > 0) setColor(players[currentPlayer].color);
    setPlaying(players.length > 0);
  }, [currentPlayer, players]);

  const selectColor = () => { 
    const colorindex = Math.floor(Math.random() * colors.length) || 0;
    const selectedColor = colors[colorindex] || 'gray';
    setColors(colors.toSpliced(colorindex, 1));
    return selectedColor;
  }

  const addPlayer = () => {
    const newPlayers = [...players];
    newPlayers.pop();
    const selectedColor = selectColor();
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
  };

  const changeName = (index) => {
    const newPlayers = [...players];
    const newName = prompt("Please write down the new player name")
    newPlayers[index].name = newName ? newName : players[index].color + " player";
    setPlayers(newPlayers);
  };

  return (
    <div className={`${playing ? 'bg-'+color+'-950' : 'bg-zinc-800'} text-zinc-200 h-screen`}> 
      <h1 className="py-8 text-4xl text-center">Chess Clock</h1>
      <PlayerSettings
        playing={playing}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        umbral={umbral}
        setUmbral={setUmbral}
        repTime={repTime}
        setRepTime={setRepTime}
      />
      <PlayerList
        players={players}
        addPlayer={addPlayer}
        removePlayer={removePlayer}
        changeName={changeName}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        umbral={umbral}
        setUmbral={setUmbral}
        repTime={repTime}
        setRepTime={setRepTime}
      />
      <div className='sm:bottom-12 sm:absolute w-screen'>
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
