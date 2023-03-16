import matchModel from '../models/match.model';
import teamModel from '../models/teams.model';
import objetoLeaderBoard from '../interface/objetoLeaderBoard';

const name = (matches: any, teams: any) => {
  const result = matches.map((match : any) => {
    const reduceteams = teams.reduce((acc: any | undefined, currentValue: any) => {
      if (currentValue.id === match.homeTeamId) {
        acc.name = currentValue.teamName; acc.id = currentValue.id;
      }
      return acc;
    }, {});
    return reduceteams;
  });
  const setTeam = new Set();
  const filterTeam = result.filter((team: any) => {
    const duplicateTeam = setTeam.has(team.name);
    setTeam.add(team.name);
    return !duplicateTeam;
  });
  return filterTeam;
};

const balanceEEfficiency = (test: any) => {
  const obj = test;
  obj.goalsBalance = (test.goalsFavor - test.goalsOwn);
  obj.efficiency = ((test.totalPoints / (test.totalGames * 3)) * 100).toFixed(2);
  return (test.goalsBalance, test.efficiency);
};

const seVitoria = (test: any, match: any) => {
  const obj = test;
  obj.totalVictories += 1; obj.totalPoints += 3; obj.goalsFavor += match.homeTeamGoals;
  obj.goalsOwn += match.awayTeamGoals;
};

const seEmpate = (test: any, match: any) => {
  const obj = test;
  obj.totalDraws += 1; obj.totalPoints += 1; obj.goalsFavor += match.homeTeamGoals;
  obj.goalsOwn += match.awayTeamGoals;
};
const registerData = (matches: any, team: any, obj: objetoLeaderBoard) => {
  const test = obj;
  matches.forEach((match: any) => {
    if (team.id === match.homeTeamId && !match.inProgress) {
      test.totalGames += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) {
        seVitoria(test, match);
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        seEmpate(test, match);
      } else {
        test.totalLosses += 1; test.goalsFavor += match.homeTeamGoals;
        test.goalsOwn += match.awayTeamGoals;
      }
      balanceEEfficiency(test);
    }
  });
  return test;
};

const sorts = (clubs: any) => {
  const sorted = clubs.sort((a: any, b: any) => a.goalsOwn - b.goalsOwn)
    .sort((a:any, b: any) => b.goalsFavor - a.goalsFavor)
    .sort((a:any, b: any) => b.goalsBalance - a.goalsBalance)
    .sort((a:any, b: any) => b.totalPoints - a.totalPoints);
  return sorted;
};

const pointTotal = (matches: any, clubNames: any) => {
  const clubs = clubNames.map((team: any) => {
    const obj = {
      name: team.name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    const objeto = registerData(matches, team, obj);
    return objeto;
  });
  return sorts(clubs);
};

const leaderBoardHomeTeam = async () => {
  const matches = await matchModel.findAll();
  const teams = await teamModel.findAll();
  const clubNames = name(matches, teams);
  const total = pointTotal(matches, clubNames);
  return total;
};

export default leaderBoardHomeTeam;
