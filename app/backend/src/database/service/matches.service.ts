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

const patchMatch = async (id: string) => {
  await matchModel.update({ inProgress: false }, { where: { id } });
  return { type: null, message: 'Finished' };
};

export default getAll;
export { getmatches, patchMatch };
