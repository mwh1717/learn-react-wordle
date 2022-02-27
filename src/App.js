import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [guessHistory, setGuessHistory] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')

  // handler for key presses
  const handleKeyUp = (event) => {
    onLetterGuess(event.key);
    onBackspace(event.key);
  }

  // sets stat on backspace, slices currentGuess
  const onBackspace = (press) => {
    if (press === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    }
  }

  // sets state on letter guess, including currentGuess
  const onLetterGuess = (guess) => {
    if (currentGuess.length <= 4) {
      setCurrentGuess(`${currentGuess}${guess}`);
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
  
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [onLetterGuess, onBackspace])

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
