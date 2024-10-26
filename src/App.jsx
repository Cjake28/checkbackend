import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

const API_URL = "https://cemetery-mapping-system.onrender.com/api/auth";

function App() {
  const [loginresponse, setLoginResponse] = useState('');
  const [checkauth, setCheckauth] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(`${API_URL}/signin`, { username: 'admin', password: 'password123' }, { withCredentials: true });
      console.log(response);

      setLoginResponse(response?.data?.message);
    } catch(error){
      console.log("login error: ", error.response?.data?.message );
      console.log(error);
      throw error;
    }
  };

  const checkAuth = async () => {
    try {
        const response = await fetch("https://cemetery-mapping-system.onrender.com/api/auth/check-auth", {
            method: 'GET',
            credentials: 'include', // Include cookies
        });

        if (!response.ok) {
            throw new Error('Authentication check failed');
        }

        const data = await response.json();

        if(data?.success){
          setCheckauth(data?.user?.name);
          return
        }

        setCheckauth(data?.message);
        console.log('Authentication status:', data);
    } catch (error) {
        console.error('Check auth error:', error.message);
    }
};


  const signout = async () => {
    try{
      const response = await axios.post(`${API_URL}/signout`);
      console.log(response);
    }catch(error){
      console.log(error)}
  }
  return (
    <>
      {loginresponse && <h1>{loginresponse}</h1>}
      {checkauth && <h1>{checkauth}</h1>}
      <button onClick={() => login()}>login</button>
      <button onClick={() => checkAuth()}>check Auth</button>
      <button onClick={() => signout()}>signout</button>
    </>
  )
}

export default App
