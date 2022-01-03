import { CaughtProps } from '../types';

const Caught = ({ handleRestart }: CaughtProps) => {
  return (
    <div className="Caught">
      <p>
        Hunter catches the rabbit, scratches it below the chin and gives it a
        big and juicy carrot!
      </p>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default Caught;
