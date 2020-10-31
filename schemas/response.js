const mongoose=require('mongoose');

const mcqSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    response:{
        type:String,
        required:true
    }
});

const responseSchema=new mongoose.Schema({
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    attempts:{
        type: String,
        default:''
    },
    multiple:[mcqSchema]
},{timestamps:true});

const Response=mongoose.model('Response',responseSchema);
exports.Response=Response;