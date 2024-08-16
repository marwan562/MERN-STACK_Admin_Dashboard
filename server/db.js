import mongoose from "mongoose";
import "dotenv/config";
import AffiliateStat from "./models/afilialstat.js";
import {dataAffiliateStat} from "./data/index.js"

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(async () => {
    console.log("MognoDB Connected");
    //insert data in one Time
    // OverView.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat)
  })
  .catch((err) => console.log("Error connecting to MongoDb", err));
