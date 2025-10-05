import React, { useState, useEffect, useRef } from 'react';


export function PilotGame() {
  
  const numSatellites = 5;

  const [signals, setSignals] = useState(Array(numSatellites).fill(100));
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [paused, setPaused] = useState(false);
  const [funFact, setFunFact] = useState(null);
  const [modalProgress, setModalProgress] = useState(0);

  const maxMisses = 5;
  const threshold = 30;
  const modalDuration = 10000;
  const minSpeed = 0.5;
  const maxSpeed = 1.50;
  const speedFluctuation = 0.05;

  const funFacts = [
    "Oops! A solar flare just weakened a GPS signal! Pilots must act fast!",
    "Signal lost! Pilots rely on instruments to stay on course.",
    "Solar flares can confuse satellites! Keep the GPS signals strong!",
    "Did you know? Solar flares can disrupt GPS and radio signals used by pilots!"
  ];

  const missedFlags = useRef(Array(numSatellites).fill(false));
  const satelliteSpeeds = useRef([]);

  const initSpeeds = () => {
    satelliteSpeeds.current = Array(numSatellites).fill(1).map(
      () => Math.random() * (maxSpeed - minSpeed) + minSpeed
    );
  };
  
  useEffect(() => initSpeeds(), []);


  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (paused) return;

    const timer = setInterval(() => {
      setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, startTime, paused]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    let animationFrame;

    const animate = () => {
      if (paused) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      setSignals(prev => {
        const newSignals = [...prev];
        const idx = Math.floor(Math.random() * numSatellites);

        satelliteSpeeds.current[idx] += (Math.random() * 2 - 1) * speedFluctuation;
        satelliteSpeeds.current[idx] = Math.max(minSpeed, Math.min(maxSpeed, satelliteSpeeds.current[idx]));

        const newValue = Math.max(newSignals[idx] - satelliteSpeeds.current[idx], 0);

        if (newValue === 0 && prev[idx] > 0 && !missedFlags.current[idx]) {
          missedFlags.current[idx] = true;
          newSignals[idx] = 100;

          setMisses(prevMisses => {
            const updated = prevMisses + 1;

            if (updated < maxMisses) {
              setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
              setModalProgress(0);
              setPaused(true);
            }

            if (updated >= maxMisses) setGameOver(true);
            return updated;
          });

          setTimeout(() => missedFlags.current[idx] = false, 50);
        } else {
          newSignals[idx] = newValue;
        }

        return newSignals;
      });

      if (!gameOver) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [gameStarted, gameOver, paused]);

  const handleClick = index => {
    if (!gameStarted || gameOver || paused) return;
    if (signals[index] < threshold) setScore(prev => prev + 1);
    setSignals(prev => prev.map((v, i) => i === index ? 100 : v));
  };

  useEffect(() => {
    if (!funFact) return;
    let progress = 0;
    const interval = 30;
    const increment = 100 / (modalDuration / interval);

    const timer = setInterval(() => {
      progress += increment;
      setModalProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        setFunFact(null);
        setPaused(false);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [funFact]);

  const startGame = () => {
    setSignals(Array(numSatellites).fill(100));
    setGameOver(false);
    setGameStarted(true);
    setScore(0);
    setMisses(0);
    setStartTime(Date.now());
    setCurrentTime(0);
    setPaused(false);
    setFunFact(null);
    setModalProgress(0);
    missedFlags.current = Array(numSatellites).fill(false);
    initSpeeds();
  };

  const restartGame = () => startGame();

  const radius = 170;
  const rocketSize = 60;
  const satelliteSize = 80;

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      fontFamily: 'Arial',
      color: '#fff',
      margin : "0",
      padding : "0",
      backgroundImage: 'url("/space.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      

      
      <div style={{
        position:'relative',
        zIndex:1,
        padding:'20px',
        borderRadius:'12px',
        backgroundColor:'rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ fontSize:'36px', color:'#00f0ff', textAlign:'center' }}>Pilot Radar GPS Game</h1>

        {!gameStarted ? (
          <div style={{ display:'flex', justifyContent:'center', marginTop:'30px' }}>
            <button onClick={startGame} style={{
              padding:'16px 32px',
              backgroundColor:'#00f0ff',
              color:'#000',
              fontWeight:'bold',
              fontSize:'18px',
              borderRadius:'10px',
              border:'none',
              cursor:'pointer'
            }}>Start Mission</button>
          </div>
        ) : (
          <>
            <div style={{ position:'relative', width:`${radius*2 + 150}px`, height:`${radius*2 + 150}px`, margin:'40px auto' }}>
              <div style={{
                position:'absolute',
                top:'50%',
                left:'50%',
                width:`${radius*2}px`,
                height:`${radius*2}px`,
                transform:'translate(-50%, -50%)',
                borderRadius:'50%',
                border:'2px solid #00f0ff',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
              }}>
                <div style={{ fontSize: `${rocketSize}px` }}>🚀</div>
              </div>

              {/* Satellites */}
              {signals.map((signal, i) => {
                const angle = (i/numSatellites) * 2 * Math.PI;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                return (
                  <div key={i} onClick={()=>handleClick(i)} style={{
                    position:'absolute',
                    left:`calc(50% + ${x}px - ${satelliteSize/2}px)`,
                    top:`calc(50% + ${y}px - ${satelliteSize/2}px)`,
                    cursor:'pointer'
                  }}>
                    <div style={{
                      fontSize:`${satelliteSize}px`,
                      color: signal < threshold ? 'red' : '#00f0ff',
                      transition:'color 0.15s'
                    }}>🛰️</div>
                    <div style={{
                      position:'absolute',
                      left:'50%',
                      top:'50%',
                      width:'2px',
                      height:`${signal*1.5}px`,
                      backgroundColor: signal < threshold ? 'red' : '#00f0ff',
                      transformOrigin:'top center',
                      transform:`translateX(-50%) rotate(${(angle*180/Math.PI)+90}deg)`,
                      borderRadius:'1px',
                      transition:'height 0.15s, background 0.15s'
                    }}></div>
                  </div>
                )
              })}
            </div>

            <div style={{ textAlign:'center', fontSize:'20px' }}>
              {gameOver ? (
                <>
                  <div style={{ color:'red', fontSize:'28px', marginBottom:'10px' }}>Mission Failed!</div>
                  <div>Final Score: {score}</div>
                  <div>Time Survived: {currentTime} s</div>
                  <button onClick={restartGame} style={{ marginTop:'15px', padding:'12px 28px', fontSize:'16px', fontWeight:'bold', borderRadius:'8px', border:'none', backgroundColor:'green', color:'#fff', cursor:'pointer' }}>Retry Mission</button>
                </>
              ) : (
                <>
                  <p>Click satellites to restore GPS signals!</p>
                  <p>Score: {score}</p>
                  <p>Misses: {misses}/{maxMisses}</p>
                  <p>Timer: {currentTime} s</p>
                </>
              )}
            </div>

            {funFact && (
              <div style={{ position:'fixed', top:0,left:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.85)',display:'flex',justifyContent:'center',alignItems:'center',zIndex:1000 }}>
                <div style={{ backgroundColor:'#222', padding:'25px', borderRadius:'12px', textAlign:'center', maxWidth:'500px', color:'#fff', position:'relative' }}>
                  <p style={{ marginBottom:'25px', fontSize:'18px' }}>{funFact}</p>
                  <div style={{ position:'absolute', bottom:0, left:0, width:`${modalProgress}%`, height:'6px', backgroundColor:'#00f0ff', borderRadius:'0 0 12px 12px', transition:'width 0.03s linear' }}></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}


