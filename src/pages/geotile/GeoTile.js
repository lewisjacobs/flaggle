import React, { useEffect, useState } from 'react';
import './geotile.css';
import Grid from '../../components/grid/Grid';
import { Answers } from './answers';
import Header from '../../components/header/Header';

function GeoTile() {

  const gameStart = new Date("2022-02-01");
  const dayNumber = Math.floor((new Date().getTime() - gameStart.getTime()) / (1000 * 3600 * 24)) + 1;

  const getTodaysFlag = async () => {
    console.log("Loading...")
    
    let json = await (await fetch("https://flagcdn.com/en/codes.json")).json();
    
    let flags = [];

    for(var key in json) {
      let value = json[key]
      flags.push({ code: key, country: value })
    }

    setFlags(flags);
    setFlag(flags[Answers[dayNumber - 1]])
  }
      
  const [flags, setFlags] = useState([]);
  const [flag, setFlag] = useState();

  useEffect(() => {
    getTodaysFlag()
  }, [])

  return (
    <>
      <Header 
          title={"GeoTile"}
          dayNumber={dayNumber}  />
      { flag && 
        <Grid 
          title={"GeoTile"} 
          description={"Click to reveal tiles and guess the flag!"} 
          rightAnswer={flag.country} 
          image={<img src={`https://flagcdn.com/w320/${flag.code}.png`} alt="puzzle" className='flag'></img>} 
          dayNumber={dayNumber} 
          gameUrl={"https://lewisjacobs.github.io/geogrid"} 
          answers={flags.map(m => m.country).sort()}
        /> 
      }
    </>
    );
}

export default GeoTile;
