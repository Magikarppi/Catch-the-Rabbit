import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import Holes from './components/Holes';
import KillScreen from './components/KillScreen';
import { allHolesLength } from './utils/utils';

function App() {
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [guessHole, setGuessHole] = useState<number>();
  const [kill, setKill] = useState<boolean>(false);
  const [rabbitMoveCounter, setRabbitMoveCounter] = useState<number>(0);
  const [hunterMoveCounter, setHunterMoveCounter] = useState<number>(0);

  // let rabbitMoveCounter = useRef<number>(0);
  // let hunterMoveCounter = useRef<number>(0);

  console.log('rabbitHole', rabbitHole);
  console.log('guessHole', guessHole);
  console.log('rabbitMoveCounter', rabbitMoveCounter);
  console.log('hunterMoveCounter', hunterMoveCounter);

  const randomPosition = () => Math.floor(Math.random() * allHolesLength);

  const hunterMoves = useCallback(() => {
    if (rabbitMoveCounter > hunterMoveCounter) {
      console.log('hunter moves ()');
    }

    setGuessHole(3);

    setHunterMoveCounter((prev) => prev + 1);
  }, []);

  const rabbitMoves = useCallback(() => {
    if (hunterMoveCounter === rabbitMoveCounter) {
      if (rabbitHole === allHolesLength) {
        return setRabbitHole(allHolesLength - 1);
      }

      if (rabbitHole === 0) {
        return setRabbitHole(1);
      }

      const randomNum = Math.random();

      if (randomNum > 0.5) {
        setRabbitHole((prevState) => prevState! + 1);
      } else {
        setRabbitHole((prevState) => prevState! - 1);
      }

      setRabbitMoveCounter((prev) => prev + 1);
      // rabbitMoveCounter++
    }
  }, [rabbitHole]);

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

  // For initializing game with rabbit position
  useEffect(() => {
    setRabbitHole(randomPosition());
    // Rabbit moves first
    setRabbitMoveCounter((prev) => prev + 1);
  }, []);

  // For movements
  useEffect(() => {
    if (rabbitMoveCounter - hunterMoveCounter > 1) {
      return console.log("Rabbit/Hunter movements don't happen in turns");
    }

    if (rabbitMoveCounter < hunterMoveCounter) {
      return console.log('Hunter is skipping ahead');
    }

    if (hunterMoveCounter === rabbitMoveCounter) {
      console.log('rabbit moves useffect');
      rabbitMoves();
    }

    if (rabbitMoveCounter > hunterMoveCounter) {
      console.log('hunter moves useffect');
      hunterMoves();
    }
  }, [hunterMoveCounter, rabbitMoveCounter, rabbitMoves, hunterMoves]);

  useEffect(() => {
    if (!rabbitHole || kill) {
      return;
    }

    if (rabbitHole === guessHole) {
      return setKill(true);
    }

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
