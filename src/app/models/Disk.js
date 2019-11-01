import Sequelize, { Model } from 'sequelize';

export default class Disk extends Model {
  static init(sequelize) {
    super.init(
      {
        rent: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Movie, { foreignKey: 'movie_id' });
  }
}
