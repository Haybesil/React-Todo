import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './components/firebase/Firebase';
import Todo from './components/todo/Todo';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { onAuthStateChanged, updateProfile, getAuth } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    console.log('Initializing authentication state listener...');
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log('Auth state changed:', authUser);
      if (authUser) {
        setUser(authUser);
        const displayName = authUser.displayName;
        const isFirstLogin = displayName === null || displayName === '';
        if (isFirstLogin) {
          setWelcomeMessage(`Welcome, ${authUser.email.split('@')[0]}!`);
          const userAuth = getAuth();
          updateProfile(userAuth.currentUser, {
            displayName: authUser.email.split('@')[0],
          })
            .then(() => {
              console.log('Profile updated successfully!');
            })
            .catch((error) => {
              console.error('Error updating profile: ', error);
            });
        } else {
          setWelcomeMessage(`Welcome back, ${displayName}!`);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      console.log('Cleaning up authentication state listener...');
      unsubscribe();
    };
  }, []);

  console.log('User state in App:', user); // New console log

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home welcomeMessage={welcomeMessage} />} />
        <Route
          path="/todo"
          element={
            user ? (
              <Todo />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
