import React from 'react';

function PlayerSettings({ playing, totalTime, setTotalTime, umbral, setUmbral, repTime, setRepTime }) {
  return (
    <div className='sm:top-4 sm:left-4 z-20 relative text-xl px-8 sm:px-1 sm:text-base sm:absolute w-full sm:w-1/3'>
      <div className='grid grid-cols-2'>
        <p>Total Time: </p><p className={`${playing ? 'text-zinc-500' : 'cursor-pointer' }`} onClick={() =>{
          if (!playing) {
            const newVal = prompt("Please write down the new total time in seconds", "600");
            setTotalTime(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal));
          }
        }}>{totalTime}"</p>
        <p>Rep Umbral: </p><p className={`${playing ? 'text-zinc-500' : 'cursor-pointer'}`} onClick={() => {
          if (!playing) {
            const newVal = prompt("Please write down the new umbral time in seconds", "60");
            setUmbral(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal));
          }
        }}>{umbral}"</p>
        <p>Rep Time: </p><p className={`${playing ? 'text-zinc-500' : 'cursor-pointer'}`} onClick={() => {
          if (!playing) {
            const newVal = prompt("Please write down the new reposition time in seconds", "30");
            setRepTime(isNaN(parseInt(newVal)) ? 0 : parseInt(newVal));
          }
        }}>{repTime}"</p>
      </div>
      <hr className='my-2'></hr>
    </div>
  );
}

export default PlayerSettings;
