

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../LogOut/Logout';

const Home = () => {
  const navigate = useNavigate()
  const GoToBSAlgo = ()=>{
    navigate('/BSAlgo')
  }

  const GoToDP = ()=>{
    navigate('/GoToDP')
  }


  return (
    <div className="min-h-screen w-screen items-center">
      <h1 className="mt-40 text-white text-2xl dark:text-white font-bold ml-32">
        Welcome to HackCode
      </h1>

      <button onClick={GoToBSAlgo} className='text-white bg-orange-600 text-lg font-medium'>Explore BSAlgo</button>
      <button onClick={GoToDP} className='text-white bg-orange-600 text-lg font-medium'>Explore DP</button>

      <Logout />
    </div>
  );
};

export default Home;
