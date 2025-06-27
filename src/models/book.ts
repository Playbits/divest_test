import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from ".";

export class Book extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: unknown) {
    // define association here
  }
}
Book.init(
  {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Book",
  }
);
