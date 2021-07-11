import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Routes from './routes/course.js';
import dotenv from 'dotenv'
// import path from "path";

dotenv.config()

const app = express();
// const __dirname = path.resolve();
// const PORT = process.env.PORT;
// console.log(PORT);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/course', Routes);

const DB_URL = process.env.DB_URL;  
const PORT = process.env.PORT;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>app.listen(PORT))
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set("useFindAndModify", false);
