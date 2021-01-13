import http from '../utils/httpService';
import errorHandler from '../errorHandler';
import Token from '../utils/Token';

export const uploadImage = async (testId, studentId, image) => {
  try {
    const { data } = await http.post('/api/snapshot/upload', {
      testId,
      studentId,
      image,
    });
  } catch (ex) {
    errorHandler(ex);
  }
};

export const getAllImages = async (testId, studentId) => {
  try {
    const { data } = await http.post(
      '/api/snapshot/get/all',
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
