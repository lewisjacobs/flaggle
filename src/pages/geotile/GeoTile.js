import React, { useEffect, useState } from 'react';
import './geotile.css';
import Grid from '../../components/Grid';
import { Answers } from './answers';
import { generatePath } from 'react-router-dom';
import generate from './AnswerGenerator';

function GeoTile() {

  const gameStart = new Date("2022-02-01");
  const dayNumber = Math.floor((new Date().getTime() - gameStart.getTime()) / (1000 * 3600 * 24)) + 1;

  const getTodaysFlag = async () => {
    let json = await (await fetch("https://flagcdn.com/en/codes.json")).json();
    
    let flags = [];

    for(var key in json) {
      let value = json[key]
      flags.push({ code: key, country: value.toLowerCase() })
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
    <div className="App">
      <header className="App-header">
        {
          flag && <Grid title={"GeoTile"} rightAnswer={flag.country} image={<img src={`https://flagcdn.com/w320/${flag.code}.png`} alt="puzzle" className='flag'></img>} dayNumber={dayNumber} gameUrl={"https://lewisjacobs.github.io/geogrid"} />
        }
      </header>
    </div>
  );
}

export default GeoTile;
