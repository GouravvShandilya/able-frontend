import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports

import useAuthCustomer from 'hooks/useAuthCustomer';

// ==============================|| AUTH GUARD ||============================== //

const CustomerAuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuthCustomer();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(
        '/customer/login'
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

CustomerAuthGuard.propTypes = {
  children: PropTypes.node
};

export default CustomerAuthGuard;
