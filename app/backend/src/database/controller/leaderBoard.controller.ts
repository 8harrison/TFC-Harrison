import { Request, Response } from 'express';
import leaderBoardHomeTeam from '../service/leaderBoard.service';

const homeTeamLeaderBoard = async (_req: Request, res: Response) => {
  const leaderBoard = await leaderBoardHomeTeam();
  return res.status(200).json(leaderBoard);
};

export default homeTeamLeaderBoard;
