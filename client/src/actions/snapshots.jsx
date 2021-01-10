import http from "../component/httpService";

export const uploadImage = async (testId, studentId, image) => {
  try {
    const { data } = await http.post("/api/snapshot/upload", {
      testId,
      studentId,
      image,
    });
    console.log(data);
  } catch (ex) {
    console.log(ex);
  }
};

export const getAllImages = async (testId, studentId) => {
  try {
    const { data } = await http.post("/api/snapshot/get/all", {
      testId,
      studentId,
    });
    // console.log(data);
    return data;
  } catch (ex) {
    console.log(ex);
  }
};
