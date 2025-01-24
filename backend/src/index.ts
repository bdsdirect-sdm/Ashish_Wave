import express from 'express';

import { Local } from './environment/env';
import sequelize from './config/db';
import userRouter from './routers/userRoute';
import { createServer } from 'http';

import path from 'path';
import cors from 'cors';
// import Friend from './models/Friend';
import User from './models/User';
import Wave from './models/Waves';
import User1 from './models/User1';
import Friend from './models/Friend';

const app = express();

export const httpServer = createServer(app);



app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/uploads", express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res) => {
    res.set("Cross-Origin-Opener-Policy", "Cross-origin");
  },
}));
sequelize.sync({ alter: true }).then(async () => {
  console.log('Database connected');
  httpServer.listen(Local.SERVER_PORT, () => {
    console.log(`Server is running on port ${Local.SERVER_PORT}`);
  });
}).catch((err) => {
  console.log("Error: ", err);
})


