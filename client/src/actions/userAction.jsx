import http from '../component/httpService';
import { toast } from 'react-toastify';
import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS
} from "../constants/userConstanst"

export const userRegister = ( name, email, password, category ) => async( dispatch ) => { 

    try {
        dispatch({ type: USER_REGISTER_REQUEST})

        await http.post('/api/signup', { name, email, password, category} )

        dispatch({ 
            type : USER_REGISTER_SUCCESS,
        })

        toast.success('Successfully Register')

    } catch (error) {

        if (error.response && error.response.status === 400) {
            toast.error(error.response.data);
          }

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const login = ( email, password ) => async( dispatch) => { 

    try {    
        dispatch({ type: USER_LOGIN_REQUEST })

        const { data } = await http.post('/api/login', { email, password } )

        dispatch({ 
            type : USER_LOGIN_SUCCESS,
            payload: data
        })

        toast.success('Successfully login')
        localStorage.setItem('userInfo', JSON.stringify(data));
        
    } catch (error) {

        toast.error('Invalid Email id or Password')

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const logout = () => async( dispatch ) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
}
