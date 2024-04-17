import React, { useState } from 'react';
import { auth } from '../firebase/Firebase'; // Import auth from Firebase.js
import { Link } from 'react-router-dom';
import 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password using Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
    
      // Clear form fields after successful sign-up
      setEmail('');
      setPassword('');
      setError('');
      // Optionally, redirect the user to a different page after successful sign-up
    } catch (error) {
      // Handle sign-up errors and display error message to the user
      if (error instanceof AuthError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('The email address is already in use by another account.');
            break;
          case 'auth/invalid-email':
            setError('The email address is invalid.');
            break;
          case 'auth/weak-password':
            setError('The password is too weak.');
            break;
          // Add more cases for other error codes if needed
          default:
            setError('An error occurred while signing up. Please try again later.');
            break;
        }
      } else {
        // Handle non-AuthError exceptions
        setError('An unexpected error occurred. Please try again later.');
        console.error('Error during sign-up:', error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the state of showPassword
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
            type={showPassword ? 'text' : 'password'} // Show password if showPassword is true
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" type="submit">
          Sign Up
        </button>
        <button type="button" onClick={togglePasswordVisibility} className="text-blue-500 ml-2 focus:outline-none">
          {showPassword ? 'Hide password' : 'Show password'}
        </button>
        <p className="text-gray-700 mt-2">
          Already have an account? <Link to='/login' className='text-blue-500'>Log In</Link>
        </p>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Signup;
