import userModel from "../../../models/user/user";

const userServices = {
    createUser: async (insertObj) => {
        return await userModel.create(insertObj);
    },

    findUser: async (query) => {
        return await userModel.findOne(query);
    },

    updateUser: async (query, updateObj) => {
        return await userModel.findOneAndUpdate(query, updateObj, { new: true })
    },
    userListWithPagination: async (validateBody) => {
        let query = {};
        const { page, limit } = validateBody;
        // console.log(page, limit)
        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 15,
            sort: { createdAt: -1 }
        };
        return await userModel.paginate(query, options);
    },
    deleteUser: async (query) => {
        return await userModel.deleteOne(query);
    }
}

module.exports = { userServices };