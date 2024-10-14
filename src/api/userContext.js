import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserInfo } from './apiService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        try {
          const userInfoFromBackend = await getUserInfo();
          setUserInfo({
            name: user.nombre,
            email: user.email,
            picture: userInfoFromBackend.urlFotoPerfil, 
          });
        } catch (error) {
          console.error('Error fetching user info from backend:', error);
        }
      }
    };

    fetchUserInfo();
  }, [isAuthenticated, user]);

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
};
