// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/widget/chart/EcommerceDataChart';

import ProjectOverview from 'sections/widget/chart/ProjectOverview';

import Transactions from 'sections/widget/data/Transactions';
import TotalIncome from 'sections/widget/chart/TotalIncome';

// assets
import { Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';
import axiosServices from 'utils/axios';
import { useEffect, useState } from 'react';
import CollectionRateUser from 'sections/widget/chart/CollectionRateUser';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const theme = useTheme();
  const [newTotalCollection, setTotalCollection] = useState('');
  const [newTotalMonthlyCollection, setTotalMonthlyCollection] = useState('');
  const [newTotalweeklyCollection, setTotalweeklyCollection] = useState('');
  const [newTotalInvoices, setTotalInvoices] = useState('');
  const [newTotalCollectionAmount, setTotalCollectionAmount] = useState('');

  async function gg() {
    const gg = await axiosServices.get('/collection/getmonthlyUserRevenueTotal');
    const fd = await axiosServices.get('/collection/getWeeklyUserRevenueTotal');
    const bf = await axiosServices.get('/collection/getdailyUserRevenueTotal');
    const bgbg = await axiosServices.get('/collection/getDailyUserCollections');

    setTotalCollection(bf.data.TotalDailyUserRevenue);
    setTotalMonthlyCollection(gg.data.TotalMonthlyUserRevenue);
    setTotalweeklyCollection(fd.data.TotalWeeklyUserRevenue);
    setTotalInvoices(bgbg.data.totalCollections);
    setTotalCollectionAmount(bgbg.data.totalAmount);
  }

  useEffect(() => {
    gg();
  }, []);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Monthly Deposits"
          count={'Rs' + newTotalMonthlyCollection}
          color="success"
          iconPrimary={<Calendar color={theme.palette.success.darker} />}
        >
          <EcommerceDataChart color={theme.palette.success.darker} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Weekly Deposits"
          count={'Rs' + newTotalweeklyCollection}
          color="warning"
          iconPrimary={<Book color={theme.palette.warning.dark} />}
        >
          <EcommerceDataChart color={theme.palette.warning.dark} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard title="Day Deposits" count={'Rs' + newTotalCollection} iconPrimary={<Wallet3 />}>
          <EcommerceDataChart color={theme.palette.primary.main} />
        </EcommerceDataCard>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Total Collection Amount"
          count={newTotalCollectionAmount}
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
            <CollectionRateUser />
          </Grid>
          <Grid item xs={12}>
            <ProjectOverview />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Total Collection Made"
          count={newTotalInvoices}
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
