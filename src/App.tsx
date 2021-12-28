import React, { useEffect, useState } from 'react';
import './App.css';
import Holes from './components/Holes';
import { allHolesLength } from './utils/utils';

function App() {
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [guessHole, setGuessHole] = useState<number>();
  const [kill, setKill] = useState<boolean>(false);

  console.log('rabbitHole', rabbitHole);
  console.log('guessHole', guessHole);

  const randomPosition = () => Math.floor(Math.random() * allHolesLength);

  let x = 0;

  // while (x < 10) {
  //   console.log('x', x);
  //   setTimeout(() => {
  //     setRabbitHole(randomPosition());
  //     x++;
  //   }, 500);
  // }

  // have a counter for moving the rabbit and the hunter? So in moves happen turns. Game starts after hunter has made the first
  // guess (that is a wrong guess, right one would end the game right away) -> rabbit moves "first" then hunter.
  // So hunters movement counter can never be higher than rabbit's. And never more than one apart.
  // if ((rabbitMoveCounter - hunterMoveCounter) > 1) {
  //   return;
  // }
  // if (rabbitMoveCounter < hunterMoveCounter) {
  //   return;
  // }

  // if (rabbitMoveCounter === hunterMoveCounter) {
  //   // move rabbit
  // }

  // if (rabbitMoveCounter > hunterMoveCounter) {
  //   // move hunter
  // }

  useEffect(() => {
    // random between 0-100

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

  const selectHuntStartHole = (holeNum: number) => {
    setGuessHole(holeNum);
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
      <Holes
        rabbitHole={rabbitHole}
        guessHole={guessHole}
        handleClick={selectHuntStartHole}
      />
      {kill && <KillScreen />}
    </div>
  );
}

export default App;
