import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

export const PORT = process.env.PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

export const PASSPORT_SECRET_KEY = process.env.PASSPORT_SECRET_KEY;
export const PASSPORT_EXPIRES_IN = process.env.PORPASSPORT_EXPIRES_INT;

export const EMAIL_SENDER_EMAIL = process.env.EMAIL_SENDER_EMAIL;
export const EMAIL_SENDER_PASSWORD = process.env.EMAIL_SENDER_PASSWORD;
