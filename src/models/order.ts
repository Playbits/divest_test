"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from ".";

export class Order extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    this.belongsTo(models.Customer, { foreignKey: "customerId" });
    this.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "order_item",
    });
    this.hasOne(models.Transaction, {
      foreignKey: "orderId",
      as: "transaction",
    });
  }
}
Order.init(
  {
    customerId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "Order",
  }
);
