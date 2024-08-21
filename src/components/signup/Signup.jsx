import React, { useState } from 'react';
import { auth } from '../firebase/Firebase'; // Import auth from Firebase.js
import { Link, Navigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { Div } from '../../styles/Styles';
import { SendButton } from '../../styles/Login';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        confirmPassword
      );
      setSignedUp(true);

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Clear form fields after successful sign-up
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      // Handle sign-up errors and display error message to the user
      setError(error.message);
    }
  };

  if (signedUp) {
    return <Navigate to="/todo" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); 
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState); 
  }

  return (
    <Div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-[30px] font-semibold mb-4 text-center">Create account</h2>
      <form onSubmit={handleSignUp}>
        <Div className="mb-4">
          <input
            className="block w-full border-0 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
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
        <Div className="relative mb-4">
          <input
            className="block w-full border-0 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:border-0"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm Password"
            required
          />

          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-black focus:outline-none"
          >
            {showConfirmPassword ? <FaRegEye /> : <RiEyeCloseLine />}
          </button>
        </Div>

        <SendButton
          type="submit"
        >
          Create account
        </SendButton>
        <p className="text-gray-700 mt-[50px] text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-[400]">
            Log In
          </Link>
        </p>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </Div>
  );
};

export default Signup;
