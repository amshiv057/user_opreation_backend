import Joi from "joi";
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage";
import apiError from "../../../../helper/apiError";
import userType from "../../../../enums/userType";
import userStatus from "../../../../enums/userStatus";
import { userServices } from "../../services/user";
const { createUser, findUser, userListWithPagination, updateUser, deleteUser } = userServices;
import { createHash, compareHash, getToken } from "../../../../helper/utils";
export class userController {
    async createUser(req, res, next) {
        const validationSchema = {
            name: Joi.string().required(),
            dateOfBirth: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string().required(),
        };
        try {
            const validteBody = await Joi.validate(req.body, validationSchema);

            const { name, dateOfBirth, email, password, role } = validteBody;
            const userRes = await findUser({ email: email });
            if (userRes) {
                throw apiError.alreadyExist(responseMessage.ALREADY_EXIST);
            }
            const hashPassword = await createHash(password);
            const insertObj = {
                name: name,
                dateOfBirth: dateOfBirth,
                email: email,
                password: hashPassword,
                user_role: userType[role],
                user_status: userStatus.status
            }
            const result = await createUser(insertObj);
            return res.json(new response(result, responseMessage.DATA_SAVED));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async loginUser(req, res, next) {
        const validationSchema = {
            email: Joi.string().required(),
            password: Joi.string().required()
        }
        try {
            const validateBody = await Joi.validate(req.body, validationSchema);
            console.log(validateBody);
            const { email, password } = validateBody;
            console.log(email);
            const userRes = await findUser({ email: email });
            if (!userRes) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const isFound = await compareHash(userRes.password, password);
            if (!isFound) {
                throw apiError.unauthorized(responseMessage.INCORRECT_PASS);
            }
            const jwtToken = await getToken({ _id: userRes._id, email: userRes.email });
            const result = {
                name: userRes.name,
                email: userRes.email,
                dateOfBirth: userRes.dateOfBirth,
                token: jwtToken
            }
            return res.json(new response(result, responseMessage.LOGIN_SUCCESS));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async findUser(req, res, next) {
        const validationSchema = {
            id: Joi.string().required()
        }
        try {
            const validateBody = await Joi.validate(req.params, validationSchema);
            const userRes = await findUser({ _id: validateBody.id });
            if (!userRes) {
                throw apiError.notFound(responseMessage.DATA_FOUND);
            }
            return res.json(new response(userRes, responseMessage.DATA_FOUND));
        } catch (error) {
            next(error);
        }
    }
    async userList(req, res, next) {
        const validationSchema = {
            page: Joi.string().optional(),
            limit: Joi.string().optional()
        }
        try {
            const validateBody = await Joi.validate(req.query, validationSchema);
            console.log(validateBody);
            const result = await userListWithPagination(validateBody);
            if (result.lenght == 0) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND))
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async updateUser(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
            name: Joi.string().optional(),
            dateOfBirth: Joi.string().optional(),
            email: Joi.string().optional(),
            user_role: Joi.string().optional(),
            user_status: Joi.string().optional(),
        };
        try {
            const validteBody = await Joi.validate(req.body, validationSchema);
            const { _id, name, dateOfBirth, email,user_role,user_status } = validteBody
            const userRes = await findUser({ _id: _id });
            if (!userRes) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const insertObj = {
                name: name,
                dateOfBirth: dateOfBirth,
                email: email,
                user_role: userType[user_role],
                user_status: userStatus[user_status]
            }
            const result = await updateUser({ _id: userRes._id }, insertObj);
            console.log(result);
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        const validationSchema = {
            _id: Joi.string().required(),
        };
        try {
            const validateBody = await Joi.validate(req.params, validationSchema);
            const { _id } = validateBody;
            const userRes = await findUser({ _id: _id });
            if (!userRes) {
                throw apiError.notFound(responseMessage.USER_NOT_FOUND);
            }
            const result = await deleteUser({ _id: userRes._id });
            return res.json(new response(result, responseMessage.DELETE_SUCCESS))
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();