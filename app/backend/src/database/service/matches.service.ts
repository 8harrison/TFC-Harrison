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

const matchFinished = async (id: string) => {
  await matchModel.update({ inProgress: false }, { where: { id } });
  return { type: null, message: 'Finished' };
};

const matchScore = async (id: string, homeTeamGoals: string, awayTeamGoals: string) => {
  const score = await matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { type: null, message: score };
};

const matchCreated = async (obj:any) => {
  const match = await matchModel.create({
    homeTeamId: obj.homeTeamId,
    awayTeamId: obj.awayTeamId,
    homeTeamGoals: obj.homeTeamGoals,
    awayTeamGoals: obj.awayTeamGoals,
    inProgress: true,
  });
  return { type: null, message: match };
};

export default getAll;
export { getmatches, matchFinished, matchScore, matchCreated };
