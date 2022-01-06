import React, { useEffect, useState, useCallback } from 'react';
import Holes from './components/Holes';
import Caught from './components/Caught';
import { allHolesLength } from './utils/utils';

function App() {
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [hunterHole, setHunterHole] = useState<number>();
  const [caught, setCaught] = useState<boolean>(false);
  const [rabbitMoveCounter, setRabbitMoveCounter] = useState<number>(0);
  const [hunterMoveCounter, setHunterMoveCounter] = useState<number>(0);

  console.log('rabbitHole', rabbitHole);
  console.log('hunterHole', hunterHole);
  console.log('rabbitMoveCounter', rabbitMoveCounter);
  console.log('hunterMoveCounter', hunterMoveCounter);

  const randomPosition = () => Math.floor(Math.random() * allHolesLength);

  const firstRoundDone = hunterMoveCounter > 0 && rabbitMoveCounter > 0;

  const handleRestart = () => {
    setCaught(false);
    setRabbitHole(undefined);
    setHunterHole(undefined);
    setRabbitMoveCounter(0);
    setHunterMoveCounter(0);
  };

  const hunterMoves = useCallback(() => {
    if (!hunterHole || !rabbitHole) return;

    if (rabbitMoveCounter > hunterMoveCounter) {
      if (hunterHole === allHolesLength) {
        return setHunterHole(allHolesLength - 1);
      }

      if (hunterHole === 0) {
        return setHunterHole(1);
      }

      let moveInterval = 1;
      const randomNum = Math.random();
      const randomInterval = () => Math.floor(Math.random() * 3) + 1;

      // Every 2, 4, 6, ... move
      if (hunterMoveCounter % 2 === 0) {
        moveInterval = 2;
      }

      // Every 3, 6, 9, ... move
      if (hunterMoveCounter % 3 === 0) {
        moveInterval = 3;
      }

      if (rabbitHole <= hunterHole) {
        setHunterHole((prevState) => prevState! - moveInterval);
      } else if (rabbitHole >= hunterHole) {
        setHunterHole((prevState) => prevState! + moveInterval);
      } else return;

      setHunterMoveCounter((prev) => prev + 1);
    }
  }, [rabbitMoveCounter, hunterMoveCounter, hunterHole, rabbitHole]);

  const rabbitMoves = useCallback(() => {
    if (rabbitHole === allHolesLength) {
      return setRabbitHole(allHolesLength - 1);
    }

    if (rabbitHole === 0) {
      return setRabbitHole(1);
    }

    const randomNum = Math.random();

    // rabbit moves randomly one hole either backwards or forwards
    if (randomNum > 0.5) {
      setRabbitHole((prevState) => prevState! + 1);
    } else {
      setRabbitHole((prevState) => prevState! - 1);
    }

    setRabbitMoveCounter((prev) => prev + 1);
  }, [rabbitHole]);

  // For initializing game with rabbit position
  useEffect(() => {
    if (!caught) {
      setRabbitHole(randomPosition());
      // Rabbit moves first
      setRabbitMoveCounter((prev) => prev + 1);
    }
  }, [caught]);

  // For movements
  useEffect(() => {
    if (caught) return;

    if (rabbitMoveCounter - hunterMoveCounter > 1) {
      return console.log("Rabbit/Hunter movements don't happen in turns");
    }

    if (rabbitMoveCounter < hunterMoveCounter) {
      return console.log('Hunter is skipping ahead');
    }

    // rabbit moves
    if (hunterMoveCounter === rabbitMoveCounter && firstRoundDone) {
      const moveRabbitTimeout = setTimeout(() => {
        rabbitMoves();
      }, 500);
      return () => {
        clearTimeout(moveRabbitTimeout);
      };
    }

    // hunter moves
    if (rabbitMoveCounter > hunterMoveCounter && firstRoundDone) {
      const moveHunterTimeout = setTimeout(() => {
        hunterMoves();
      }, 500);
      return () => {
        clearTimeout(moveHunterTimeout);
      };
    }
  }, [
    hunterMoveCounter,
    rabbitMoveCounter,
    rabbitMoves,
    hunterMoves,
    hunterHole,
    rabbitHole,
    firstRoundDone,
    caught,
  ]);

  // check if hunter has catched the rabbit
  useEffect(() => {
    if (rabbitHole === hunterHole && firstRoundDone) {
      return setCaught(true);
    }
  }, [rabbitHole, hunterHole, firstRoundDone, caught]);

  // player selects where hunter starts his hunt
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
      {caught && <Caught handleRestart={handleRestart} />}
    </div>
  );
}

export default App;
