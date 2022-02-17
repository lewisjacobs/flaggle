import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './grid.scss';
import { styled } from "@mui/material/styles";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
  
const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-inputRoot": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  }
});

function Grid({ title, description, rightAnswer, image, dayNumber, gameUrl, answers }) {

  const [tileVisibilities, setTileVisibilities] = useState([true, true, true, true, true, true, true, true, true]);
  const [guesses, setGuesses] = useState([]);

  const [currentGuess, setCurrentGuess] = useState(null);
  const [shareClicked, setShareClicked] = useState(false);

  const numberOfClickedTiles = () => tileVisibilities.reduce((a, v) => (v === false ? a + 1 : a), 0);
  const numberOfGuesses = () => guesses.length;
  const canRevealTile = () => numberOfClickedTiles() === numberOfGuesses();

  const shareToClipboard = () => {
    navigator.clipboard.writeText(
      `${title} #${dayNumber} ${gameWon() ? numberOfGuesses() : "X"}/${9}\r\n` +
      `${ gameWon() ? "❌".repeat(numberOfGuesses()-1) + "✅" : "❌".repeat(numberOfGuesses()) }${"⬛".repeat(9-numberOfGuesses())}\r\n` +
      `${gameUrl}`
    );
    setShareClicked(true);
  }

  const setCookie = (name, object) => {
    cookies.set(dayNumber+name, object, { path: '/' });
  }

  const gameWon = () => guesses.includes(rightAnswer);
  const gameLost = () => !gameWon() && numberOfGuesses() === 9;
  
  const addGuess = () => {
    guesses.push(currentGuess);
    setGuesses([...guesses]);
    setCookie("guesses", guesses);
    setCurrentGuess(null);
  }

  const handleButtonClick = () => {

    if(gameWon() || gameLost()) shareToClipboard();
    else if (!canRevealTile()) {
      
      addGuess();
      
      if(currentGuess === rightAnswer || guesses.length === 9) {
        setTileVisibilities([false, false, false, false, false, false, false, false, false]);
        setCookie("tileVisibilities", [false, false, false, false, false, false, false, false, false]);
      } 
    }
  }

  const handleTileClick = (index) => {

    if(canRevealTile() && tileVisibilities[index]) { 
      tileVisibilities[index] = false;
      setTileVisibilities([...tileVisibilities]);
      setCookie("tileVisibilities", tileVisibilities);
    }
  }
  
  const loadCookies = () => {
    const savedTileVisibilities = cookies.get(dayNumber+"tileVisibilities");
    if(savedTileVisibilities) setTileVisibilities(savedTileVisibilities);

    const savedGuesses = cookies.get(dayNumber+"guesses");
    if(savedGuesses) setGuesses(savedGuesses);
  }

  useEffect(() => {
    loadCookies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div className='game'>
        <div className='description'>{description}</div>
        <div className='grid'>
          {image}
          <div className='panels'>
              <div className={`panel light first-panel ${!tileVisibilities[0] ? "invisible" : ""}`} onClick={() => handleTileClick(0)}/>
              <div className={`panel dark second-panel ${!tileVisibilities[1] ? "invisible" : ""}`} onClick={() => handleTileClick(1)}/>
              <div className={`panel light third-panel ${!tileVisibilities[2] ? "invisible" : ""}`} onClick={() => handleTileClick(2)}/>
              <div className={`panel dark fourth-panel ${!tileVisibilities[3] ? "invisible" : ""}`} onClick={() => handleTileClick(3)}/>
              <div className={`panel light fifth-panel ${!tileVisibilities[4] ? "invisible" : ""}`} onClick={() => handleTileClick(4)}/>
              <div className={`panel dark sixth-panel ${!tileVisibilities[5] ? "invisible" : ""}`} onClick={() => handleTileClick(5)}/>
              <div className={`panel light seventh-panel ${!tileVisibilities[6] ? "invisible" : ""}`} onClick={() => handleTileClick(6)}/>
              <div className={`panel dark eighth-panel ${!tileVisibilities[7] ? "invisible" : ""}`} onClick={() => handleTileClick(7)}/>
              <div className={`panel light ninth-panel ${!tileVisibilities[8] ? "invisible" : ""}`} onClick={() => handleTileClick(8)}/>
          </div>
        </div>
        <StyledAutocomplete
          className="country"
          id="country-select"
          options={answers.filter(onlyUnique)}
          onChange={(e, value) => { setCurrentGuess(value ?? "") }}
          value={currentGuess}
          renderInput={(params) => <TextField {...params} placeholder="Choose a Country" />}
        />
        <button className="submit" onClick={() => handleButtonClick()}>
          {shareClicked ? "Copied to Clipboard!" : gameWon() || gameLost() ? "Share" : currentGuess === null ? "Skip guess" : "Submit"}
        </button>
        <div className='guesses'>
        {
          guesses.map((g, index) => 
            <div className={`guess-wrapper ${(index % 2 === 0) ? "filled" : ""}`} key={g}>
              <div className={`guess-icon ${(index % 2 === 0) ? "filled" : ""}`}>{g === rightAnswer ? "✅" : "❌"}</div>
              <div className="guess-text">{g}</div>
            </div>
          )
        }
        {
          gameLost() ?
          <div className="guess-wrapper" key={rightAnswer}>
              <div className="guess-icon">✅</div>
              <div className="guess-text">The answer was {rightAnswer}!</div>
          </div>
          : null
        }
        </div>
    </div>
  );

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}

export default Grid;
