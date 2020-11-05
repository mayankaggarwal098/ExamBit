const mongoose = require('mongoose');
const express = require('express');
const {Response, MCQ_Response} = require('../schemas/response');
const {Exam} = require('../schemas/exam');


const router = express.Router();


// METHOD FOR http://localhost:3000/responses/ API END POINT

router.route('/')
.get( async( req, res, next ) => {


})
.post( async( req, res, next ) => {

})
.put( async( req, res, next) =>{
    res.status(403).send('Put operation is  Not Supported');
})
.delete( async (req, res, next) => {

})

//METHOD FOR http://localhost:3000/responses/:examID/multiple API END POINT
router.route('/:examId/multiple')
.get( async( req, res, next) => {
    let response = await Response.findOne({ examId: req.params.examId})
    if( response ) {
        res.send(response);
    }
    else
    {
        let newResponse = new Response({
            examId : req.params.examId
        })
    
        let question = await Exam.findById(req.params.examId);

        for( var i=0 ; i < question.mcq.length ; i++ ) {

            let mcqResponse = new MCQ_Response({
                questionId : question.mcq[i]._id,
                answer : question.mcq[i].solution,
                response: ''
            })

            newResponse.mcq.push(mcqResponse);
        } 

        newResponse = await newResponse.save()
        res.send("Response created..........");
    }
})
.post( async (req, res, next ) => {

    res.status(403).send("Not Supported");
})
.put( async( req, res, next) => {
    res.status(403).send("Not Supported");
})
.delete( async( req, res, next ) => {
    res.status(403).send("not supported");
})

//METHOD FOR http://localhost:3000/responses/:examID/multiple/:mcqId API END POINT
router.route('/:examId/multiple/:mcqId')
.get( async ( req, res, next) => {

    res.status(403).send("Not supported");
})
.post( async (req, res, next) => {

    let response = await Response.findOne({ examId: req.params.examId});
    if( !response ) return res.status(404).send("Not found");

    let mcqQuestion = response.mcq.find( q => q.id === req.params.mcqId ) ;
    if( !mcqQuestion ) return res.status(404).send("MCQ not found");

    mcqQuestion.response = req.body.response;
    await response.save();
    res.send(mcqQuestion);
})
.put( async( req, res, next) => {
    res.status(403).send("Not Supported");
})
.delete( async( req, res, next ) => {
    res.status(403).send("not supported");
})

module.exports = router;

