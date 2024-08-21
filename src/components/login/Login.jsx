import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { Div } from '../../styles/Styles';
import { SendButton } from '../../styles/Login';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Add state for login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password using Firebase Auth
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoggedIn(true);
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
      setError('');
      if (onLogin) {
        onLogin(userCredentials.user.displayName);
      }
      // Optionally, redirect the user to a different page after successful login
    } catch (error) {
      // Handle login errors and display error message to the user
      setError(error.message);
    }
  };

  if (loggedIn) {
    return <Navigate to="/todo" />; // Redirect to the main page after successful login
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the state of showPassword
  };

  return (
    <Div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <Div className="mb-4">
          <input
            className="block w-full border-0 rounded-lg py-2 px-3 focus:outline-none focus:border-0"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </Div>
        <Div className="relative mb-4">
          <input
            className="block w-full border-0 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:border-0"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-black focus:outline-none"
          >
            {showPassword ? <FaRegEye /> : <RiEyeCloseLine />}
          </button>
        </Div>

        <SendButton
          type="submit"
        >
          Login
        </SendButton>

        <Div className='text-right'>
          <Link to='/forget'>Forget password?</Link>
        </Div>

        <p className="text-gray-700 mt-2 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-black">
            Sign Up
          </Link>
        </p>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </Div>
  );
};

export default Login;
