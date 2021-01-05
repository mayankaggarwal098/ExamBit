const ResponseSheet = require("../models/responseSheet");
const Result = require("../models/result");
const SubResult = require("../models/subResult");

const generateResult = async (req, res) => {
  const { studentId, testId } = req.body;
  const result = await Result.findOne({ testId, studentId }).populate(
    "subResult"
  );
  if (result) return res.send(result);

  const responseSheet = await ResponseSheet.findOne({
    studentId,
    testId,
    isCompleted: true,
  })
    .populate("questions responses")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        //model: Options,
      },
    });

  if (!responseSheet) return res.status(400).send("Invalid Request");

  const { questions, responses } = responseSheet;
  const score = 0;
  const subResults = questions.map((q) => {
    const res = responses[i].chosenOption;
    const correctAnswer = [];
    const response = [];
    q.options.map((o, j) => {
      if (o.isAnswer) {
        correctAnswer.push(ansMap[j]);
      }
      for (let k = 0; k < res.length; ++k) {
        if (String(res[k]) === String(o._id)) {
          response.push(ansMap[j]);
        }
      }
    });
    const l1 = correctAnswer.length;
    const l2 = response.length;
    let isCorrect = false;
    if (l1 === l2) {
      let count = 0;
      for (const p of correctAnswer) {
        for (const q of response) {
          if (p === q) {
            count++;
            break;
          }
        }
      }
      if (count === l1) {
        isCorrect = true;
        score += q.weightage;
      }
    }
    const subresult = {
      questionId: q._id,
      weightage: q.weightage,
      correctAnswer,
      response,
      explaination: q.explaination,
      isCorrect,
    };
    return subresult;
  });
  const subResult = await SubResult.insertMany(subResults);
  const resultdata = new Result({
    testId,
    studentId,
    responseSheet,
    subResult,
    score,
  });
  await resultdata.save();
  res.send(resultdata);
};

module.exports = { generateResult };
