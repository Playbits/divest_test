"use strict";

import { DataTypes, Model } from "sequelize";
import { Cart } from "./cart";
import { Book } from "./book";
import { sequelize } from ".";

export class CartItem extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
    // define association here
    this.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });
    this.belongsTo(Book, { foreignKey: "bookId", as: "book" });
  }
}
CartItem.init(
  {
    cartId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "CartItem",
  }
);
