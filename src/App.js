import './App.css';
import { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';

const words = require('an-array-of-english-words');
const fiveLetterWordDictionary = [];

words.forEach((word) => {
  if (word.length === 5) {
    fiveLetterWordDictionary.push(word.toUpperCase());
  }
});

const target = fiveLetterWordDictionary[Math.floor(Math.random() * fiveLetterWordDictionary.length)];
const targetWord = target.toUpperCase();

console.log(targetWord);

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
      setCurrentGuess(`${currentGuess}${guess}`.toUpperCase());
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
    } else if (!fiveLetterWordDictionary.includes(currentGuess)) { // word does not exist
      alert('Not a word')
    }else if (currentGuess.length === 5 && currentGuess != targetWord) { // correct length but wrong word
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
    <div className="App md" onKeyUp={handleKeyUp}>
      <header className="text-3xl font-bold underline text-center">
        Wordle Unlimited!
      </header>
      <div className="text-center">
        Are you tired of waiting for tomorrow to do the next Wordle? Fear not, you can Wordle away all day, right here.
      </div>
      <div className="guess-history-container">
        {guessHistory.map((guess, idx) => {
          return (<div className="previous-guess" key={`guess-history-${idx}`}> {guess} </div>)
        })}
      </div>
      <div className="current-guess-container">
        {currentGuess}
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
