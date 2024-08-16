import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
//enviroment variables
import "dotenv/config";
import "./db.js";
//routes
import clientRoute from "./routes/client.js";
import managmentRoute from "./routes/managment.js";
import salesRoute from "./routes/sales.js";
import generalRoute from "./routes/general.js";

//app expressjs
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

// configrations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

//routes
app.use("/client", clientRoute);
app.use("/sales", salesRoute);
app.use("/general", generalRoute);
app.use("/managment", managmentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
