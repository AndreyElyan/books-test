import Sequelize, { Model } from 'sequelize';

export default class Rent extends Model {
  static init(sequelize) {
    super.init(
      {
        rented_at: Sequelize.DATE,
        returned_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Disk, { foreignKey: 'book_id' });
  }
}
