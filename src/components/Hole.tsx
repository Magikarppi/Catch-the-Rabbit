import { HoleProps } from '../types';

const Hole = ({ holeNum, rabbitHole }: HoleProps) => {
  const hasRabbit = holeNum === rabbitHole;
  console.log('hasrabbit, index', holeNum, hasRabbit);
  return <div className="Hole">{hasRabbit && 'X'}</div>;
};

export default Hole;
