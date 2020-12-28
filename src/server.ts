import express from 'express';
import mongoose from 'mongoose';
import passport from "passport";
import cors from 'cors';

import { DB_NAME, DB_PASSWORD, DB_USERNAME, PORT, applyPassportStrategy } from './config'
import routes from './routes';
import { errorHandlerMiddleware } from "./core/middlewares";

const server: express.Application = express();

server.use(express.json());
server.use(cors());

applyPassportStrategy(passport);

server.use(routes);

server.use(errorHandlerMiddleware);

server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
    const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@cluster0-shard-00-00.jzoxg.mongodb.net:27017,cluster0-shard-00-01.jzoxg.mongodb.net:27017,cluster0-shard-00-02.jzoxg.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-rklfzx-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
        .then(() => console.log('DB Connected!'))
        .catch(err => console.log(`DB Connection Error: ${err.message}`))
});
