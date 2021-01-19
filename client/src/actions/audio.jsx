import http from "../utils/httpService";
import errorHandler from "../errorHandler";
import Token from "../utils/Token";

export const uploadAudio = async (testId, studentId, audioRecording) => {
  try {
    const { data } = await http.post("/api/audio/upload", {
      testId,
      studentId,
      audioRecording,
    });
    console.log(data);
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getAllAudioRec = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      "/api/audio/get/all",
      {
        testId,
        studentId,
      },
      Token()
    );
    // console.log(data);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
