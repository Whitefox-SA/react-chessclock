import React from 'react';

function PlayerList({ players, addPlayer, removePlayer, changeName, totalTime, setTotalTime, umbral, setUmbral, repTime, setRepTime }) {
  return (
    <div className="sm:top-4 sm:left-4 z-20 relative text-xl px-8 sm:px-1 sm:text-base sm:absolute w-full sm:w-1/3">
      <div className="grid grid-cols-2">
        <p>Total Time: </p>
        <p className="cursor-pointer" onClick={() =>{
          const newVal = prompt("Please write down the new total time in seconds", "600");
          setTotalTime(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal));
        }}>{totalTime}"</p>
        <p>Rep Umbral: </p>
        <p className="cursor-pointer" onClick={() => {
          const newVal = prompt("Please write down the new umbral time in seconds", "60");
          setUmbral(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal));
        }}>{umbral}"</p>
        <p>Rep Time: </p>
        <p className="cursor-pointer" onClick={() => {
          const newVal = prompt("Please write down the new reposition time in seconds", "30");
          setRepTime(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal));
        }}>{repTime}"</p>
      </div>
      <hr className="my-2"></hr>
      <div className="grid grid-cols-1">
        {players.map((player, index) => (
          !player.hidden ? (
            <p key={index} className="grid sm:grid-cols-3 grid-cols-2">
              <span className={`cursor-pointer sm:col-span-2 col-auto text-${player.color}-300`} onClick={() => {changeName(index)}}>{player.name}</span>
              {players.length > 2 && (
                <span>
                  <i className="cursor-pointer bi bi-trash" onClick={() => {removePlayer(index)}}></i>
                </span>
              )}
            </p>
        ) : null))}
        <p className="cursor-pointer" onClick={addPlayer}>Add Player</p>
      </div>
    </div>
  );
}

export default PlayerList;
