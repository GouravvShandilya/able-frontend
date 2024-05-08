import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
// import useAuth from 'hooks/useAuth';
import useAuthUser from 'hooks/useAuthUser';

// ==============================|| AUTH GUARD ||============================== //

const UserAuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        '/user/login'
        // ,
        //  {
        //   state: {
        //     from: location.pathname
        //   },
        //   replace: true
        // }
      );
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

UserAuthGuard.propTypes = {
  children: PropTypes.node
};

export default UserAuthGuard;
