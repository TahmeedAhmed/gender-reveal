import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { questions, journey, finalImage } from './questions'
import './styles.css'

const letters = ['A', 'B', 'C', 'D']
const requiredScore = 10
// Set to false when you are ready to require the quiz again.
const quizDisabledForTesting = false
const placeholder = (n) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 960"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d7d0eb"/><stop offset="1" stop-color="#83799e"/></linearGradient></defs><rect width="800" height="960" fill="url(#g)"/><circle cx="400" cy="450" r="235" fill="none" stroke="#f7f2ff" stroke-width="3" opacity=".75"/><path d="M260 480c75-170 240-150 260 5 18 145-160 190-246 76 50 8 92-24 101-73 9-53-30-81-68-8z" fill="#f7f2ff" opacity=".8"/><text x="400" y="845" fill="#fff" text-anchor="middle" font-family="serif" font-size="28" letter-spacing="8">SCAN ${n}</text></svg>`)} `

function App() {
  const [stage, setStage] = useState('auth')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [chosen, setChosen] = useState(null)
  const [journeyIndex, setJourneyIndex] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [error, setError] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [canShowBoy, setCanShowBoy] = useState(false)
  const [countdown, setCountdown] = useState(120)
  const soundTimers = useRef([])
  const revealTimer = useRef(null)
  const score = useMemo(() => answers.reduce((sum, answer, i) => sum + (answer === questions[i].correct ? 1 : 0), 0), [answers])

  useEffect(() => {
    if (stage !== 'journey') return
    const timer = setTimeout(() => journeyIndex < journey.length - 1 ? setJourneyIndex(journeyIndex + 1) : setStage('spinner'), 5000)
    return () => clearTimeout(timer)
  }, [stage, journeyIndex])

  useEffect(() => () => { soundTimers.current.forEach(clearTimeout); clearTimeout(revealTimer.current) }, [])

    // 🌟 NEW: Add this third useEffect block right here to preload your images
    useEffect(() => {
      // This array matches your folder paths and file names exactly!
      const imagesToPreload = [
        'scans/scan-1.jpeg', 
        'scans/scan-2.jpeg',
        'scans/scan-3.jpeg',
        'scans/scan-4.jpeg',
        'us/farhana-1.jpeg',
        'us/farhana-2.jpeg',
        'us/farhana-3.jpeg',
        'us/farhana-4.jpeg',
        'us/tahmeed-1.jpeg',
        'us/tahmeed-2.jpeg',
        'us/tahmeed-3.jpeg',
        'us/tahmeed-4.jpeg',
        'final-reveal.jpeg'
      ];
  
      imagesToPreload.forEach((imagePath) => {
        const img = new Image();
        // Combines your GitHub base subfolder path with the filename safely
        img.src = `${import.meta.env.BASE_URL || ''}${imagePath}`;
      });
    }, []);
  


  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === GHANA) {
      // 🎵 Unblock browser audio protection on user click interaction
      if (typeof audioContext !== 'undefined' && audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
      } else if (typeof audioCtx !== 'undefined' && audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      } else if (typeof ctx !== 'undefined' && ctx && ctx.state === 'suspended') {
        ctx.resume();
      }

      setLoggedIn(true)         // VIP access flag
      setPasswordError(false)
      setStage('welcome')       // Advance to welcome screen
    } else {
      setPasswordError(true)    // Visual shake/error cue
    }
  }


  const handleGuestLogin = () => {
    // 🎵 Unblock browser audio protection on user click interaction
    if (typeof audioContext !== 'undefined' && audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    } else if (typeof audioCtx !== 'undefined' && audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    } else if (typeof ctx !== 'undefined' && ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    setLoggedIn(false)          // Guest access flag
    setPasswordError(false)
    setStage('welcome')         // Advance to welcome screen
  }

  const playRaffleClick = (context) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(1050, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(280, context.currentTime + 0.035)
    gain.gain.setValueAtTime(0.035, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.045)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(); oscillator.stop(context.currentTime + 0.05)
  }

  const playSpinSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const context = new AudioContext()
    const startedAt = performance.now()
    const tick = () => {
      const elapsed = performance.now() - startedAt
      if (elapsed >= 26000) { context.close(); return }
      // Click spacing continuously widens as the wheel loses momentum.
      const delay = elapsed < 4250 ? 34 : Math.min(265, 55 + ((elapsed - 4250) / 21750) * 210)
      playRaffleClick(context)
      const timer = setTimeout(tick, delay)
      soundTimers.current.push(timer)
    }
    tick()
  }

  const submitAnswer = () => {
    if (chosen === null) return
    const next = [...answers, chosen]
    setAnswers(next); setChosen(null)
    if (index < questions.length - 1) setIndex(index + 1)
    else setStage(next.filter((a, i) => a === questions[i].correct).length >= requiredScore ? 'journey' : 'retry')
  }
  const spin = () => {
    if (spinning) return
    setSpinning(true)
    playSpinSound()
    setTimeout(() => setError(true), 26000)
  }
  const restart = () => { setIndex(0); setAnswers([]); setChosen(null); setStage('quiz') }
  const resetSpin = () => {
    clearTimeout(revealTimer.current)
    setSpinning(false)
    setError(false)
    setReveal(false)
    setCanShowBoy(false)
    setStage('spinner')
  }
  const fixBug = () => {
    setError(false)
    setReveal(true)
    setStage('reveal')
    setCountdown(60) // Reset countdown to 60 seconds
    setCanShowBoy(false)

    // Clear any existing active timers just in case
    clearInterval(revealTimer.current)

    // Set up a 1-second interval ticking down
    revealTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(revealTimer.current)
          setCanShowBoy(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const GHANA = "ghana123" 

  const decreaseTimer = () => {
    setCountdown((prev) => {
      const nextValue = prev - 20
      if (nextValue <= 0) {
        clearInterval(revealTimer.current)
        setCanShowBoy(true)
        return 0
      }
      return nextValue
    })
  }

  return <main className={`app ${stage} ${error ? 'error-mode' : ''}`}>
    <div className="grain" />
    {stage === 'auth' && (
      <section className="welcome fade-in auth-card">
        {/* <p className="eyebrow">Welcome to our reveal</p> */}
        <h1>The Gender Reveal</h1>
        <p className="intro">Please enter the password or proceed as an honorary guest.</p>
        
        <form onSubmit={handlePasswordSubmit} className="auth-form">
          <input 
            type="password" 
            placeholder="Enter family password..." 
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
            className={passwordError ? 'input-error' : ''}
          />
          <button type="submit" className="primary submit-pass">
            Unlock App <span>→</span>
          </button>
        </form>

        {passwordError && <p className="auth-error-msg">Incorrect password. Please try again.</p>}

        <div className="divider"><span>OR</span></div>

        <button className="reset-spin guest-btn" onClick={handleGuestLogin}>
          Login as Guest 👤
        </button>
      </section>
    )}
    {stage === 'welcome' && <section className="welcome fade-in"><h1>The Gender<br /><em>Reveal</em></h1><p className="intro">
      {quizDisabledForTesting 
        ? 'The journey is unlocked for testing.' 
        : loggedIn 
          ? 'Ten trivia questions stand between you and the gender reveal.' 
          : 'Welcome! Take a look back through our pregnancy journey.'}
    </p><button 
      className="primary" 
      onClick={() => {
        if (quizDisabledForTesting) {
          setStage('journey');
        } else if (loggedIn) {
          setStage('quiz');     // Logged-in users take the quiz
        } else {
          setStage('journey');  // Guests bypass straight to ultrasound timeline
        }
      }}
    >
      {quizDisabledForTesting 
        ? 'Begin the journey' 
        : loggedIn 
          ? 'Begin the trivia' 
          : 'View our journey'} <span>→</span>
    </button>{!quizDisabledForTesting && loggedIn && (
      <p className="hint">You’ll need {requiredScore} correct answers to unlock the journey.</p>
    )}</section>}
    {stage === 'quiz' && <section className="quiz-shell fade-in"><header><span className="eyebrow">The little quiz</span><span className="count">{String(index + 1).padStart(2, '0')} <i /> {String(questions.length).padStart(2, '0')}</span></header><div className="progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div><p className="question-number">QUESTION {String(index + 1).padStart(2, '0')}</p><h2>{questions[index].question}</h2>
      {/* <div className="options">{questions[index].options.map((option, optionIndex) => <button key={option} className={chosen === optionIndex ? 'selected' : ''} onClick={() => setChosen(optionIndex)}><b>{letters[optionIndex]}</b>{option}<span>↗</span></button>)}</div> */}
      <div className={`options ${questions[index].isImageOptions ? 'image-grid' : ''}`}>
        {questions[index].options.map((option, optionIndex) => (
          <button 
            key={option} 
            className={`${chosen === optionIndex ? 'selected' : ''} ${questions[index].isImageOptions ? 'has-image' : ''}`} 
            onClick={() => setChosen(optionIndex)}
          >
            <b>{letters[optionIndex]}</b>
            
            {/* Dynamic toggle: Render an image tag if the flag is true, else standard text */}
            {questions[index].isImageOptions ? (
              <img src={option} alt={`Option ${letters[optionIndex]}`} className="option-preview-img" />
            ) : (
              option
            )}
            
            <span>↗</span>
          </button>
        ))}
      </div>
      <button className="primary next" disabled={chosen === null} onClick={submitAnswer}>{index === questions.length - 1 ? 'See your result' : 'Next question'} <span>→</span></button></section>}
    {stage === 'retry' && <section className="welcome fade-in"><p className="eyebrow">Almost there</p><h1>You scored <em>{score}/{questions.length}</em></h1><p className="intro">This secret only unlocks with 7 right answers. Have another go — you’ve got this.</p><button className="primary" onClick={restart}>Try again <span>↻</span></button></section>}
    {stage === 'journey' && <section className="journey-shell fade-in"><p className="eyebrow">Chapter {journeyIndex + 1} of {journey.length}</p><div className="timeline"><div className="timeline-line"><i style={{ height: `${(journeyIndex / (journey.length - 1)) * 100}%` }} /></div>{journey.map((_, i) => <span key={i} className={i <= journeyIndex ? 'active' : ''}>{i + 1}</span>)}</div><article key={journeyIndex} className="scan-card slide-up"><div className="scan-image"><img src={journey[journeyIndex].src || placeholder(journeyIndex + 1)} alt="Baby scan" /></div><div className="scan-copy"><p>{journey[journeyIndex].date}</p><h2>{journey[journeyIndex].title}</h2><small>{journey[journeyIndex].caption}</small></div></article>
      {/* <button className="skip-journey" onClick={() => setStage('spinner')}>Skip journey <small>test mode</small> →</button> */}
      {/* <div className="journey-label">OUR JOURNEY <b>✦</b> A LITTLE LOVE STORY</div> */}
    </section>}
    {stage === 'spinner' && <section className="spinner-shell fade-in"><h1>Spin to reveal<br /><em>the gender</em></h1><p className="intro"></p><div className={`wheel-wrap ${spinning ? 'spinning' : ''}`}><div className="pointer">▼</div><div className="wheel"><div className="boy">BOY <small>★</small></div><div className="girl">GIRL <small>♥</small></div><div className="hub">?</div></div></div>{!spinning && <button className="primary spin-button" onClick={spin}>Spin the wheel <span>↻</span></button>}{spinning && <p className="spin-note"></p>}</section>}
    {reveal && <section className="reveal fade-in">
      <div className="reveal-image">
        <img src={finalImage || placeholder('♥')} alt="The big reveal"/>
      </div>
      
      {/* ⏳ If countdown is running, display timer text and decrease button */}
      {!canShowBoy && (
        <div className="timer-container">
          <p className="timer-text">You have <span className="timer-digits">{countdown}</span> seconds to guess before its spoilt. Hurry!</p>
          <button className="primary decrease-btn" onClick={decreaseTimer}>
            Decrease timer by 20s ⚡
          </button>
        </div>
      )}

      {/* 🎊 Once countdown hits 0, display the final boy button */}
      {canShowBoy && <button className="boy-button">It's a...BOY!! <span>✦</span></button>}
    </section>}
    {error && <div className="fake-error" aria-live="assertive"><div className="error-lines">{Array.from({ length: 34 }, (_, i) => <span key={i} style={{ left: `${(i * 23) % 96}%`, top: `${(i * 53) % 93}%`, animationDelay: `-${i * .17}s` }}>{['process: reveal-ui', 'status: interrupted', 'memory: 0x0000', 'retrying connection', 'trace: pending'][i % 5]}</span>)}</div><div className="error-box"><div className="error-content"><b>Application crashed</b><p className="error-message">An unexpected error stopped this application.</p><pre>{`Error: unable to reconcile reveal state\n    at resolveOutcome (reveal.js:142:18)\n    at spinComplete (reveal.js:89:11)\n    at async startReveal (app.js:31:5)`}</pre><p className="error-code">ERROR_CODE: REVEAL_STATE_UNAVAILABLE</p><button className="fix-bug" onClick={fixBug}>Fix bug <span>→</span></button></div></div></div>}
  </main>
}
createRoot(document.getElementById('root')).render(<App />)
