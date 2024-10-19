import { auth, db } from '@/lib/firebase' // Adjust this import path as needed
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export const checkCurrentUserRole = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const role = userData.role || 'user'; // Default to 'user' if role is not set
            resolve(role);
          } else {
            // If the user document doesn't exist, assume a default role
            resolve('user');
          }
        } catch (error) {
          reject(new Error('Error fetching user role: ' + error.message));
        }
      } else {
        // No user is signed in
        resolve(null);
      }
    });
  });
};

