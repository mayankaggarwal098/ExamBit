const express = require('express');
const mongoose = require('mongoose');
const {Exam, validateExam} = require('../schemas/exam');
const { MCQ, validateMCQ } = require('../schemas/mcq');
const router = express.Router();


// METHOD FOR http://localhost:3000/exams API END POINT
router.route('/')
.get( async (req, res, next) => {
    const exams = await Exam.find({})
    if( exams.length === 0 ) return res.send('Exam not created...');

    res.send(exams)
})
.post(async (req, res, next ) => {

    const { error } = validateExam( req.body )
    if( error ) return res.status(400).send(error.details[0].message);

    let exam = new Exam({
        title: req.body.title,
        courseCode: req.body.courseCode,
        description: req.body.description,
        mcq: req.body.mcq,
        subjective: req.body.subjective
    })

    exam = await exam.save();
    res.send(exam);
})
.put( async (req, res, next) => {
    return res.status(403).send('Not Supported');
})
.delete( async ( req, res, next) => {
    let exams = await Exam.deleteMany({})
    res.send(exams)
})

 
// METHOD FOR http://localhost:3000/exams/:examId API END POINT
router.route('/:examId')
.get( async ( req, res, next) => {
    let exam = await Exam.findById(req.params.examId)
    if( !exam ) return res.status(404).send('Exam Not found');

    res.send(exam);
})
.post( async (req, res, next) => {
    res.status(403).send('Not supported');
})
.put( async (req, res, next) => {
    res.status(403).send('Not supported');
})
.delete( async( req, res, next) => {
    let exam = await Exam.findByIdAndRemove(req.params.examId);
    if( !exam ) return res.status(404).send("Exam Not found");

    res.send(exam);
})

// METHOD FOR http://localhost:3000/exams/:examId/multiple API END POINT

router.route('/:examId/multiple')
.get( async (req, res, next) => {

    let exam = await Exam.findById(req.params.examId);
    if( !exam ) return res.status(404).send('Exam not found');
    
    let mcqQuestion = exam.mcq;
    if( mcqQuestion.length === 0 ) return res.status(404).send("No MCQ question");

    res.send(mcqQuestion);
})
.post( async ( req, res, next) => {
    let exam = await Exam.findById(req.params.examId);
    if( !exam ) return res.status(404).send("Exam Not found");

    const { error } = validateMCQ( req.body);
    if( error ) res.status(400).send(error.details[0].message);

    let mcqQuestion = new MCQ({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        solution: req.body.solution,
        marks: req.body.marks
    })

    exam.mcq.push(mcqQuestion);
    await exam.save();
    res.send(mcqQuestion);
})
.put( async( req, res, next) => {
    res.status(403).send(`PUT operation not supported on /exams/${req.params.examId}/multiple`)
})
.delete( async( req, res, next) => {
    
    let exam = await Exam.findById(req.params.examId);
    if( !exam ) return res.status(404).send('Exam not found');

    let mcqQuestion = exam.mcq;
    if( mcqQuestion.length === 0 ) return res.status(404).send("No mcq Questions are found")
    
    mcqQuestion = mcqQuestion.splice(0, mcqQuestion.length );
    await exam.save();
    res.send(mcqQuestion);
})

// METHOD FOR http://localhost:3000/exams/:examId/multiple/:multipleId API END pOINT

router.route('/:examId/multiple/:multipleId')
.get( async (req, res, next) => {

    //OPTIONAL
    let exam = await Exam.findById( req.params.examId);
    if( !exam ) return res.status(404).send('Exam Not Found');

    let mcqQuestion = await exam.mcq.find( ques => ques.id === req.params.multipleId )
    if( !mcqQuestion ) return res.status(404).send("MCQ are not present");

    res.send(mcqQuestion);
})
.post( async( req, res, next) => {
    res.status(403).send(`POST operation not supported on /exams/${req.params.examId}/multiple/${req.params.multipleId}`);
})
.put( async( req, res, next) => {

    let exam = await Exam.findById( req.params.examId);
    if( !exam ) return res.status(404).send('Exam Not Found');

    let mcqQuestion = await exam.mcq.find( ques => ques.id === req.params.multipleId )
    if( !mcqQuestion ) return res.status(404).send("MCQ are not present");

    if( req.body.question ) {
        mcqQuestion.question = req.body.question;
    }
    if( req.body.option1 ) {
        mcqQuestion.option1 = req.body.option1;
    }
    if( req.body.option2 ) {
        mcqQuestion.option2 = req.body.option2;
    }
    if( req.body.option3 ) {
        mcqQuestion.option3 = req.body.option3;
    }
    if( req.body.option4 ) {
        mcqQuestion.option4 = req.body.option4;
    }
    if( req.body.solution ) {
        mcqQuestion.solution = req.body.solution;
    }
    if( req.body.marks ) {
        mcqQuestion.marks = req.body.marks;
    }

    await exam.save();
    res.send(mcqQuestion);
})
.delete( async (req, res, next) => {
    let exam = await Exam.findById( req.params.examId);
    if( !exam ) return res.status(404).send('Exam Not Found');

    let mcqQuestionIndex = await exam.mcq.findIndex( ques => ques.id === req.params.multipleId )
    if( mcqQuestionIndex === -1 ) return res.status(404).send("MCQ are not present");

    exam.mcq.splice(mcqQuestionIndex, 1);
    await exam.save();
    res.send('Question Deleted........');
})




module.exports = router