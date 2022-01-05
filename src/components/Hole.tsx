import { HoleProps } from '../types/types';
import bugsBunny from '../pics/bugs_bunny_fiftypx.png';
import fudd from '../pics/fudd_fiftypx.png';
import carrot from '../pics/carrot_fiftypx.png';

type imgNameType = 'bugs-bunny' | 'elmer-j-fudd' | 'carrot';

const Hole = ({ holeNum, rabbitHole, hunterHole, handleClick }: HoleProps) => {
  const hasRabbit = holeNum === rabbitHole;
  const hasHunter = holeNum === hunterHole;
  const rabbitCaught = hasRabbit && hasHunter;

  function renderImage(imgName: imgNameType) {
    let image: HTMLImageElement | undefined;
    switch (imgName) {
      case 'bugs-bunny':
        image = <img alt="bugs bunny" src={bugsBunny} />;
        break;
      case 'elmer-j-fudd':
        image = <img alt="elmer j fudd" src={fudd} />;
        break;
      case 'carrot':
        image = <img alt="carrot" src={carrot} />;
        break;

      default:
        break;
    }
    return <div className="ImageDiv">{image}</div>;
  }

  if (rabbitCaught) {
    return <div className="Hole">{rabbitCaught && renderImage('carrot')}</div>;
  } else {
    return (
      <div className="Hole" onClick={() => handleClick(holeNum)}>
        {hasRabbit && renderImage('bugs-bunny')}
        {hasHunter && renderImage('elmer-j-fudd')}
      </div>
    );
  }
};

export default Hole;
