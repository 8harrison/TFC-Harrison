import matchModel from '../models/match.model';

const getAll = async () => {
  const allMatches = await matchModel.findAll();

  return { type: null, message: allMatches };
};

export default getAll;
