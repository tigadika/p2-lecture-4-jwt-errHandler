'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId' })
      Movie.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    genreId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};