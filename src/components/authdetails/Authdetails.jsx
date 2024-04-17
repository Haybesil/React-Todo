import React, {useEffect, useState} from 'react'
import { auth } from '../firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth';

const Authdetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
           (user) ? setAuthUser(user) : setAuthUser(null); 
        })

        return () => {
            listen();
        }
    }, {})
    

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('Signed out')
        }).catch(error => console.log(error))
    }
  return (
    <div>
        ( authUser ? <p>{`Signed in as ${authUser.email}`}</p><button>Sign Out</button> : <p>Signed Out</p>)
    </div>
  )
}

export default Authdetails