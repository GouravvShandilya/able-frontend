import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports

import useAuthCustomer from 'hooks/useAuthCustomer';

// ==============================|| GUEST GUARD ||============================== //

const CustomerGuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuthCustomer();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/customer/dashboard/default');
      // navigate(location?.state?.from ? location?.state?.from : APP_DEFAULT_PATH, {
      //   state: {
      //     from: ''
      //   },
      //   replace: true
      // });
    }
  }, [isLoggedIn, navigate, location]);

  return children;
};

CustomerGuestGuard.propTypes = {
  children: PropTypes.node
};

export default CustomerGuestGuard;
