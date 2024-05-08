import { useContext } from 'react';

// auth provider
import AuthContext from 'contexts/JWTContextCustomer';
// import AuthContext from 'contexts/FirebaseContext';
// import AuthContext from 'contexts/AWSCognitoContext';
// import AuthContext from 'contexts/Auth0Context';

// ==============================|| HOOKS - AUTH ||============================== //

const useAuthCustomer = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useAuthCustomer;
