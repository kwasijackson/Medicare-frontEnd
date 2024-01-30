import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { MedicineContext } from './Context/myContext';

const Logout = () => {
    const navigate = useNavigate();
    const {setIsLoggedin} =useContext(MedicineContext);
   
        useEffect(() => {
        const tokenFromStorage = sessionStorage.getItem('userToken');
        if (tokenFromStorage) {
            navigate("/");
            sessionStorage.removeItem('userToken');
            setIsLoggedin(false);
            
        }
      }, []);
    
  return (
    <div>
      
    </div>
  )
}

export default Logout
