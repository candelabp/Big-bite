import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar el contexto
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.rol);
      setLoading(false);
    } else {
      // Verificar el estado de autenticación de Firebase
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          const userDoc = await getDoc(doc(db, `usuarios/${user.uid}`));
          if (userDoc.exists()) {
            setRole(userDoc.data().rol);
          }
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [auth, db]);

  return (
    <UserContext.Provider value={{ user, role, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};