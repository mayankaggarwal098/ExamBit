const ResponseSheet = require("../models/responseSheet");
const Result = require("../models/result");
const SubResult = require("../models/subResult");
const TestPaper = require("../models/testpaper");
const { generateExcel } = require("./generateExcel");

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

  if (!responseSheet) return res.send("Student has not attempt this test");
  const ansMap = ["A", "B", "C", "D", "E"];
  const { questions, responses } = responseSheet;
  let maxMarks = 0;
  questions.map((m) => {
    maxMarks += m.weightage;
  });
  let score = 0;
  const subResults = questions.map((q, i) => {
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
    maxMarks,
  });
  await resultdata.save();
  res.send(resultdata);
};

// const getAllResults = async (req, res) => {
//   const { testId } = req.body;
//   const results = await Result.find({ testId })
//     .select("score studentId")
//     .populate("studentId");
//   if (results.length === 0) {
//     return res.status(400).send("Invalid TestId");
//   }
//   return results;
// };

// const getDetailedResult = async (req, res) => {
//   const { studentId, testId } = req.body;
//   const result = await Result.findOne({ testId, studentId }).populate(
//     "subResult"
//   );
//   if (!result) return res.status(400).send("Invalid Inputs");

//   res.send(result);
// };

const generateResultPdf = async (req, res) => {
  const { studentId, testId } = req.body;

  const result = await Result.findOne({ testId, studentId });

  if (result) return res.send(result);
  const responseSheet = null,
    subResult = null,
    score = -1,
    maxMarks = -1;
  const resultdata = new Result({
    testId,
    studentId,
    responseSheet,
    subResult,
    score,
    maxMarks,
  });
  await resultdata.save();
  //res.send(resultdata);
};

const getScore = async (req, res) => {
  const { testId } = req.body;
  const result = await Result.find({ testId }).select("score studentId");
  //if (!result) return res.status(404).send("Result Not found");
  res.send(result);
};
const editScore = async (req, res) => {
  const { testId, studentId, score } = req.body;
  const result = await Result.findOneAndUpdate(
    { testId, studentId },
    { score }
  );
  if (!result) return res.status(404).send("Result Not found");
  res.send("Successfully updated");
};

const download = async (req, res) => {
  const { testId } = req.body;

  const paper = await TestPaper.find({ _id: testId, isTestConducted: true });
  if (!paper) return res.status(404).send("Testpaper not found");

  const workbook = await generateExcel(testId);
  const fileName = `result_${testId}.xlsx`;

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

  await workbook.xlsx.writeFile(fileName);
  //console.log(workbook);
  res.end();
};

module.exports = {
  download,
  generateResult,
  generateResultPdf,
  getScore,
  editScore,
};
