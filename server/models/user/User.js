import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import userType from "../../enums/userType";
import userStatus from "../../enums/userStatus";
const timeStamp = {
    timestamps: true,
    collection: 'user'
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: String,
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
    user_role: {
        type: String,
        default: userType.ADMIN, enums: [userType.ADMIN, userType.MODREATOR, userType.PUBLISHER, userType.REVIEWER],
    },
    user_status: {
        type: String,
        default: userStatus.ACTIVE, enums: [userStatus.ACTIVE, userStatus.INACTIVE, userStatus.SUSPENDED],
    }
},
    timeStamp
)
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('user', userSchema);