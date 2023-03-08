import { Request, Response } from 'express';
import findAll from '../service/matches.service';
import { findOne } from '../service/teams.service';

const getAll = async (_req: Request, res: Response) => {
  const { type, message } = await findAll();

  if (type) return res.status(500).json(message);
  const results = message.map(async (partida) => {
    const findHomeTeam = await findOne(partida.homeTeamId);
    const findAwayTeam = await findOne(partida.awayTeamId);

    const retorno = {
      ...partida.dataValues,
      homeTeam: { teamName: findHomeTeam.message?.teamName },
      awayTeam: { teamName: findAwayTeam.message?.teamName },
    };
    return retorno;
  });
  const resulted = await Promise.all(results);
  console.log(resulted);
  return res.status(200).json(resulted);
};

export default getAll;
