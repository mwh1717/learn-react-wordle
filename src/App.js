import './App.css';
import { useState, useEffect } from 'react';


let targetWord = 'score'

function App() {
  const [guessHistory, setGuessHistory] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')

  // handler for key presses
  const handleKeyUp = (event) => {

    if (event.key === 'Backspace') { // backspace
      onBackspace();
    }

    if (event.keyCode >= 65 && event.keyCode <= 90) { // a-z only
      onLetterGuess(event.key);
    }

    if (event.key === 'Enter') { // enter
      onGuessSubmit();
    }
  }

  // handles backspace
  const onBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  }

  // handles letter guess
  const onLetterGuess = (guess) => {
    if (currentGuess.length <= 4) {
      setCurrentGuess(`${currentGuess}${guess}`);
    }
  }

  // handles enter press
  const onGuessSubmit = () => {
    if (currentGuess.length < 5) { // not enough letters
      console.log('NEED MORE LETTERS!')
    } else if (currentGuess === targetWord) { // win condition
      alert('VICTORY!')
      setGuessHistory([]);
      setCurrentGuess('');
    } else if (currentGuess.length === 5 && currentGuess != targetWord) { // correct length but wrong word
      setGuessHistory(guessHistory.concat(currentGuess));
      setCurrentGuess('');
      if (guessHistory.length === 5) {
        alert('You lose :(');
        setGuessHistory([]);
      }
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
        Wordle Practice Unlimited!
      </header>
      <div className="guess-history-container">
        {guessHistory.map((guess, idx) => {
          return (<div key={`guess-history-${idx}`}> {guess} </div>)
        })}
      </div>
      <div className="current-guess-container">
        {currentGuess}
      </div>
    </div>
  );
}

export default App;
