import { Request, Response } from 'express';
import leaderBoardAwayTeam from '../service/leaderBoardAway.service';

const awayTeamLeaderBoard = async (_req: Request, res: Response) => {
  const leaderBoard = await leaderBoardAwayTeam();
  return res.status(200).json(leaderBoard);
};

export default awayTeamLeaderBoard;
