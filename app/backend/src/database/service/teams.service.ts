import teamsModel from '../models/teams.model';

const findAll = async () => {
  const teams = await teamsModel.findAll();
  return { type: null, message: teams };
};

export default findAll;
