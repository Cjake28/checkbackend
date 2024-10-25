import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

const API_URL = "https://cemetery-mapping-system.onrender.com/api/auth";

function App() {

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, { username: username, password: password });
      console.log(response);
    } catch(error){
      console.log("login error: ", error.response?.data?.message );
      console.log(error);
      throw error;
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      console.log("checkAuth: ",response);

      if(!response.data.success){
        console.log("checkAuth user false");
        return
      }

      console.log("cehckAUth response: ",response);

    } catch (error) {
      console.log(error);
      throw error;
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
      <button onClick={() => login()}>login</button>
      <button onClick={() => checkAuth()}>check Auth</button>
      <button onClick={() => signout()}>signout</button>
    </>
  )
}

export default App
