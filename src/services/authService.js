import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/Routes';
import { toast } from 'react-toastify';
import tokenService from './tokenService';

const AuthService = () => {
  const { userToken, setUserObject, clearToken } = tokenService();
  const navigate = useNavigate();

  const baseUrl = 'https://fmd.arraydigitals.com/api';

 
  //USER REGISTRATION STARTS
  // User Login Starts
  const handleLogin = (data) => {
    return axios.post(`${baseUrl}/users/login`, data)
  }
  const onSuccessLogin = (res) => {
    if (res?.data?.success && res?.data?.data?.type == "2") {
      let token = res?.data?.token;
      let userData = res?.data?.data;
      userToken(token);
      navigate(ROUTES.HOMEPAGE)
      setUserObject(userData)
      
    }
    else {
      toast.error('invalid Login!');
      clearToken();
    }
  }
  
  return { handleLogin, onSuccessLogin }
}

export default AuthService