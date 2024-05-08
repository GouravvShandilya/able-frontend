import { useEffect, useState } from 'react';

// material-ui
import { ListItemButton, Menu, Stack, Typography } from '@mui/material';

// project-imports
// import RepeatCustomerChart from './RepeatCustomerChart';
import MonthlyCollectionChart from './MonthlyCollectionChart';
import WeeklyCollectionChart from './WeeklyCollectionChart';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import axios from '../../../utils/axios';

// assets
import { More } from 'iconsax-react';

// ==============================|| CHART - REPEAT CUSTOMER RATE ||============================== //

const RepeatCustomerRate = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [weeklyStatus, setWeeklyStatus] = useState(false);
  const [MonthlyStatus, setMonthlyStatus] = useState(true);
  const [newWeeklyCollection, setWeeklyCollection] = useState({
    date: [],
    total: []
  });
  const [newMonthlyCollection, setMonthlyCollection] = useState({
    date: [],
    total: []
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMonthly = () => {
    setAnchorEl(null);
    setMonthlyStatus(true);
    if (weeklyStatus) return setWeeklyStatus(false);
  };

  const handleCloseWeekly = () => {
    setAnchorEl(null);
    setWeeklyStatus(true);
    if (MonthlyStatus) return setMonthlyStatus(false);
  };

  async function weeklyData() {
    try {
      const weeklyData = await axios.get('/admin/weeklyEachDayCollectionTotal');
      const newWeeklyCollection = [];
      const newWeeklyCollectionDate = [];
      weeklyData.data.weeklyDayTotals.forEach(function (g) {
        newWeeklyCollection.push(g.total);
        newWeeklyCollectionDate.push(g.date);
      });
      setWeeklyCollection({
        date: newWeeklyCollectionDate,
        total: newWeeklyCollection
      });
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  }

  async function monthlyData() {
    try {
      const monthlyData = await axios.get('/admin/monthlyEachDayCollectionTotal');
      const newMonthlyCollection = [];
      const newMonthlyCollectionDate = [];
      monthlyData.data.last30DaysTotals.forEach(function (g) {
        newMonthlyCollectionDate.push(g.date);
        newMonthlyCollection.push(g.total);
      });

      setMonthlyCollection({
        date: newMonthlyCollectionDate,
        total: newMonthlyCollection
      });
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  }

  useEffect(() => {
    monthlyData();
    weeklyData();
  }, []);

  return (
    <MainCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="h5">{MonthlyStatus ? 'Monthly Collection' : 'Weekly Collection'}</Typography>
        <IconButton
          color="secondary"
          id="wallet-button"
          aria-controls={open ? 'wallet-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <More />
        </IconButton>
        <Menu
          id="wallet-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'wallet-button',
            sx: { p: 1.25, minWidth: 150 }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <ListItemButton onClick={handleCloseWeekly}>Weekly</ListItemButton>
          <ListItemButton onClick={handleCloseMonthly}>Monthly</ListItemButton>
        </Menu>
      </Stack>

      {MonthlyStatus ? (
        <MonthlyCollectionChart monthlyData={newMonthlyCollection} />
      ) : (
        <WeeklyCollectionChart weeklyData={newWeeklyCollection} />
      )}
    </MainCard>
  );
};

export default RepeatCustomerRate;
