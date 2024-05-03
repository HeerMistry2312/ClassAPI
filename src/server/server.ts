import { App } from "../index";
// import dotenv from "dotenv";
// dotenv.config();

const port = 8000;

const server = new App();
server.start(port);
