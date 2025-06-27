declare const config: {
  development: {
    username: string;
    password: string;
    database: string;
    host?: string;
    dialect?: string;
    [key: string]: any;
  };
  test?: any;
  production?: any;
  [key: string]: any;
};

export default config;
