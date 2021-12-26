import { useEffect, useState } from 'react';
import './App.css';

const allHoles = [...Array(51).keys()];

function App() {
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [guessHole, setGuessHole] = useState<number>();
  const [kill, setKill] = useState<boolean>(false);

  console.log('rabbitHole', rabbitHole);
  console.log('guessHole', guessHole);

  useEffect(() => {
    // random between 0-100
    const randomPosition = () => Math.floor(Math.random() * 101);

    setRabbitHole(randomPosition());
  }, []);

  const hunterMoves = () => {
    // 02211
    // 13322
    // 24433
    // a         (0)
    // a + 2     (2)
    // (u)a      (2)
    // (u) - 1   (1)
    // (u)a      (1)
    // (u)a + 1  (2)
    // (eka)
    // a
    // a + 2
    // a
    // a - 1
    // a
    // (seuraavat)
    // a + 1
    // ...
    setGuessHole(3);
  };

  useEffect(() => {
    if (!rabbitHole || kill) {
      return;
    }

    if (rabbitHole === guessHole) {
      return setKill(true);
    }

    const rabbitMoves = () => {
      if (rabbitHole === 100) {
        return setRabbitHole(99);
      }

      if (rabbitHole === 0) {
        return setRabbitHole(1);
      }

      const randomNum = Math.random();

      if (randomNum > 0.5) {
        return setRabbitHole((prevState) => prevState! + 1);
      } else {
        return setRabbitHole((prevState) => prevState! - 1);
      }
    };

    // rabbitMoves();
  }, [rabbitHole, guessHole, kill]);

  // const makeAGuess = (guess: number) => {};

  // const startHunt = (selectedHole: number) => {
  //   // while (rabbitHole !== guessHole) {}
  //   setGuessHole(selectedHole);
  // };
  const Hole = ({ holeNum }: { holeNum: number }) => {
    return <div className="Hole"></div>;
  };

  const Holes = () => {
    return (
      <div className="Holes">
        {allHoles.map((_, i) => (
          <Hole key={i} holeNum={i} />
        ))}
      </div>
    );
  };

  const KillScreen = () => {
    return (
      <div>
        <p>Rabbit caught and slaughtered</p>
      </div>
    );
  };

  return (
    <div className="App">
      <Holes />
      {kill && <KillScreen />}
    </div>
  );
}

export default App;
