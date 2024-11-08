import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./config/database";
connect();

import bodyParser from "body-parser";
import cors from "cors";

import { routesClient } from "./routes/client/index.route";

const app: Express = express();
const port: number = 3000;

// // Tất cả tên miền được phép truy cập vào
app.use(cors());

// Cho phép 1 tên miền cụ thể được phép truy cập
// const corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200
// }
// cors(corsOptions);

// parse application/json
app.use(bodyParser.json());

routesClient(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});