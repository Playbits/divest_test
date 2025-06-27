"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from ".";
import { CartItem } from "./cartitem";
import { Customer } from "./customer";
// import type * as M from "sequelize/types/model";

export class Cart extends Model {
  static associate(models: any) {
    // define association here
    this.belongsTo(Customer, {
      foreignKey: "customerId",
      as: "customer",
    });
    this.hasMany(CartItem, { foreignKey: "cartId", as: "cart_items" });
  }
}
Cart.init(
  {
    customerId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Cart",
  }
);

// Cart.associate = function (models: any) {
//     Cart.belongsTo(models.Customer, { foreignKey: "customerId" });
//     Cart.hasMany(models.CartItem, { foreignKey: "cartId", as: "items" });
// };
