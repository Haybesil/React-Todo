import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Authdetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });

        return () => {
            listen();
        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Signed out');
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="flex items-center">
            {authUser ? (
                <>
                <div className='flex justify-center max-w-md mx-auto mt-8 p-6 items-center py-[4rem]'>
                    <p className="text-[15px] sm:text-[23px] font-[400] mr-4">{`Signed in as ${authUser.email}`}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={userSignOut}
                    >
                        Sign Out
                    </button>
                    </div>
                </>
            ) : (
                <p className='text-[15px] py-2 px-5'>Signed Out</p>
            )}
        </div>
    );
};

export default Authdetails;
