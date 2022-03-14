import { Position } from '@v1/players/enums/position.enum';

interface playerConfig {
  initialValue: number;
}

interface teamConfig {
  initialBudget: number;
  initCount: Map<Position, number>;
}

interface eConfig {
  team: teamConfig;
  player: playerConfig;
}

export default (): Partial<eConfig> => ({
  team: {
    initialBudget: 5000000,
    initCount: new Map<Position, number>([
      [Position.Goalkeeper, 3],
      [Position.Defender, 6],
      [Position.Midfielder, 6],
      [Position.Attacker, 5],
    ]),
  },
  player: {
    initialValue: 1000000,
  },
});
