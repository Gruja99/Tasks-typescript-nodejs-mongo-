import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({
  path: __dirname + '/.env',
});
import { songRouter, userRouter } from './routes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
app.use('/song', songRouter);
app.use('/user', userRouter);
import * as mongoose from 'mongoose';
run().catch((err) => console.log(err));
async function run(): Promise<void> {
  await mongoose.connect('mongodb://localhost/songs');
  console.log('connect with database');
}

app.listen(port);
console.log('listen port: ' + port);

module.exports = app;
