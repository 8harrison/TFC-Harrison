import { Request, Response } from 'express';
import findAll, { getmatches } from '../service/matches.service';
import { findOne } from '../service/teams.service';

const mapNoMessage = async (message: any) => {
  const results = message.map(async (partida: any) => {
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
  return resulted;
};
const getAll = async (_req: Request, res: Response) => {
  const { type, message } = await findAll();
  const resulted = await mapNoMessage(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(resulted);
};

const matchesInProgress = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress) {
    const { type, message } = await getmatches(inProgress as string);
    if (type) return res.status(500).json(message);
    const resulted = await mapNoMessage(message);
    return res.status(200).json(resulted);
  }
  const { type, message } = await findAll();
  const resulted = await mapNoMessage(message);
  if (type) return res.status(500).json(message);
  return res.status(200).json(resulted);
  // console.log(boolean);
  // console.log(boolean);
  // const resultFilter = resulted.filter((partida) => console.log(partida));
  // // const booleanToString = partida.inProgress.toString();
  // const resultedFiltred = await Promise.all(resultFilter);
  // console.log(resultedFiltred);
  // console.log(resulted);
};

export default getAll;
export { matchesInProgress };
