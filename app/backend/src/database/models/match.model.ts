import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import teamModel from './teams.model';

class matchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamsGoals: number;
  declare awayTeamId: number;
  declare awayTeamsGoals: number;
  declare inProgress: boolean;
}

matchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

matchModel.belongsTo(teamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });
matchModel.belongsTo(teamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });

teamModel.hasMany(matchModel, { foreignKey: 'away_team_id', as: 'awayTeam' });
teamModel.hasMany(matchModel, { foreignKey: 'home_team_id', as: 'homeTeam' });

// matchModel.associate = (models) => {
//   models.matchModel.belongsToMany(models.teamModel, {
//     as: 'matches',
//     through: matchModel,
//     foreignKey: 'id', // se refere ao id de Book na tabela de `users_books`
//     otherKey: 'home_team_id', // se refere a outra chave de `users_books`
//   });
//   models.User.belongsToMany(models.Book, {
//     as: 'teams',
//     through: teamModel,
//     foreignKey: 'home_team_id', // se refere ao id de User na tabela de `users_books`
//     otherKey: 'id',
//   });
// };

export default matchModel;
