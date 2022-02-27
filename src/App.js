import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [guessHistory, setGuessHistory] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')

  // handler for key presses
  const handleKeyUp = (event) => {

    // backspace
    if (event.key === 'Backspace') {
      onBackspace();
    }

    // a-z only
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      onLetterGuess(event.key);
    }

    // enter
    if (event.key === 'Enter') {
      onGuessSubmit();
    }
  }

  // slices currentGuess
  const onBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  }

  // sets state on letter guess, including currentGuess
  const onLetterGuess = (guess) => {
    if (currentGuess.length <= 4) {
      setCurrentGuess(`${currentGuess}${guess}`);
    }
  }

  // submits guess by adding to guessHistory and resetting currentGuess for new guesses
  const onGuessSubmit = () => {
    if (currentGuess.length === 5) {
      setGuessHistory(guessHistory.concat(currentGuess));
      setCurrentGuess('');
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
  
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [onLetterGuess, onBackspace, onGuessSubmit])

  return (
    <div className="App" onKeyUp={handleKeyUp}>
      <header className="text-3xl font-bold underline text-center">
        Word Guess Unlimited!
      </header>
      <div className="guess-history-container">
        {guessHistory.map((guess, idx) => {
          return (<div id={`${guess}-index-${idx}`} key={`${idx}`}> {guess} </div>)
        })}
      </div>
      <div className="current-guess-container">
        {currentGuess}
      </div>
    </div>
  );
}

export default App;
