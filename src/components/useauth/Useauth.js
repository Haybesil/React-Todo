import { useState, useEffect } from 'react';
import { auth } from '../firebase/Firebase'; // Import your Firebase authentication module
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {setCurrentUser(user)
    })

    return () => unsubscribe();
  }, []);

  return { currentUser };
};

export default useAuth;
