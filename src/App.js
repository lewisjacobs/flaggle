import React from 'react';
import './App.css';
import GeoTile from './pages/GeoTile';
import { Route, Switch } from "react-router-dom";
import WhosThatPokemon from './pages/WhosThatPokemon';

function App() {

  return (
    <Switch >
      <Route path="/pokemon" component={<WhosThatPokemon/>}/>
      <Route exact path="/" component={<GeoTile/>}/>
    </Switch > 
  );
}

export default App;
