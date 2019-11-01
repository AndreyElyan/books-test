import Sequelize, { Model } from 'sequelize';

export default class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        ISBN: Sequelize.NUMBER,
        category: Sequelize.STRING,
        year: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Disk, { foreignKey: 'book_id' });
  }
}
