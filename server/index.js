
import Server from "./common/server";
import Routes from "./routes";
require("../config/config");
// console.log(global.gConfig);
// console.log("config_id>>>>>>>>>>>", global.gConfig.config_id, global.gConfig.dbCredential.user);
let dbUrl;
// const dbUrl = `mongodb://${Config.get("databaseHost")}:${Config.get("databasePort")}/${Config.get("databaseName")}`
// dbUrl = 'mongodb+srv://tiwarishiv7169:Shivam12@cluster0.bzkdvic.mongodb.net/crud-opreation';
dbUrl = global.gConfig.config_id === "production" ? `mongodb+srv://${global.gConfig.dbCredential.user}:${global.gConfig.dbCredential.password}${global.gConfig.dbCredential.host}/${global.gConfig.dbCredential.dbName}` :
    global.gConfig.config_id === "development" ? `mongodb://${global.gConfig.databaseHost}:${global.gConfig.databasePort}/${global.gConfig.databaseName}` :
        'mongodb+srv://tiwarishiv7169:Shivam12@cluster0.bzkdvic.mongodb.net/crud-opreation'
// console.log(dbUrl);

const server = new Server()
    .router(Routes)
    .handleError()
    .configureDb(dbUrl)
    .then((_server) => _server.listen(global.gConfig.port));

export default server;