import jwt from "jsonwebtoken";
import { userServices } from "../api/v1/services/user";
import apiEror from "./apiError";
import responseMessage from "../../assets/responseMessage";
import response from "../../assets/response";
const { findUser } = userServices;
require("../../config/config");
module.exports = {
    async verifyToken(req, res, next) {
        try {
            if (req.headers.token) {
                jwt.verify(req.headers.token, global.gConfig.jwtsecret, async (err, result) => {
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            return res.status(440).send({
                                responseCode: 440,
                                responseMessage: "Session Expired ,Please login again."
                            })
                        }
                        else {
                            return res.status(401).json({
                                responseCode: 401,
                                responseMessage: "User not authorized."
                            })

                        }
                    } else {
                        const userRes = await findUser({ _id: result._id });
                        if (!userRes) {
                            throw apiEror.notFound(responseMessage.DATA_NOT_FOUND);
                        }
                        else {
                            req.userId = userRes._id;
                            next();
                        }
                    }
                }
                )
            } else {
                throw apiEror.invalid(responseMessage.NO_TOKEN);
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}