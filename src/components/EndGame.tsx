import { EndGameProps } from '../types/types';

const EndGame = ({ handleRestart, ending }: EndGameProps) => {
  return (
    <div className="EndGame">
      {ending === 'caught' ? (
        <p>
          Hunter catches the rabbit, scratches it below the chin and gives it a
          big and juicy carrot!
        </p>
      ) : (
        <p>Hunter falls to a river and rabbit escapes!</p>
      )}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default EndGame;
