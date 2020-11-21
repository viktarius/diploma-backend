process.env["NODE_CONFIG_DIR"] = __dirname + "/";
import config from 'config';

export const PORT = config.get<number>('port');
export const DB_USERNAME = config.get<string>('db.username');
export const DB_PASSWORD = config.get<string>('db.password');
export const DB_NAME = config.get<string>('db.name');
