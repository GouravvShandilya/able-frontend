import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, FormControl, Stack, Typography, Divider } from '@mui/material';

// third-party
import ReactToPrint from 'react-to-print';

// project-imports
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
import LogoSection from 'components/logo';

import { dispatch, useSelector } from 'store';
// import { getInvoiceSingleList } from 'store/reducers/invoiceUser';

// assets
import { Printer } from 'iconsax-react';
import { getCollectionSingleList } from 'store/reducers/collection';

// ==============================|| INVOICE - DETAILS ||============================== //

const DetailsUser = () => {
  const theme = useTheme();
  const { id } = useParams();

  const { list } = useSelector((state) => state.invoice);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCollectionSingleList(Number(id))).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  console.log(list);
  const today = new Date(`${list?.date}`).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const componentRef = useRef(null);

  if (loading) return <Loader />;

  return (
    <MainCard content={false}>
      <Stack spacing={2.5}>
        <Box sx={{ p: 2.5, pb: 0 }}>
          <MainCard content={false} border={false} sx={{ p: 1.25, bgcolor: 'secondary.lighter' }}>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <ReactToPrint
                trigger={() => (
                  <IconButton>
                    <Printer color={theme.palette.text.secondary} />
                  </IconButton>
                )}
                content={() => componentRef.current}
              />
            </Stack>
          </MainCard>
        </Box>
        <Box sx={{ p: 2.5 }} id="print" ref={componentRef}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={2}>
                    <LogoSection />
                  </Stack>
                  <Typography color="secondary">#{list?.invoice_id}</Typography>
                </Stack>
                <Box>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography variant="subtitle1">Date</Typography>
                    <Typography color="secondary">{today}</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">From:</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">{list?.cashierInfo.name}</Typography>
                    <Typography color="secondary">{list?.cashierInfo.address}</Typography>
                    <Typography color="secondary">{list?.cashierInfo.phone}</Typography>
                    <Typography color="secondary">{list?.cashierInfo.email}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MainCard>
                <Stack spacing={1}>
                  <Typography variant="h5">To:</Typography>
                  <FormControl sx={{ width: '100%' }}>
                    <Typography color="secondary">{list?.customerInfo.name}</Typography>
                    <Typography color="secondary">{list?.customerInfo.address}</Typography>
                    <Typography color="secondary">{list?.customerInfo.phone}</Typography>
                    <Typography color="secondary">{list?.customerInfo.email}</Typography>
                  </FormControl>
                </Stack>
              </MainCard>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderWidth: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}></Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1">Grand Total:</Typography>
                  <Typography variant="subtitle1">{list?.amount}</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <Typography color="secondary">Notes: </Typography>
                <Typography>{list?.notes}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </MainCard>
  );
};

export default DetailsUser;
