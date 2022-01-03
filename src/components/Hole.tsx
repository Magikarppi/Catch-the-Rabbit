import { HoleProps } from '../types/types';
import bugsBunny from '../pics/bugs_bunny_fiftypx.png';
import fudd from '../pics/fudd_fiftypx.png';

const Hole = ({ holeNum, rabbitHole, hunterHole, handleClick }: HoleProps) => {
  const hasRabbit = holeNum === rabbitHole;
  const hasHunter = holeNum === hunterHole;
  const rabbitCaught = hasRabbit && hasHunter;

  return (
    <div className="Hole" onClick={() => handleClick(holeNum)}>
      {hasRabbit && <img alt="bugs bunny" src={bugsBunny} />}
      {hasHunter && <img alt="elmer j fudd" src={fudd} />}
      {rabbitCaught && 'K'}
    </div>
  );
};

export default Hole;
