import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import './grid.scss';
import { styled } from "@mui/material/styles";
  
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

function Grid({ title, description, rightAnswer, image, dayNumber, gameUrl, easy, answers }) {

  const [firstInvis, setFirstInvis] = useState(false);
  const [secondInvis, setSecondInvis] = useState(false);
  const [thirdInvis, setThirdInvis] = useState(false);
  const [fourthInvis, setFourthInvis] = useState(false);
  const [fifthInvis, setFifthInvis] = useState(false);
  const [sixthInvis, setSixthInvis] = useState(false);
  const [seventhInvis, setSeventhInvis] = useState(false);
  const [eighthInvis, setEightInvis] = useState(false);
  const [ninthInvis, setNinthInvis] = useState(false);

  const [guess, setGuess] = useState(null);
  const [correct, setCorrect] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [canReveal, setCanReveal] = useState(true);
  const [total, setTotal] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const max = easy ? 4 : 9;

  const handleGuess = () => {

    if(correct || gameOver) {
      handleSharing();
    } else if(!canReveal) {

      if(guess === rightAnswer) {
        setTotal(firstInvis + secondInvis + thirdInvis + fourthInvis + fifthInvis + sixthInvis + seventhInvis + eighthInvis + ninthInvis);
        setFirstInvis(true);
        setSecondInvis(true);
        setThirdInvis(true);
        setFourthInvis(true);
        setFifthInvis(true);
        setSixthInvis(true);
        setSeventhInvis(true);
        setEightInvis(true);
        setNinthInvis(true);
        setCorrect(true);
      }

      let newGuesses = guesses;
      newGuesses.push(guess);
    
      setGuesses(newGuesses)
      setGuess(null)
      setCanReveal(true)

      console.log(newGuesses.length)

      if(newGuesses.length === max && !correct) setGameOver(true);
      else setCanReveal(true);
    }
  }

  const handleSharing = async () => {

    const canonical = document.querySelector("link[rel=canonical]");
    let url = canonical ? canonical.href : document.location.href;
    const shareDetails = { url, title: `${title} #${dayNumber} ${total}/${max}`, text: `${ correct ? "❌".repeat(total-1) + "✅" : "❌".repeat(total) }${"⬛".repeat(max-total)}` };

    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };

  return (
      <div className='game'>
        <div className='description'>{description}</div>
        <div className='grid'>
          {image}
          <div className='panels'>
            { 
              easy ? 
              <>
                <div className={`panel light big-first-panel ${firstInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !firstInvis) { setFirstInvis(true); setCanReveal(false); }}}/>
                <div className={`panel dark big-second-panel ${secondInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !secondInvis) { setSecondInvis(true); setCanReveal(false); }}}/>
                <div className={`panel light big-third-panel ${thirdInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !thirdInvis) { setThirdInvis(true); setCanReveal(false); }}}/>
                <div className={`panel dark big-fourth-panel ${fourthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !fourthInvis) { setFourthInvis(true); setCanReveal(false); }}}/>
              </>
              :
              <>
                <div className={`panel light first-panel ${firstInvis ? "invisible" : ""} ${easy ? "easy" : ""}`} onClick={() => { if(canReveal && !firstInvis) { setFirstInvis(true); setCanReveal(false); }}}/>
                <div className={`panel dark second-panel ${secondInvis ? "invisible" : ""} ${easy ? "easy" : ""}`} onClick={() => { if(canReveal && !secondInvis) { setSecondInvis(true); setCanReveal(false); }}}/>
                <div className={`panel light third-panel ${thirdInvis ? "invisible" : ""} ${easy ? "easy" : ""}`} onClick={() => { if(canReveal && !thirdInvis) { setThirdInvis(true); setCanReveal(false); }}}/>
                <div className={`panel dark fourth-panel ${fourthInvis ? "invisible" : ""} ${easy ? "easy" : ""}`} onClick={() => { if(canReveal && !fourthInvis) { setFourthInvis(true); setCanReveal(false); }}}/>
                <div className={`panel light fifth-panel ${fifthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !fifthInvis) { setFifthInvis(true); setCanReveal(false); }}}/>
                <div className={`panel dark sixth-panel ${sixthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !sixthInvis) { setSixthInvis(true); setCanReveal(false); }}}/>
                <div className={`panel light seventh-panel ${seventhInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !seventhInvis) { setSeventhInvis(true); setCanReveal(false); }}}/>
                <div className={`panel dark eighth-panel ${eighthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !eighthInvis) { setEightInvis(true); setCanReveal(false); }}}/>
                <div className={`panel light ninth-panel ${ninthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !ninthInvis) { setNinthInvis(true); setCanReveal(false); }}}/>
              </>}
          </div>
        </div>
        <StyledAutocomplete
          className="country"
          id="country-select"
          options={answers.filter(onlyUnique)}
          onChange={(e, value) => { setGuess(value ?? "") }}
          value={guess}
          renderInput={(params) => <TextField {...params} placeholder="Choose a Country" />}
        />
        <button className="submit" onClick={() => handleGuess()}>
          {correct || gameOver ? "Share" : guess === null ? "Skip guess" : "Submit"}
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
          gameOver ?
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
