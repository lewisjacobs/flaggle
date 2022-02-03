import React, { useState } from 'react';
import './App.css';

function App() {

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
    }
  ];

  const dayNumber = new Date().getDate();
  const rightAnswer = next[dayNumber - 1].rightAnswer;
  const flagName = next[dayNumber - 1].flagName;

  const shareText =
      `GeoTile #${dayNumber} ${total}/9\r\n` +
      `${ correct ? "❌".repeat(total-1) + "✅" : "❌".repeat(total) }${"⬛".repeat(9-total)}\r\n` +
      `https://lewisjacobs.github.io/geogrid`;

  return (
    <div className="App">
      <header className="App-header">
        <div className='title'>GeoTile #{dayNumber}</div>
        <div className='grid'>
          <img src={`https://flagcdn.com/w320/${flagName}.png`} className='flag'/>
          <div className='panels'>
            <div className={`first-panel ${firstInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !firstInvis) { setFirstInvis(true); setCanReveal(false); }}}/>
            <div className={`second-panel ${secondInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !secondInvis) { setSecondInvis(true); setCanReveal(false); }}}/>
            <div className={`third-panel ${thirdInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !thirdInvis) { setThirdInvis(true); setCanReveal(false); }}}/>
            <div className={`fourth-panel ${fourthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !fourthInvis) { setFourthInvis(true); setCanReveal(false); }}}/>
            <div className={`fifth-panel ${fifthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !fifthInvis) { setFifthInvis(true); setCanReveal(false); }}}/>
            <div className={`sixth-panel ${sixthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !sixthInvis) { setSixthInvis(true); setCanReveal(false); }}}/>
            <div className={`seventh-panel ${seventhInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !seventhInvis) { setSeventhInvis(true); setCanReveal(false); }}}/>
            <div className={`eighth-panel ${eighthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !eighthInvis) { setEightInvis(true); setCanReveal(false); }}}/>
            <div className={`ninth-panel ${ninthInvis ? "invisible" : ""}`} onClick={() => { if(canReveal && !ninthInvis) { setNinthInvis(true); setCanReveal(false); }}}/>
          </div>
        </div>
        <input value={guess} type="text" className="country" disabled={correct || canReveal} onChange={(e) => setGuess(e.target.value)}/>
        <button className={`submit ${canReveal && !correct ? "disabled": ""}`} disabled={canReveal && !correct} onClick={() => {

          if(correct) navigator.clipboard.writeText(shareText);
          else {

            if(guess.toLowerCase() === rightAnswer) {
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
          guesses.map(g => <div key={g}>{g} {g.toLowerCase() === rightAnswer ? "✅" : "❌"}</div>)
        }
        {
          ((firstInvis + secondInvis + thirdInvis + fourthInvis + fifthInvis + sixthInvis + seventhInvis + eighthInvis + ninthInvis) === 9) && canReveal && !correct?
          <div>The answer was {rightAnswer}!</div> : null
        }
        </div>
      </header>
    </div>
  );
}

export default App;
