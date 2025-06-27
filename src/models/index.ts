import { Sequelize } from "sequelize";
import SQconfig from "../../config/config";

const config = SQconfig.development;

const sequelize = new Sequelize(
  String(config.database),
  String(config.username),
  config.password,
  config
);

export { sequelize };

// export { Book, Cart, CartItem, Order, OrderItem, Customer };
