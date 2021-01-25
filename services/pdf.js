const express = require("express");
const multer = require("multer");
const Photo = require("../models/pdf");
const Router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
    //   cb(new Error("only upload files with jpg or jpeg format."));
    // }
    cb(undefined, true); // continue with upload
  },
});

// Router.post(
//   "/upload",
//   upload.single("photo"),
//   async (req, res) => {
//     try {
//       const photo = new Photo(req.body);
//       const file = req.file.buffer;
//       photo.photo = file;

//       await photo.save();
//       res.status(201).send({ _id: photo._id });
//     } catch (error) {
//       res.status(500).send("Error while uploading file...Try again later.");
//     }
//   },
//   (error, req, res, next) => {
//     if (error) {
//       res.status(500).send({
//         upload_error: error.message,
//       });
//     }
//   }
// );
Router.post(`/upload`, async (req, res) => {
  const { photo } = req.body;
  console.log(photo);
  const data = new Photo({
    photo,
  });
  await data.save();
});

// Router.get('/photos', async (req, res) => {
//   try {
//     const photos = await Photo.find({});
//     res.send(photos);
//   } catch (error) {
//     res.status(500).send({ get_error: 'Error while getting list of photos.' });
//   }
// });

Router.get("/download/:id", async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set("Content-Type", "application/pdf");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

module.exports = Router;
