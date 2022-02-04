import React from 'react';
import './App.css';
import GeoTile from './pages/GeoTile';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import WhosThatPokemon from './pages/WhosThatPokemon';

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
          <Routes >
            <Route path="/" element={<GeoTile/>}/>
            <Route path="/geotile" element={<GeoTile/>}/>
            <Route path="/whosthatpokemon" element={<WhosThatPokemon/>}/>
          </Routes > 
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
