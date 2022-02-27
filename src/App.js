import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [guessHistory, setGuessHistory] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')

  // handler for key presses
  const handleKeyUp = (event) => {
    onLetterGuess(event.key);
    console.log('key pressed = ', event.key)
  }

  // sets state on letter guess
  const onLetterGuess = (guess) => {
    setCurrentGuess(guess);
  }

  // adds key listener one time on mount
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
  
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [])

  return (
    <div className="App" onKeyUp={handleKeyUp}>
      <header className="text-3xl font-bold underline text-center">
        Word Guess Unlimited!
      </header>
      <main>
        {currentGuess}
      </main>
    </div>
  );
}

export default App;
