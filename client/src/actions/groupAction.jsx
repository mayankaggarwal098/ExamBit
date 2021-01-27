import { toast } from 'react-toastify';
import errorHandler from '../errorHandler';
import httpService from '../utils/httpService';
import Token from '../utils/Token';

export const getAllGroup = async () => {
  try {
    const { data } = await httpService.get('/api/groups/allGroup', Token());
    console.log(data);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const createGroup = async (groupName, groupCode) => {
  try {
    const { data } = await httpService.post(
      '/api/groups/create-group',
      { groupName, groupCode },
      Token()
    );
    toast.success('SuccessFully Created');
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};

export const joinGroup = async groupCode => {
  try {
    const { data } = await httpService.post(
      '/api/groups/join-group',
      { groupCode },
      Token()
    );
    console.log(data);
    return data;
  } catch (ex) {
    errorHandler(ex);
  }
};
