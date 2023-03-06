import { Request, Response } from 'express';
import findAll from '../service/matches.service';

const getAll = async (_req: Request, res: Response) => {
  const { type, message } = await findAll();

  if (type) return res.status(500).json(message);
  const results = message.map((partida) => partida.dataValues);
  return res.status(200).json(results);
};

export default getAll;
