import './App.css';
import { useState, useEffect } from 'react';

// game state
// handler for keypress
const handleKeyUp = (event) => {
  console.log('key pressed = ', event.key)
}


function App() {
  const [guessHistory, setGuessHistory] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')

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
      
      </main>
    </div>
  );
}

export default App;
