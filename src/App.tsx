import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import Holes from './components/Holes';
import KillScreen from './components/KillScreen';
import { allHolesLength } from './utils/utils';

function App() {
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [hunterHole, setHunterHole] = useState<number>();
  const [kill, setKill] = useState<boolean>(false);
  const [rabbitMoveCounter, setRabbitMoveCounter] = useState<number>(0);
  const [hunterMoveCounter, setHunterMoveCounter] = useState<number>(0);

  // let rabbitMoveCounter = useRef<number>(0);
  // let hunterMoveCounter = useRef<number>(0);

  console.log('rabbitHole', rabbitHole);
  console.log('hunterHole', hunterHole);
  console.log('rabbitMoveCounter', rabbitMoveCounter);
  console.log('hunterMoveCounter', hunterMoveCounter);

  const randomPosition = () => Math.floor(Math.random() * allHolesLength);

  const firstRoundDone = hunterMoveCounter > 0 && rabbitMoveCounter > 0;

  const hunterMoves = useCallback(() => {
    if (rabbitMoveCounter > hunterMoveCounter) {
      console.log('hunter moves ()');

      const randomNum = Math.random();

      if (randomNum > 0.5) {
        setHunterHole((prevState) => prevState! + 1);
      } else {
        setHunterHole((prevState) => prevState! - 1);
      }

      setHunterMoveCounter((prev) => prev + 1);
    }
  }, [rabbitMoveCounter, hunterMoveCounter]);

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
  }, [rabbitHole, hunterMoveCounter, rabbitMoveCounter]);

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
    console.log('movement useeffect runs');
    console.log('rabbitMoveCounter :: useEffect', rabbitMoveCounter);
    console.log('hunterMoveCounter :: useEffect', hunterMoveCounter);

    if (rabbitMoveCounter - hunterMoveCounter > 1) {
      return console.log("Rabbit/Hunter movements don't happen in turns");
    }

    if (rabbitMoveCounter < hunterMoveCounter) {
      return console.log('Hunter is skipping ahead');
    }

    console.log('h===R', hunterMoveCounter === rabbitMoveCounter);
    console.log('frd', firstRoundDone);
    console.log(
      'rabbit should move: ',
      hunterMoveCounter === rabbitMoveCounter && firstRoundDone
    );
    if (hunterMoveCounter === rabbitMoveCounter && firstRoundDone) {
      console.log('rabbit moves useffect');
      setTimeout(() => {
        rabbitMoves();
      }, 500);
    }

    if (rabbitMoveCounter > hunterMoveCounter && firstRoundDone) {
      console.log('hunter moves useffect');
      setTimeout(() => {
        hunterMoves();
      }, 500);
    }
  }, [
    hunterMoveCounter,
    rabbitMoveCounter,
    rabbitMoves,
    hunterMoves,
    hunterHole,
    rabbitHole,
    firstRoundDone,
  ]);

  useEffect(() => {
    if (rabbitHole === hunterHole && firstRoundDone) {
      return setKill(true);
    }
  }, [rabbitHole, hunterHole, firstRoundDone, kill]);

  // const makeAGuess = (guess: number) => {};

  // const startHunt = (selectedHole: number) => {
  //   // while (rabbitHole !== hunterHole) {}
  //   setHunterHole(selectedHole);
  // };

  const selectHuntStartHole = (holeNum: number) => {
    setHunterHole(holeNum);
    setHunterMoveCounter((prev) => prev + 1);
  };

  return (
    <div className="App">
      <Holes
        rabbitHole={rabbitHole}
        hunterHole={hunterHole}
        handleClick={selectHuntStartHole}
      />
      {kill && <KillScreen />}
    </div>
  );
}

export default App;
