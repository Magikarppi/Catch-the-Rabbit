import React from 'react';
import { HolesProps } from '../types';
import { allHoles } from '../utils/utils';
import Hole from './Hole';

const Holes = ({ rabbitHole, handleClick, guessHole }: HolesProps) => {
  return (
    <div className="Holes">
      {allHoles.map((_, i) => (
        <Hole
          key={i}
          holeNum={i}
          rabbitHole={rabbitHole}
          handleClick={handleClick}
          guessHole={guessHole}
        />
      ))}
    </div>
  );
};

export default Holes;
