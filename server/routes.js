import userContent from "./api/v1/conrollers/user/routes";


export default function routes(app) {
    app.use("/api/v1/user", userContent);
    return app;
}