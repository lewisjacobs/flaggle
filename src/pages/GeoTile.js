import React from 'react';
import './geotile.css';
import Grid from '../components/Grid';

function GeoTile() {

  const next = [
    {
      rightAnswer: "oman",
      flagName: "om"
    },
    {
      rightAnswer: "netherlands",
      flagName: "nl"
    },
    {
      rightAnswer: "south africa",
      flagName: "za"
    },
    {
      rightAnswer: "china",
      flagName: "cn"
    },
    {
      rightAnswer: "lithuania",
      flagName: "lt"
    },
    {
      rightAnswer: "russia",
      flagName: "ru"
    },
    {
      rightAnswer: "uruguay",
      flagName: "uy"
    },
    {
      rightAnswer: "portugal",
      flagName: "pt"
    },
    {
      rightAnswer: "iceland",
      flagName: "is"
    },
    {
      rightAnswer: "guatemala",
      flagName: "gt"
    },
    {
      rightAnswer: "wales",
      flagName: "gb-wls"
    },
    {
      rightAnswer: "canada",
      flagName: "ca"
    }
  ];

  const dayNumber = new Date().getDate();
  const rightAnswer = next[dayNumber - 1].rightAnswer;
  const flagName = next[dayNumber - 1].flagName;

  console.log(dayNumber)
      
  const image = <img src={`https://flagcdn.com/w320/${flagName}.png`} alt="puzzle" className='flag'></img>

  return (
    <div className="App">
      <header className="App-header">
        <Grid title={"GeoTile"} rightAnswer={rightAnswer} image={image} dayNumber={dayNumber} gameUrl={"https://lewisjacobs.github.io/geogrid"} />
      </header>
    </div>
  );
}

export default GeoTile;
