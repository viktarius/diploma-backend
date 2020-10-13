import * as express from "express";

import { PORT } from "./config";

const server: express.Application = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Hello World")
});

server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});
