import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { Edit2, Logout, MoneyRecive, Profile2User } from 'iconsax-react';
import { Link } from 'react-router-dom';
import JWTContext from 'contexts/JWTContext';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
  const { logout } = useContext(JWTContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function clickHandler() {
    logout();
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <Link to="apps/profiles/admin/edit">
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <Edit2 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/Depositor-list">
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <MoneyRecive variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="View Depositors" />
        </ListItemButton>
      </Link>

      <Link to="dashboard/Customer-list">
        <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemIcon>
            <Profile2User variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="View Customers" />
        </ListItemButton>
      </Link>

      <ListItemButton selected={selectedIndex === 3} onClick={handleLogout}>
        <ListItemIcon>
          <Logout onClick={clickHandler} variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
