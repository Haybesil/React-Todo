import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const [pendingDeletionPromises, setPendingDeletionPromises] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
            if (!user) {
                // Clear pending deletion promises when user signs out
                setPendingDeletionPromises([]);
            }
        }, (error) => {
            console.error('Error listening to auth state changes:', error);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        try {
            // Wait for all pending deletion promises to complete
            await Promise.all(pendingDeletionPromises);

            // Now logout the user
            await auth.signOut();
            console.log('Signed out successfully');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <div className="flex items-center">
            {authUser ? (
                <div className='flex justify-center max-w-md mx-auto mt-8 p-6 items-center py-[4rem]'>
                    <p className="text-[15px] sm:text-[23px] font-[400] mr-4">{`Signed in as ${authUser.email}`}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <p className='text-[15px] text-red-600 py-2 font-[500] px-5'>Signed Out</p>
            )}
        </div>
    );
};

export default AuthDetails;



