import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project-imports
import Logo from 'components/logo';
// import useAuthUser from 'hooks/useAuthUser';
import AuthWrapper from 'sections/auth/AuthWrapper';
// import AuthLogin from 'sections/auth/auth-forms/AuthLogin';
import AuthUserLogin from 'sections/auth/auth-forms/AuthUserLogin';

// ================================|| LOGIN ||================================ //

const Login = () => {
  // const { isLoggedIn } = useAuthUser();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo /> User
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Typography component={Link} to={'/customer/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Are you a customer?
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
          <AuthUserLogin forgot="/auth/forgot-password" />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
