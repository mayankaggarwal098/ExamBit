const Question = require("../models/question");
const Result = require("../models/result");
const { Group, validateGroup } = require("../models/group");
const { Student } = require("../models/studentRegistered");
const { User } = require("../models/user");
const TestPaper = require("../models/testpaper");
const { validateEditTest, validateCreateTest } = require("./validation");

const createEditTest = async (req, res) => {
  // if (req.user.category !== "SUPERVISOR") {
  //   return res.status(401).send("Permission not granted");
  // }
  const {
    title,
    category,
    pdf,
    subject,
    duration,
    selectedQuestions,
    isSnapshots,
    isAudioRec,
    startTime,
    paperType,
    groupId,
    maxMarks,
  } = req.body;
  const _id = req.body._id || null;
  if (_id != null) {
    const { error } = validateEditTest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const paper = await TestPaper.findOneAndUpdate(
      { _id },
      {
        title,
        category,
        pdf,
        questions: selectedQuestions,
        subject,
        duration,
        isSnapshots,
        startTime,
        isAudioRec,
        maxMarks
      }
    );
    if (!paper) return res.status(404).send("Testpaper does not exists");

    res.send("Successfully Updated");
  } else {
    const { error } = validateCreateTest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let paper = new TestPaper({
      title,
      category,
      pdf,
      subject,
      questions: selectedQuestions,
      duration,
      // createdBy: req.user._id,
      isRegistrationAvailable:
        paperType === "GROUP" || paperType === "ASSIGNMENT" ? true : false,
      isSnapshots,
      startTime,
      paperType,
      isAudioRec,
      maxMarks
    });

    paper = await paper.save();
    if (paperType === "GROUP" || paperType === "ASSIGNMENT") {
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).send("Group not Found");
      group.tests.push(paper._id);
      await group.save();
    } else {
      const user = req.user;
      user.testId.push(paper._id);
      await user.save();
    }

    res.send(paper);
  }
};

const getDetailedTest = async (req, res) => {
  const paper = await TestPaper.findById(req.params.id)
    // .populate("createdBy", "name")
    .populate("questions", "questionBody")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        model: Options,
      },
    })
    .select("-pdf");
  if (!paper) res.status(404).send("Testpaper does not exists");
  res.send(paper);
};

const getTest = async (req, res) => {
  const paper = await TestPaper.findById(req.params.id).select(
    // " title subject duration isSnapshots questions startTime isAudioRec"
    "-pdf"
  );
  if (!paper) res.status(404).send("Testpaper does not exists");
  res.send(paper);
};

const getAllTests = async (req, res) => {
  // const papers = await TestPaper.find({
  //   createdBy: req.user._id,
  //   isTestConducted: false,
  //   //  paperType: { $not: { $regex: "ASSIGNMENT" } },
  // })
  //   .populate("questions", "questionBody")
  //   .populate({
  //     path: "questions",
  //     populate: {
  //       path: "options",
  //       //model: Options,
  //     },
  //   })
  //   .select("-createdBy -pdf")
  //   .sort("-createdAt");
  // res.send(papers);
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: false,
        paperType: { $not: { $regex: "ASSIGNMENT" } },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })
    // .select("-pdf")
    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: false,
          paperType: { $not: { $regex: "ASSIGNMENT" } },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
        },
      },
    });
  //.sort("-createdAt");
  if (!testPaper) return res.status(404).send("Tests Not Found");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    res.send([...grouptest, ...organisationtest]);
  } else res.send(organisationtest);
};

const getAllAssignments = async (req, res) => {
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: false,
        paperType: { $regex: "ASSIGNMENT" },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })
    // .select("-pdf")
    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: false,
          paperType: { $regex: "ASSIGNMENT" },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
        },
      },
    });
  if (!testPaper) return res.status(404).send("Tests Not Found");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    res.send([...grouptest, ...organisationtest]);
  } else res.send(organisationtest);
};

