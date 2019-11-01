import Sequelize, { Model } from 'sequelize';

export default class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        isbn: Sequelize.STRING,
        category: Sequelize.STRING,
        year: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'book_id' });
  }
}
