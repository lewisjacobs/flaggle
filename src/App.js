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

  return (
    <div className="App">
      <header className="App-header">
        <div className='grid'>
          <img src="https://flagcdn.com/w2560/gb-eng.png" className='flag'/>
          <div className='panels'>
            <div className={`first-panel ${firstInvis ? "invisible" : ""}`} onClick={() => setFirstInvis(true)}/>
            <div className={`second-panel ${secondInvis ? "invisible" : ""}`} onClick={() => setSecondInvis(true)}/>
            <div className={`third-panel ${thirdInvis ? "invisible" : ""}`} onClick={() => setThirdInvis(true)}/>
            <div className={`fourth-panel ${fourthInvis ? "invisible" : ""}`} onClick={() => setFourthInvis(true)}/>
            <div className={`fifth-panel ${fifthInvis ? "invisible" : ""}`} onClick={() => setFifthInvis(true)}/>
            <div className={`sixth-panel ${sixthInvis ? "invisible" : ""}`} onClick={() => setSixthInvis(true)}/>
            <div className={`seventh-panel ${seventhInvis ? "invisible" : ""}`} onClick={() => setSeventhInvis(true)}/>
            <div className={`eighth-panel ${eighthInvis ? "invisible" : ""}`} onClick={() => setEightInvis(true)}/>
            <div className={`ninth-panel ${ninthInvis ? "invisible" : ""}`} onClick={() => setNinthInvis(true)}/>
          </div>
        </div>
        <input value={guess} type="text" className="country" disabled={correct} onChange={(e) => setGuess(e.target.value)}/>
        <button className='submit' disabled={correct || guess === ""} onClick={() => {

          if(guess.toLowerCase() === "england") setCorrect(true)

          let newGuesses = guesses;
          newGuesses.push(guess);
        
          setGuesses(newGuesses)
          setGuess("")
        }}>
          Submit
        </button>
        <div className='guesses'>
        {
          guesses.map(g => <div>{g} {g.toLowerCase() === "england" ? "✔️" : "❌"}</div>)
        }
        </div>
      </header>
    </div>
  );
}

export default App;
