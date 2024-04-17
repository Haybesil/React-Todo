import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to My Todo App</h1>
      <p className="text-lg text-center mb-8">Manage your tasks efficiently with our simple and intuitive todo app. Sign up to get started!</p>
      <div className="flex items-center justify-center mb-4">
        <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">Sign Up</Link>
        <Link to="/login" className="text-blue-500 hover:text-blue-600 font-bold">Already have an account? <span className='text-purple-700 hover:text-purple-800'>Log In</span> </Link>
      </div>
    </div>
  );
};

export default Home;
