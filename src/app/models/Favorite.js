import Sequelize, { Model } from 'sequelize';

export default class Favorite extends Model {
  static init(sequelize) {
    super.init(
      {
        favorited_at: Sequelize.DATE,
        returned_at: Sequelize.DATE,
        desfavorited_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Product, { foreignKey: 'book_id' });
  }
}
