import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { auth } from '../firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Add state for login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password using Firebase Auth
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      // Clear form fields after successful login
      setEmail('');
      setPassword('');
      setError('');
      if(onLogin) {
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

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Login
        </button>
        <p className="text-gray-700 mt-2">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
