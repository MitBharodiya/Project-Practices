import express, { urlencoded } from "express";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import router from "./src/router/index.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

//mount the Routes
app.use("/api", router);

//connect DB 
connectDB();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));