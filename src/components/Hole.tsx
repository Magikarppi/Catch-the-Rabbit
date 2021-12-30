import { HoleProps } from '../types';

const Hole = ({ holeNum, rabbitHole, hunterHole, handleClick }: HoleProps) => {
  const hasRabbit = holeNum === rabbitHole;
  const hasHunter = holeNum === hunterHole;
  const rabbitCaught = hasRabbit && hasHunter;

  return (
    <div className="Hole" onClick={() => handleClick(holeNum)}>
      {hasRabbit && 'R'}
      {hasHunter && 'H'}
      {rabbitCaught && 'K'}
    </div>
  );
};

export default Hole;
