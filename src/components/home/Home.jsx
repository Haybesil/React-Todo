import React from 'react';
import { Link } from 'react-router-dom';
import { Div } from '../../styles/Styles';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 grey ">Task Manager and More...</h1>
      <p className="text-lg text-center mb-8 grey">Manage your tasks efficiently with our simple and intuitive todo app. Sign up to get started!</p>

      <Div className="flex flex-col items-center justify-center mb-4">
        <Link to="/signup" className="bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded mr-4 w-[20%]">Sign Up</Link>
        <Link to="/login" className="text-black pt-[20px]">Already have an account? {" "} <span className='text-black hover:text-gray-900 font-bold'>Log In</span> </Link>
      </Div>
    </div>
  );
};

export default Home;
