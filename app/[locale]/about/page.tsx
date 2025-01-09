"use client";

// pages/login.js
import { useState } from 'react';
 //import  { getLoginRequest } from "@/lib/apiClient";
//import axios from 'axios';
//import { useRouter } from 'next/router';
import  axiosInstance    from "../../../lib/axiosInstance";
//import Cookies from 'js-cookie';
//import { jwtDecode } from 'jwt-decode';
export default  function   AboutPage() {
  const [EmailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  //const router = useRouter();
 // const { locale } = router; // Get the current locale

  const handleLogin = async (e: React.FormEvent) => {
    
  
    e.preventDefault();
    console.log("Logging in..."+EmailAddress+":"+password);
    try {
      const res=await axiosInstance.post("/User/Login", { 'EmailAddress':EmailAddress, 'password':password }); 
      // console.log('res:',res);
      // console.log("login response:",res.data);
      // const decodedToken = jwtDecode(res.data.accessToken);
      // console.log("decoded token:",decodedToken);
              // if(!res.data.accessToken) { 
              // try {
              //     const decodedToken = jwtDecode(res.data.accessToken);
              //     console.log("decoded token:",decodedToken);
              //     if (typeof window !== 'undefined') {
              //          localStorage.setItem('authToken', res.data.accessToken);
     // Replace with your storage mechanism
              //     }
                 
              //   } catch (error) {
              //     console.error('Failed to decode token:', error);
              //     return null;
              //   }
                
              // }
              // Set token in cookies
              res.headers.setHeader("Set-Cookie", `authToken=${res.data.accessToken}; HttpOnly; Path=/;`);  // Replace with your login logic (e.g., axios, password }));
            //}
      console.log(res);
     // console.log(res.data.accessToken, res.data.refreshToken, res.status);
     // console.log( res.statusText,res.headers,res.config);
    } catch(e){
      console.log(e);
    }
    // try {
    //   const res=await axios.post("https://localhost:7000/api/User/LoginAdmin", { 'EmailAddress':EmailAddress, 'password':password }); 
    //   // // Replace with your login logic (e.g., axios, password }));
    //   console.log(res);      
    // }  catch(e){
    //   console.log(e);
    // }
 
      // getLoginRequest('/User/LoginAdmin', { 'EmailAddress':EmailAddress, 'password':password })
      // .then(function (response) {
      //   // handle success
      //   console.log(response);
      //   console.log("login response:",response.data);
      //   localStorage.setItem('token', response.data.token); // Store the token in localStorage
      //  // router.push('/'); // Redirect to the home page or any protected page
      // })
      // .catch(function (error) {
      //   // handle error
      //   console.error('Login failed:', error);
      // })
      // .finally(function () {
      //   // always executed
      // });
     
  };
 
  const handleGetUrl = async (e: React.FormEvent) => {
     
    e.preventDefault();
    console.log("/User/GetByGuid");
    try {
      const res=await axiosInstance.get("/User/GetByGuid?guid=D5DBBF89-B1E9-449E-9FF2-AE0E2A3BE68E"); 
      console.error('Login failed:', res );
    } catch(e){
      console.log(e);
    }
  };
      // getLoginRequest('/User/LoginAdmin', { 'EmailAddress':EmailAddress, 'password':password })
      // .then(function (response) {
      //   // handle success
  return (
     <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={EmailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <form onSubmit={handleGetUrl}> 
        <button type="submit">Get User by id</button>
      </form>
    </div>
  );
}