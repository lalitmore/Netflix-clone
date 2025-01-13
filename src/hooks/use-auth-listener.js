import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuthListener() {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(firebase);
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, []);

  return { user };
}

{/*import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuthListener() {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage only once
    const storedUser = localStorage.getItem('authUser');
    
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { firebaseApp } = useContext(FirebaseContext);

  useEffect(() => {
    if (!firebaseApp) return;

    const auth = getAuth(firebaseApp); // Get the Auth instance
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    console.log('Auth User: ', authUser);
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [firebaseApp]);

  return { user };
}
*/}


{/*import { useState, useEffect, useContext} from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('authUser'))
    );
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) =>{
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, []);

    return { user };
    
}*/}