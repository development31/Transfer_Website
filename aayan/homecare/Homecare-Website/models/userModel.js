// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const UserSchema = mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },

//         email: {
//             type: String,
//             required: true
//         },
//         age: {
//             type: Number,

//         },
//         address: {
//             type: String,
//         },
//         contact: {
//             type: Number,
//         },
//         password: {
//             type: String,
//             required: true
//         },
//         roles: {
//             ref: "Role",
//             type: [Schema.Types.ObjectId],
//             required: true
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workStatusSchema = new Schema({
    client: {
      type: String,
      required: false
    },
    clientName: {
      type: String,
      required: false
    },
    clientId: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    }
  });
const GuideSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        mobileNumber: {
            type: Number,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        address:{
            type: String,
            required: false,
        },
        age:{
            type: String,
            required: false,
        },
        medicalhistory:{
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false
        },
        image: {
            type: String, // Storing image URL
            required: true
        },
        assign:{
            type: String,
            required: false,
            default: 'NOT ASSiGNED'
        },   
        profileImage: {
            type: String,
            required: false
        },
        modelclientid: {
            type:[String],
            required: false
        },
        workStatus: [workStatusSchema],
        userInfo: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        trackers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tracker' }],

        resetToken: String,

        resetTokenExpiration: Date,

        role: {
            type: String,
            required: false,
            ref: "guide"
        },
        otp: { type: String },
        otpExpiration: { type: Date },
    },
    {
        timestamps: true
    }
);
 
module.exports = mongoose.model('Guide', GuideSchema);