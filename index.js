import express from "express";
import { dbConnection } from "./config/db.js";
import "dotenv/config";
import expressOasGenerator from "@mickeymond/express-oas-generator"
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { userRouter } from "./routes/user_routes.js";

// create express app

const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["auth"],
    mongooseModels: mongoose.modelNames(), 
})

dbConnection();

app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true},
    store: MongoStore.create({
        mongoUrl: process.env.Mongo_url
    })
}));


app.use('/api/v1', userRouter);


expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is listening`);
});