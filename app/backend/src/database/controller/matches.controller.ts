import { Request, Response } from 'express';
import findAll, { getmatches,
  matchCreated, matchFinished, matchScore } from '../service/matches.service';
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
};

const finishedMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, message } = await matchFinished(id);
  if (type) return res.status(500).json({ message });
  return res.status(200).json({ message });
};

const scoreMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { type, message } = await matchScore(id, homeTeamGoals, awayTeamGoals);
  if (type) return res.status(500).json({ message });
  return res.status(200).json({ message });
};

const createdMatch = async (req: Request, res: Response) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const teamHome = await findOne(homeTeamId);
  const awayTeam = await findOne(awayTeamId);
  console.log(teamHome);
  if (!teamHome.message?.dataValues || !awayTeam.message?.dataValues) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  const { type, message } = await matchCreated(req.body);
  if (type) return res.status(500).json({ message });
  return res.status(201).json(message);
};

export default getAll;
export { matchesInProgress, finishedMatch, scoreMatch, createdMatch };