const getAllTestsConducted = async (req, res) => {
  // const papers = await TestPaper.find({
  //   createdBy: req.user._id,
  //   isTestConducted: true,
  // })
  //   .populate("questions", "questionBody")
  //   .populate({
  //     path: "questions",
  //     populate: {
  //       path: "options",
  //       //model: Options,
  //     },
  //   })
  //   .select("-createdBy -pdf")
  //   .sort("-createdAt");
  // res.send(papers);
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: true,
        paperType: { $not: { $regex: "ASSIGNMENT" } },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })
    // .select("-pdf")
    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: true,
          paperType: { $not: { $regex: "ASSIGNMENT" } },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
        },
      },
    });

  if (!testPaper) return res.status(404).send("Tests Not Found");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    organisationtest = [...grouptest, ...organisationtest];
    //res.send([...grouptest, ...organisationtest]);
  } //else
  console.log(organisationtest);
  res.send(organisationtest);
};
const getAllAssignmentsConducted = async (req, res) => {
  // const papers = await TestPaper.find({
  //   createdBy: req.user._id,
  //   isTestConducted: true,
  // })
  //   .populate("questions", "questionBody")
  //   .populate({
  //     path: "questions",
  //     populate: {
  //       path: "options",
  //       //model: Options,
  //     },
  //   })
  //   .select("-createdBy -pdf")
  //   .sort("-createdAt");
  // res.send(papers);
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: true,
        paperType: { $regex: "ASSIGNMENT" },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })
    // .select("-pdf")
    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: true,
          paperType: { $regex: "ASSIGNMENT" },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
        },
      },
    });
  if (!testPaper) return res.status(404).send("Tests Not Found");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    res.send([...grouptest, ...organisationtest]);
  } else res.send(organisationtest);
};

const deleteTest = async (req, res) => {
  const paper = await TestPaper.findById(req.body.id);
  if (!paper) {
    return res.status(404).send("Test paper does not exist");
  }
  await paper.remove();
  res.send("Test Paper Deleted Successfully");
};

const beginTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestConducted: false },
    { isTestBegins: true, isRegistrationAvailable: false }
    // { new: true }
  );
  if (!paper) {
    return res.status(404).send("Unable to start test");
  }
  //res.send(paper);
  res.send("Test Starts");
};

const endTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestBegins: 1 },
    {
      isTestBegins: false,
      isTestConducted: true, // isResultGenerated: true
    }
    // { new: true }
  );
  if (!paper) {
    return res.status(404).send("Unable to end test");
  }
  //res.send(paper);
  res.send("Test has ended");
};

// const maxMarks = async (req, res) => {
//   const paper = await TestPaper.findById(req.body.testId).populate("questions");
//   if (!paper) {
//     return res.status(401).send("Invalid Test Paper Id");
//   }
//   let marks = 0;
//   paper.questions.map((m) => {
//     marks += m.weightage;
//   });
//   res.send(marks);
// };

const checkTestStart = async (req, res) => {
  const { id } = req.body;
  const paper = await TestPaper.findById(id);
  if (!paper) res.status(404).send("Test Paper does not exist");

  res.send(paper.isTestBegins);
};

const changeRegistrationStatus = async (req, res) => {
  const { id, status } = req.body;
  const paper = await TestPaper.findOneAndUpdate(
    {
      _id: id,
      isTestConducted: false,
      isTestBegins: false,
    },
    { isRegistrationAvailable: status }
  );
  if (!paper) {
    return res.status(404).send("Unable to change Registration status");
  }
  // await TestPaper.findByIdAndUpdate(
  //   { _id: id },
  //   { isRegistrationAvailable: status }
  // );
  res.send("Registration status changed");
};

// const getRegisteredStudents = async (req, res) => {
//   const { testId } = req.body;
//   //const students = await Student.find({ testId }).sort("-createdAt");
//   const students = await User.find({
//     testId: { $in: [testId] },
//     category: "STUDENT",
//   }).sort("-createdAt");
//   // if (students.length === 0) {
//   //   return res.status(400).send("Invalid Test Id");
//   // }

//   res.send(students);
// };

const getRegisteredStudents = async (req, res) => {
  const { testId } = req.body;
  const testPaper = await TestPaper.findById(testId).select("paperType");
  if (!testPaper) return res.status(404).send("Paper Not Found");

  console.log(testPaper)
  let data = [];
  if (testPaper.paperType === "GROUP" || testPaper.paperType === "ASSIGNMENT")  {
    data = await Group.findOne({ tests: { $in: [testId] } })
      .select("students")
      .populate({
        path: "students",
        select: {
          name: 1,
          email: 1,
        },
      });

    res.send(data.students);
  } else {
    data = await User.find({
      category: "STUDENT",
      testId: { $in: [testId] },
    }).select("name email");
    res.send(data);
  }

  // if (students.length === 0) {
  //   return res.status(400).send("Invalid Test Id");
  // }
};

module.exports = {
  getAllAssignmentsConducted,
  getAllAssignments,
  getRegisteredStudents,
  createEditTest,
  getDetailedTest,
  getAllTests,
  deleteTest,
  beginTest,
  checkTestStart,
  changeRegistrationStatus,
  endTest,
  getAllTestsConducted,
  getTest,
};
