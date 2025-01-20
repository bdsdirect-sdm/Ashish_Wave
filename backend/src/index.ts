import express from 'express';

import { Local } from './environment/env';
import sequelize from './config/db';
import userRouter from './routers/userRoute';
import { createServer } from 'http';

import path from 'path';
import cors from 'cors';

const app = express();

export const httpServer = createServer(app);



app.use(cors());
app.use(express.json());
app.use("/", userRouter);
// app.use("/uploads", express.static(path.join(__dirname, '../uploads')));
sequelize.sync({ alter: true, force:false }).then(() => {
  console.log('Database connected');

  httpServer.listen(Local.SERVER_PORT, () => {
    console.log(`Server is running on port ${Local.SERVER_PORT}`);
  });
}).catch((err) => {
  console.log("Error: ", err);
})


