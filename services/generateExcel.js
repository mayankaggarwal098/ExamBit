const ExcelJS = require("exceljs");
const Result = require("../models/result");
const TestPaper = require("../models/testpaper");

const generateExcel = async (testId) => {
  const workbook = new ExcelJS.Workbook();
  // const paper = await TestPaper.findById(testId)
  //   .select("questions")
  //   .populate("questions");
  // let maxMarks = 0;
  // paper.questions.map((m) => {
  //   maxMarks += m.weightage;
  // });
  const result = await Result.find({ testId })
    .select("score studentId testId")
    .populate("studentId testId");

    console.log(result)
  const worksheet = workbook.addWorksheet("Results", {
    pageSetup: { paperSize: 9, orientation: "landscape" },
  });
  worksheet.columns = [
    { header: "Subject", key: "Subject", width: 30 },
    { header: "Test Title", key: "TestTitle", width: 30 },
    { header: "Name", key: "Name", width: 30 },
    { header: "Email", key: "Email", width: 50 },
    // { header: "Phone No.", key: "PhoneNum", width: 20 },
    { header: "Obtained Marks", key: "Marks", width: 17 },
    { header: "Max Marks", key: "MaxMarks", width: 15 },
  ];
  result.map((r) => {
    worksheet.addRow({
      Subject: r.testId.subject,
      TestTitle: r.testId.title,
      Name: r.studentId.name,
      Email: r.studentId.email,
      //PhoneNum: r.studentId.phoneNum,
      Marks: r.score,
      MaxMarks: r.testId.maxMarks,
    });
  });
  //await workbook.xlsx.writeFile(`${paper.title}_${testId}.xlsx`);
  return workbook;
};

module.exports = { generateExcel };
