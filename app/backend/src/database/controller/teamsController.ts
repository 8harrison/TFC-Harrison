import { Request, Response } from 'express';
import teamService, { findOne } from '../service/teams.service';

const findAll = async (_req: Request, res: Response) => {
  const { type, message } = await teamService();
  if (type) return res.status(500).json(message);

  return res.status(200).json(message);
};

const one = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, message } = await findOne(id);

  if (type) return res.status(500).json(message);

  return res.status(200).json(message);
};

export default findAll;
export { one };
