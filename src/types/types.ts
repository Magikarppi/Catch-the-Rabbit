type RabbitHole = number | undefined;
type HunterHole = number | undefined;

export interface HoleProps {
  holeNum: number;
  rabbitHole: RabbitHole;
  hunterHole: HunterHole;
  handleClick: (holeNum: number) => void;
}

export interface HolesProps {
  rabbitHole: RabbitHole;
  hunterHole: HunterHole;
  handleClick: (holeNum: number) => void;
}

export interface EndGameProps {
  handleRestart: () => void;
  ending: 'caught' | 'escape';
}
