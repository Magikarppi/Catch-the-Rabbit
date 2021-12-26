import { useEffect, useState } from 'react';
import './App.css';

const allHoles = new Array(100);

function App() {
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [guessHole, setGuessHole] = useState<number>();

  useEffect(() => {
    // random between 0-100
    const randomPosition = () => Math.floor(Math.random() * 101);

    setRabbitHole(randomPosition());
  }, []);

  const makeAGuess = (guess: number) => {};

  const startHunt = () => {
    // while (rabbitHole !== guessHole) {}
  };
  const Hole = () => {
    return <div style={{ width: 5, height: 5 }}>Active/Not active</div>;
  };

  const Holes = () => {
    return (
      <div>
        {allHoles.map((hole) => (
          <Hole />
        ))}
      </div>
    );
  };

  return <div className="App"></div>;
}

export default App;
