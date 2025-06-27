"use strict";

import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

export class OrderItem extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.belongsTo(models.Order, { foreignKey: "orderId" });
    this.belongsTo(models.Book, { foreignKey: "bookId" });
  }
}
OrderItem.init(
  {
    orderId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "OrderItem",
  }
);
