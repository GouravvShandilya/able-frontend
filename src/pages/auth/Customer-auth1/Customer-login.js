import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project-imports
import Logo from 'components/logo';
// import useAuthUser from 'hooks/useAuthUser';
import AuthWrapper from 'sections/auth/AuthWrapper';
// import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
// import AuthUserLogin from 'sections/auth/auth-forms/AuthUserLogin';
// import useAuthCustomer from 'hooks/useAuthCustomer';
import AuthCustomerLogin from 'sections/auth/auth-forms/AuthCustomerLogin';

// ================================|| LOGIN ||================================ //

const Login = () => {
  // const { isLoggedIn } = useAuthCustomer();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo /> Customer
        </Grid>

        <Grid item xs={12}>
          {/*  <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/user/register'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              Don&apos;t have an account?
            </Typography>
          </Stack> */}
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} to={'/user/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Are you a depositor?
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3"></Typography>
            <Typography component={Link} to={'/'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Are you a admin?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthCustomerLogin forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
