import React, { useEffect, useState, useCallback } from 'react';
import Holes from './components/Holes';
import EndGame from './components/EndGame';
import { allHolesLength } from './utils/utils';
import Errors from './components/Errors';

const moveDelay = 300;

function App() {
  const [error, setError] = useState<string | null>(null);
  const [rabbitHole, setRabbitHole] = useState<number>();
  const [hunterHole, setHunterHole] = useState<number>();
  const [escape, setEscape] = useState<boolean>(false);
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
    // if (!hunterHole || !rabbitHole) return;
    if (rabbitMoveCounter <= hunterMoveCounter) return;
    if (hunterHole === allHolesLength) {
      return setHunterHole(allHolesLength - 1);
    }

    // if (hunterHole === 0) {
    //   return setHunterHole(1);
    // }
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

    if (rabbitHole! <= hunterHole!) {
      setHunterHole((prevState) => prevState! - moveInterval);
    } else if (rabbitHole! >= hunterHole!) {
      setHunterHole((prevState) => prevState! + moveInterval);
    } else return;

    setHunterMoveCounter((prev) => prev + 1);
  }, [rabbitMoveCounter, hunterMoveCounter, hunterHole, rabbitHole]);

  const rabbitMoves = useCallback(() => {
    if (rabbitHole === allHolesLength) {
      return setRabbitHole(allHolesLength - 2);
    }

    if (rabbitHole === 0) {
      return setRabbitHole(1);
    }

    const hole = randomPosition();
    if (hole === 0) {
      setRabbitHole(hole + 1);
    } else {
      setRabbitHole(hole);
    }
    const randomNum = Math.random();

    // // rabbit moves randomly one hole either backwards or forwards
    // if (randomNum > 0.5) {
    //   setRabbitHole((prevState) => prevState! + 1);
    // } else {
    //   setRabbitHole((prevState) => prevState! - 1);
    // }

    setRabbitMoveCounter((prev) => prev + 1);
    return;
  }, [rabbitHole]);

  // For initializing game with rabbit position
  useEffect(() => {
    if (!caught) {
      const hole = randomPosition();
      if (hole === 0) {
        setRabbitHole(hole + 1);
      } else {
        setRabbitHole(hole);
      }
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
      }, moveDelay);
      return () => {
        clearTimeout(moveRabbitTimeout);
      };
    }

    // hunter moves
    if (rabbitMoveCounter > hunterMoveCounter && firstRoundDone) {
      const moveHunterTimeout = setTimeout(() => {
        hunterMoves();
      }, moveDelay);
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
    if (hunterHole) {
      if (hunterHole < 0 || hunterHole > allHolesLength) {
        return setEscape(true);
      }
    }
  }, [rabbitHole, hunterHole, firstRoundDone, caught]);

  // player selects where hunter starts his hunt
  const selectHuntStartHole = (holeNum: number) => {
    if (holeNum === rabbitHole) {
      setError('Choose another hole...');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    // setHunterHole(holeNum);
    setHunterHole(0);
    setHunterMoveCounter((prev) => prev + 1);
  };

  return (
    <div className="App">
      <Errors errMsg={error} />

      <Holes
        rabbitHole={rabbitHole}
        hunterHole={hunterHole}
        handleClick={selectHuntStartHole}
      />
      <div className="Grass" />
      {caught && <EndGame handleRestart={handleRestart} ending="caught" />}
      {escape && <EndGame handleRestart={handleRestart} ending="caught" />}
    </div>
  );
}

export default App;
