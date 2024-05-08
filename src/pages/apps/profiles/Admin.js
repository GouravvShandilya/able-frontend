import { useRef } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';

// project-imports
// import ProfileCard from 'sections/apps/profiles/user/ProfileCard';
// import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';
import AdminProfileTabs from 'sections/apps/profiles/user/AdminProfileTabs';

// ==============================|| PROFILE - USER ||============================== //

const AdminProfile = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <AdminProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet context={inputRef} />
      </Grid>
    </Grid>
  );
};

export default AdminProfile;
