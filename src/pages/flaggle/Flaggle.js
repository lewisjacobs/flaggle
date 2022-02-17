import React, { useEffect, useState } from 'react';
import './flaggle.scss';
import Grid from '../../components/grid/Grid';
import { Answers } from './answers';
import Header from '../../components/header/Header';
const json = require('./countries.json')

function Flaggle() {

  const gameStart = new Date("2022-02-01");
  const dayNumber = Math.floor((new Date().getTime() - gameStart.getTime()) / (1000 * 3600 * 24)) + 1;

  const getTodaysFlag = async () => {
    console.log("Loading...")
    
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
  }, []) // eslint-disable-line

  return (
    <>
      <Header 
          title={"FLAGGLE"}
          dayNumber={dayNumber}  />
      { flag && 
        <Grid 
          title={"Flaggle"} 
          description={"Click to reveal tiles and guess the flag!"} 
          rightAnswer={flag.country} 
          image={<img src={`https://flagcdn.com/w320/${flag.code}.png`} alt="puzzle" className='flag'></img>} 
          dayNumber={dayNumber} 
          gameUrl={"https://lewisjacobs.github.io/flaggle"} 
          answers={flags.map(m => m.country).sort()}
        /> 
      }
    </>
    );
}

export default Flaggle;
