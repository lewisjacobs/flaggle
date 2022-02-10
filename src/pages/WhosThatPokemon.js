import React from 'react';
import './whosthatpokemon.css';
import Grid from '../components/Grid';

function WhosThatPokemon() {

  const pushedOn = new Date('2022-02-04');
  const daysBetween = (new Date().getTime() - pushedOn.getTime()) / (1000 * 3600 * 24);
  const dayNumber = Math.floor(daysBetween);

  const pokemon = [ "raichu", "kabuto", "onix", "mewtwo", "articuno", "dragonair", "electabuzz", "gastly", "flareon", "graveler", "weezing", "fearow", "mankey", "arbok", "drowzee", "scyther", "goldeen", "rhyhorn", "clefable" ];

  const image = <div className='pokemon-container'><img src={`https://img.pokemondb.net/artwork/${pokemon[dayNumber]}.jpg`} alt="puzzle" className='pokemon'></img></div>
      
  return (
    <div className="App">
      <header className="App-header">
        <Grid title={"Who's That Pokemon"} rightAnswer={pokemon[dayNumber]} image={image} dayNumber={dayNumber + 1} gameUrl={"https://lewisjacobs.github.io/geogrid/whosthatpokemon"} easy />
      </header>
    </div>
  );
}

export default WhosThatPokemon;
