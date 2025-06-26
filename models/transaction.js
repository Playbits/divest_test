"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Order, { foreignKey: "orderId", as: "order" });
  };
  return Transaction;
};
