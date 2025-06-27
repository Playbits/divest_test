import { Dialect } from "sequelize";

declare const config: {
  development: {
    username: string;
    password: string;
    database: string;
    host?: string;
    dialect?: Dialect;
    [key: string]: any;
  };
  test?: any;
  production?: any;
  [key: string]: any;
};

export default config;
