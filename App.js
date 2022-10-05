import React from 'react';
export default function App() {
    
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [timeLeft, seTtimeLeft] = React.useState(1500);
    const [timingType, setTimingtype] = React.useState("SESSION");
    
    const [play, setPlay] = React.useState(false);
    
    const timeout = setTimeout(() => {
        if(timeLeft && play){
        seTtimeLeft(timeLeft - 1)
        }
    }, 1000);
    
    const handleBreakIncrease = () => {
        if(breakLength < 60){
        setBreakLength(breakLength + 1)
        }
    }
    
    const handleBreakDecrease = () => {
        if(breakLength > 1){
        setBreakLength(breakLength - 1)
        }
    }
    
    const handleSessionIncrease = () => {
        if(sessionLength < 60){
        setSessionLength(sessionLength + 1)
        seTtimeLeft(timeLeft + 60)
        }
    }
    
    const handleSessionDecrease = () => {
        if(sessionLength > 1){
        setSessionLength(sessionLength - 1)
        seTtimeLeft(timeLeft - 60)
        }
    }
    
    const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
   <div>
    <div id="main-content">
      <h1>25 + 5 Clock</h1>
      <div className="session-options flex">
        <div className="break">
          <h3 id="break-label">Break Length</h3>
          <div className="flex">
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement" className="length red"></button>
            <h4 id="break-length">{breakLength}</h4>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment" className="length green"></button>
          </div>
         </div>
         <div className="session">
           <h3 id="session-label">Session Length</h3>
           <div className="flex">
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement" className="length red"></button>
              <h4 id="session-length">{sessionLength}</h4>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment" className="length green"></button>
          </div>
         </div>
      </div>
      <div>
        <div className="timer">
           <h2 id="timer-label">{title}</h2>
           <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <button onClick={handlePlay} id="start_stop" className="counter-button">Start/Stop</button>
        <button onClick={handleReset} id="reset" className="counter-button">Reset</button>
      </div>
    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>)
}
