import express from "express";
import { dbConnection } from "./config/db.js";

// create express app

const app = express();

dbConnection();

app.use(express.json());


const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});