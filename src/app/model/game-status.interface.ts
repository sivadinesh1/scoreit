
interface IGameStats {
    matchid: string;
    teams: ITeamStats[];

    format: number;
    sets: number;
    deuce: number;
    game_point: number;
    current_set: number;
    winner: string;
  }
