type RabbitHole = number | undefined;
type GuessHole = number | undefined;

export interface HoleProps {
  holeNum: number;
  rabbitHole: RabbitHole;
  guessHole: GuessHole;
  handleClick: (holeNum: number) => void;
}

export interface HolesProps {
  rabbitHole: RabbitHole;
  guessHole: GuessHole;
  handleClick: (holeNum: number) => void;
}
