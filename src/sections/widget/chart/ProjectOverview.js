import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Button, Dialog, useTheme } from '@mui/material';
import { Grid, Stack, Typography } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';

import { ThemeMode } from 'config';

// assets
import { Add } from 'iconsax-react';
import AddDepositor from 'sections/apps/customer/AddDepositor';
import { PopupTransition } from 'components/@extended/Transitions';
// ==============================|| CHART ||============================== //

const TaskStatusChart = ({ color, data }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // chart options
  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      type: 'area',
      stacked: true,
      sparkline: {
        enabled: true
      },
      offsetX: -20
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0
      }
    },
    stroke: { curve: 'smooth', width: 2 },
    tooltip: {
      x: {
        show: false
      }
    },
    grid: {
      show: false
    }
  };
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [color],
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      }
    }));
  }, [color, mode, primary, secondary, line, theme]);

  const [series] = useState([{ name: 'Orders', data }]);

  return <ReactApexChart options={options} series={series} type="area" height={60} />;
};

TaskStatusChart.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string
};

// ==============================|| CHART - PROJECT OVERVIEW ||============================== //

const ProjectOverview = () => {
  const theme = useTheme();
  const [customer, setCustomer] = useState(null);
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
    if (customer && !add) setCustomer(null);
  };

  return (
    <>
      <MainCard>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Typography variant="h5">Users</Typography>
        </Stack>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={6}>
                <Stack spacing={0.25}>
                  <Typography color="text.secondary">Money Depositor</Typography>
                  <Typography variant="h5">34,686</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <TaskStatusChart color={theme.palette.primary.main} data={[5, 25, 3, 10, 4, 50, 0]} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Stack spacing={0.25}>
                  <Typography color="text.secondary">Pending Depositor</Typography>
                  <Typography variant="h5">3,6786</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <TaskStatusChart color={theme.palette.error.main} data={[0, 50, 4, 10, 3, 25, 5]} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant="contained" startIcon={<Add />} onClick={handleAdd} size="large">
              Add Depositor
            </Button>
          </Grid>
        </Grid>
      </MainCard>

      <Dialog
        maxWidth="sm"
        fullWidth
        TransitionComponent={PopupTransition}
        onClose={handleAdd}
        open={add}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddDepositor customer={customer} onCancel={handleAdd} />
      </Dialog>
    </>
  );
};

export default ProjectOverview;
