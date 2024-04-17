import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { auth } from './components/firebase/Firebase'; // Import auth from Firebase.js
import Todo from './components/todo/Todo';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { onAuthStateChanged, updateProfile, getAuth } from 'firebase/auth'; // Import necessary functions

function App() {
  const [user, setUser] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        // const displayName = authUser.displayName;
        // const isFirstLogin = displayName === null || displayName === '';
        // if (isFirstLogin) {
        //   setWelcomeMessage(`Welcome, ${authUser.email.split('@')[0]}!`);
        //   // Set user's display name in Firebase profile
        //   const userAuth = getAuth();
        //   updateProfile(userAuth.currentUser, { displayName: authUser.email.split('@')[0] })
        //     .then(() => {
        //       // Profile updated successfully
        //     })
        //     .catch((error) => {
        //       // An error occurred
        //       console.error('Error updating profile: ', error);
        //     });
        // } else {
        //   setWelcomeMessage(`Welcome back, ${displayName}!`);
        // }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home welcomeMessage={welcomeMessage} />} />
        <Route path="/todo" element={<ProtectedRoute user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ user }) {
  return user ? <Todo /> : <Navigate to="/login" replace />;
}

export default App;
