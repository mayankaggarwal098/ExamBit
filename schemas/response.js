const mongoose=require('mongoose');

const mcqSchema = new mongoose.Schema({
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'MCQ'
    },
    answer:{
        type:String,
        required:true
    },
    response:{
        type:String
    }
});

const MCQ_Response = mongoose.model('MCQ_Response', mcqSchema);

const responseSchema = new mongoose.Schema({
    examId:{
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
    mcq:[mcqSchema]
},{timestamps:true});

const Response = mongoose.model('Response',responseSchema);

exports.MCQ_Response = MCQ_Response;
exports.Response = Response;