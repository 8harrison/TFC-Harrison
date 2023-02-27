import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class teamModel extends Model {
  declare id: number;
  declare teamName: string;
}

teamModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(255),
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
// const teamsModel = (sequelize, DataTypes) => {
//   const team = sequelize.define('Team', {
//     teamName: DataTypes.STRING,
//   }, {
//     underscored: true,
//     tableName: 'team',
//     timestamp: false,
//   });
//   return team;
// };

export default teamModel;
