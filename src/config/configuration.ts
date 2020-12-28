process.env["NODE_CONFIG_DIR"] = __dirname + "/";
import config from 'config';

export const PORT = config.get<number>('port');
export const DB_USERNAME = config.get<string>('db.username');
export const DB_PASSWORD = config.get<string>('db.password');
export const DB_NAME = config.get<string>('db.name');

export const PASSPORT_SECRET_KEY = config.get<string>('passport.secret');
export const PASSPORT_EXPIRES_IN = config.get<string>('passport.expiresIn');

export const EMAIL_SENDER_EMAIL = config.get<string>('email_sender.email');
export const EMAIL_SENDER_PASSWORD = config.get<string>('email_sender.password');
