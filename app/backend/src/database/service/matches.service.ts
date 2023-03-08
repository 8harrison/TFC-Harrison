import matchModel from '../models/match.model';

const getAll = async () => {
  const allMatches = await matchModel.findAll();

  return { type: null, message: allMatches };
};

const getmatches = async (boolean: string) => {
  const booled = boolean === 'true';
  const matches = await matchModel.findAll({ where: { inProgress: booled } });
  // console.log(matches);
  return { type: null, message: matches };
};

export default getAll;
export { getmatches };
