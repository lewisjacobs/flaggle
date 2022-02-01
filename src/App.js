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

  const [answer, setAnswer] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://flagcdn.com/w2560/gb-eng.png" className='flag'/>
        <div className='grid'>
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
        <input value={answer} type="text" className={`country ${answer.toLowerCase() === "england" ? "green" : ""}`} onChange={(e) => setAnswer(e.target.value)}/>
      </header>
    </div>
  );
}

export default App;