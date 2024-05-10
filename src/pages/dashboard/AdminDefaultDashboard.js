// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';

import CollectionRate from 'sections/widget/chart/CollectionRate';
import ProjectOverview from 'sections/widget/chart/ProjectOverview';
import ProjectRelease from 'sections/dashboard/default/ProjectRelease';
import AssignUsers from 'sections/widget/statistics/AssignUsers';

import Transactions from 'sections/widget/data/Transactions';
import TotalIncome from 'sections/widget/chart/TotalIncome';

// assets
import { Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const [newDayCollection, setDayCollection] = useState('');
  const [newWeeklyCollection, setWeeklyCollection] = useState('');
  const [newMonthlyCollection, setMonthlyCollection] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newTotalDepositor, setTotalDepositor] = useState('');
  const [newtotalCustomer, settotalCustomer] = useState('');
  async function getDayCollection() {
    try {
      const dayResponse = await axios.get('/collection/dayCollectionTotal');
      const weeklyResponse = await axios.get('/collection/weeklyCollectionTotal');
      const monthlyResponse = await axios.get('/collection/monthlyRevenueTotal');
      setDayCollection(dayResponse.data.TotalDayCollection);
      setWeeklyCollection(weeklyResponse.data.TotalWeeklyCollection);
      setMonthlyCollection(monthlyResponse.data.TotalMonthlyRevenue);
      setTotalDepositor(monthlyResponse.data.totalDepositor);
      settotalCustomer(monthlyResponse.data.totalCustomer);

      setIsLoading(false); // Set loading state to false after data fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false); // Set loading state to false in case of error
    }
  }

  useEffect(() => {
    getDayCollection();
  }, []);

  useEffect(() => {}, [newDayCollection, newWeeklyCollection, newMonthlyCollection]);

  if (isLoading) {
    return (
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sm={6} lg={3}>
          <EcommerceDataCard title="Day Collections" count="loading" iconPrimary={<Wallet3 />}>
            <EcommerceDataChart color={theme.palette.primary.main} />
          </EcommerceDataCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <EcommerceDataCard
            title="Weekly Collection"
            count="loading"
            color="warning"
            iconPrimary={<Book color={theme.palette.warning.dark} />}
          >
            <EcommerceDataChart color={theme.palette.warning.dark} />
          </EcommerceDataCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <EcommerceDataCard
            title="Monthly Collection"
            count="loading"
            color="success"
            iconPrimary={<Calendar color={theme.palette.success.darker} />}
          >
            <EcommerceDataChart color={theme.palette.success.darker} />
          </EcommerceDataCard>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <EcommerceDataCard
            title="Total Depositor"
            count="loading"
            color="error"
            iconPrimary={<CloudChange color={theme.palette.error.dark} />}
          >
            <EcommerceDataChart color={theme.palette.error.dark} />
          </EcommerceDataCard>
        </Grid>

        {/* row 2 */}
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CollectionRate />
            </Grid>
            <Grid item xs={12}>
              <ProjectOverview />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Stack spacing={3}>
            <ProjectRelease />
            <AssignUsers />
          </Stack>
        </Grid>

        {/* row 3 */}
        <Grid item xs={12} md={6}>
          <Transactions />
        </Grid>
        <Grid item xs={12} md={6}>
          <TotalIncome />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard title="Day Collections" count={'Rs' + newDayCollection} iconPrimary={<Wallet3 />}>
          <EcommerceDataChart color={theme.palette.primary.main} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Weekly Collection"
          count={'Rs' + newWeeklyCollection}
          color="warning"
          iconPrimary={<Book color={theme.palette.warning.dark} />}
        >
          <EcommerceDataChart color={theme.palette.warning.dark} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Monthly Collection"
          count={'Rs' + newMonthlyCollection}
          color="success"
          iconPrimary={<Calendar color={theme.palette.success.darker} />}
        >
          <EcommerceDataChart color={theme.palette.success.darker} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Total Depositor"
          count={newTotalDepositor}
          color="error"
          iconPrimary={<CloudChange color={theme.palette.error.dark} />}
        >
          <EcommerceDataChart color={theme.palette.error.dark} />
        </EcommerceDataCard>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={8} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CollectionRate />
          </Grid>
          <Grid item xs={12}>
            <ProjectOverview />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <EcommerceDataCard
          title="Total Customer"
          count={newtotalCustomer}
          color="success"
          iconPrimary={<CloudChange color={theme.palette.success.dark} />}
        >
          <EcommerceDataChart color={theme.palette.success.dark} />
        </EcommerceDataCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={6}>
        <Transactions />
      </Grid>
      <Grid item xs={12} md={6}>
        <TotalIncome />
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
