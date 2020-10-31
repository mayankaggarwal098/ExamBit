const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        default:''
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    isFaculty: {
        type: Boolean,
        default: false
    }
});

const User=mongoose.model('User',userSchema);
exports.User=User;