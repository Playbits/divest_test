"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";
import { Cart } from "./cart";
import { Order } from "./order";
import { sequelize } from ".";

export class Customer extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    Customer.hasMany(Order, { foreignKey: "customerId", as: "order" });
    Customer.hasOne(Cart, { foreignKey: "customerId", as: "cart" });
  }
}
Customer.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Customer",
  }
);

// Customer.associate = function (models: any) {
//   Customer.hasMany(models.Order, { foreignKey: "customerId" });
//   Customer.hasOne(models.Cart, { foreignKey: "customerId", as: "cart" });
// };
