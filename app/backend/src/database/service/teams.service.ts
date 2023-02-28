import teamsModel from '../models/teams.model';

const findAll = async () => {
  const teams = await teamsModel.findAll();
  return { type: null, message: teams };
};

const findOne = async (id: any) => {
  const team = await teamsModel.findByPk(id);
  return { type: null, message: team };
};

export default findAll;
export { findOne };
