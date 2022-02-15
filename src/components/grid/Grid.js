import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import './grid.css';

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

  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [canReveal, setCanReveal] = useState(true);
  const [total, setTotal] = useState(0);

  const max = easy ? 4 : 9;

  const shareText =
      `${title} #${dayNumber} ${total}/${max}\r\n` +
      `${ correct ? "❌".repeat(total-1) + "✅" : "❌".repeat(total) }${"⬛".repeat(max-total)}\r\n` +
      `${gameUrl}`;

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
        <Autocomplete
          className="country"
          disablePortal
          id="combo-box-demo"
          options={answers.filter(onlyUnique)}
          sx={{ width: 300 }}
          onChange={(e, value) => setGuess(value)}
          renderInput={(params) => <TextField {...params} placeholder="Choose a Country" />}
        />
        <button className={`submit ${canReveal && !correct ? "disabled": ""}`} disabled={canReveal && !correct} onClick={() => {

          console.log(guess.toLowerCase().trim())
          console.log(rightAnswer.toLowerCase().trim())

          if(correct) {
            navigator.clipboard.writeText(shareText);
          } else {

            if(guess.toLowerCase().trim() === rightAnswer.toLowerCase().trim()) {
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
            setGuess("")
            setCanReveal(true)
          }
        }}>
          {correct ? "Share" : guess === "" ? "Skip guess" : "Submit"}
        </button>
        <div className='guesses'>
        {
          guesses.map(g => <div key={g}>{g} {g.toLowerCase().trim() === rightAnswer.toLowerCase().trim() ? "✅" : "❌"}</div>)
        }
        {
          ((firstInvis + secondInvis + thirdInvis + fourthInvis + fifthInvis + sixthInvis + seventhInvis + eighthInvis + ninthInvis) === max) && canReveal && !correct?
          <div>The answer was {rightAnswer}!</div> : null
        }
        </div>
    </div>
  );

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}

export default Grid;
