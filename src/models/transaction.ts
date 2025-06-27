"use strict";

import { sequelize } from ".";

const { DataTypes, Model } = require("sequelize");

export class Transaction extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    // Transaction.belongsTo(models.Order, {
    //   foreignKey: "orderId",
    //   as: "order",
    // });
  }
}
Transaction.init(
  {
    orderId: DataTypes.INTEGER,
    reference: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);
