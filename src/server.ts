import express from 'express';
import routes from './routes';
import { PORT } from './config';

const server: express.Application = express();

server.use(express.json());

server.use(routes);

server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});
