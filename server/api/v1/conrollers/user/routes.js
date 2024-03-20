import controller from "./controller";
import auth from "../../../../helper/auth";
import Express from "express";
export default Express.Router()
    .post("/createUser", controller.createUser)
    .post("/loginUser", controller.loginUser)
    .use(auth.verifyToken)
    .get('/findUser/:id', controller.findUser)
    .get('/userList', controller.userList)
    .put("/updateUser", controller.updateUser)
    .delete("/deleteUser/:_id", controller.deleteUser)