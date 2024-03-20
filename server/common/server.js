import express from "express";
import mongoose from "mongoose";
import * as http from "http";
import * as path from "path";
import cors from "cors";
import morgan from "morgan";
import apiErrorHandler from "../helper/apiErrorHandler";




const app = new express();
const server = http.createServer(app);
const root = path.normalize(`${__dirname}/../..`);

class ExpressServer {
    constructor() {
        app.use(express.json({ limit: '1000mb' }));

        app.use(express.urlencoded({ extended: true, limit: '1000mb' }))

        app.use(morgan('dev'))

        app.use(
            cors({
                allowedHeaders: ["Content-Type", "token", "authorization"],
                exposedHeaders: ["token", "authorization"],
                origin: "*",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                preflightContinue: false,
            })
        );
    }
    router(routes) {
        routes(app)
        return this;
    }
    handleError() {
        app.use(apiErrorHandler);
        return this;
    }

    async configureDb(dbUrl) {
        return mongoose.connect(dbUrl, {
        }).then(() => {
            console.log("MongoDB Connection established");
            return this;
        }).catch((error) => {
            console.log(`Error in mongoDB connection  🌍 ${error.message}`);
            throw error;
        });
    }
    listen(port) {
        server.listen(port, () => {
            console.log(`secure app is listening 🌍 @port ${port}`, new Date().toLocaleString());
        });
        return app;
    }

}

export default ExpressServer;