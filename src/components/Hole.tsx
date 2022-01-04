import { HoleProps } from '../types/types';
import bugsBunny from '../pics/bugs_bunny_fiftypx.png';
import fudd from '../pics/fudd_fiftypx.png';

type imgNameType = 'bugs-bunny' | 'elmer-j-fudd';

const Hole = ({ holeNum, rabbitHole, hunterHole, handleClick }: HoleProps) => {
  const hasRabbit = holeNum === rabbitHole;
  const hasHunter = holeNum === hunterHole;
  const rabbitCaught = hasRabbit && hasHunter;

  function renderImage(imgName: imgNameType) {
    return (
      <div className="ImageDiv">
        {imgName === 'bugs-bunny' ? (
          <img alt="bugs bunny" src={bugsBunny} />
        ) : (
          <img alt="elmer j fudd" src={fudd} />
        )}
      </div>
    );
  }

  return (
    <div className="Hole" onClick={() => handleClick(holeNum)}>
      {hasRabbit && renderImage('bugs-bunny')}
      {hasHunter && renderImage('elmer-j-fudd')}
      {rabbitCaught && 'K'}
    </div>
  );
};

export default Hole;
