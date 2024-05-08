import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Autocomplete, Box, Button, FormControl, FormHelperText, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useLocation } from 'react-router';
// third-party
import * as yup from 'yup';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';

// project-imports
import MainCard from 'components/MainCard';
// import InvoiceItem from 'sections/apps/invoice/InvoiceItem';
import AddressModal from 'sections/apps/invoice/AddressModal';
import InvoiceModal from 'sections/apps/invoice/InvoiceModal';

import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { customerPopup, selectCountry, reviewInvoicePopup } from 'store/reducers/invoice';

// assets
import { Add } from 'iconsax-react';
import axiosServices from 'utils/axios';
import { useEffect, useState } from 'react';
import { getcollectionInsert, getcollectionList } from 'store/reducers/collection';

const validationSchema = yup.object({
  date: yup.date().required('Invoice date is required'),
  customerInfo: yup
    .object({
      name: yup.string().required('Invoice receiver information is required')
    })
    .required('Invoice receiver information is required'),
  amount: yup
    .number()
    .typeError('Discount must specify a numeric value.')
    // @ts-ignore
    .test('rate', 'Please enter a valid discount value', (number) => /^\d+(\.\d{1,2})?$/.test(number))
});

// ==============================|| INVOICE - CREATE ||============================== //

const CreateUserInvoice = () => {
  useTheme();
  const navigation = useNavigate();
  const notesLimit = 500;
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const { isCustomerOpen, countries, country, isOpen } = useSelector((state) => state.invoice);
  const pathName = useLocation().pathname;

  const handlerCreate = async (values) => {
    const NewList = {
      invoice_id: Number(values.invoice_id),
      customer_name: values.cashierInfo?.name,
      email: values.cashierInfo?.email,
      date: format(values.date, 'MM/dd/yyyy'),
      cashierInfo: values.cashierInfo,
      customerInfo: values.customerInfo,
      amount: values.amount,
      notes: values.notes
    };

    dispatch(getcollectionList()).then(() => {
      dispatch(getcollectionInsert(NewList)).then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Invoice Added successfully',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        navigation('/user/apps/invoice/list');
      });
    });
  };

  const addNextInvoiceHandler = () => {
    dispatch(
      reviewInvoicePopup({
        isOpen: false
      })
    );
  };

  async function getcurrentUserData() {
    try {
      const data = await axiosServices.get('/user/currentUser');
      setCurrentAdmin(data.data.user);
    } catch (error) {
      console.error('Error fetching current user data:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }
  useEffect(() => {
    getcurrentUserData();
  }, [pathName]);

  if (loading) {
    return <div></div>; // Render a loading indicator until currentAdmin is fetched
  }
  return (
    <MainCard>
      <Formik
        initialValues={{
          id: 120,
          invoice_id: Date.now(),

          date: new Date(),

          cashierInfo: {
            name: currentAdmin.full_name,
            address: currentAdmin.Address,
            phone: currentAdmin.mobile_number,
            email: currentAdmin.email
          },
          customerInfo: {
            address: '',
            email: '',
            name: '',
            phone: ''
          },
          amount: '0',
          notes: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handlerCreate(values);
        }}
      >
        {({ errors, handleChange, handleSubmit, values, isValid, setFieldValue, touched }) => {
          const Amount = values.amount;
          return (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Invoice Id</InputLabel>
                    <FormControl sx={{ width: '100%' }}>
                      <TextField
                        required
                        disabled
                        type="number"
                        name="invoice_id"
                        id="invoice_id"
                        value={values.invoice_id}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1}>
                    <InputLabel>Date</InputLabel>
                    <FormControl sx={{ width: '100%' }} error={Boolean(touched.date && errors.date)}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker format="dd/MM/yyyy" value={values.date} onChange={(newValue) => setFieldValue('date', newValue)} />
                      </LocalizationProvider>
                    </FormControl>
                  </Stack>
                  {touched.date && errors.date && <FormHelperText error={true}>{errors.date}</FormHelperText>}
                </Grid>
                <Grid item xs={12} sm={6} md={3}></Grid>

                <Grid item xs={12} sm={6}>
                  <MainCard sx={{ minHeight: 168 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Stack spacing={2}>
                          <Typography variant="h5">From:</Typography>
                          <Stack sx={{ width: '100%' }}>
                            <Typography variant="subtitle1">{values?.cashierInfo?.name}</Typography>
                            <Typography color="secondary">{values?.cashierInfo?.address}</Typography>
                            <Typography color="secondary">{values?.cashierInfo?.phone}</Typography>
                            <Typography color="secondary">{values?.cashierInfo?.email}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}></Grid>
                    </Grid>
                  </MainCard>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MainCard sx={{ minHeight: 168 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={8}>
                        <Stack spacing={2}>
                          <Typography variant="h5">To:</Typography>
                          <Stack sx={{ width: '100%' }}>
                            <Typography variant="subtitle1">{values?.customerInfo?.name}</Typography>
                            <Typography color="secondary">{values?.customerInfo?.address}</Typography>
                            <Typography color="secondary">{values?.customerInfo?.phone}</Typography>
                            <Typography color="secondary">{values?.customerInfo?.email}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box textAlign="right" color="secondary.200">
                          <Button
                            size="small"
                            startIcon={<Add />}
                            color="secondary"
                            variant="outlined"
                            onClick={() =>
                              dispatch(
                                customerPopup({
                                  isCustomerOpen: true
                                })
                              )
                            }
                          >
                            Add
                          </Button>
                          <AddressModal
                            open={isCustomerOpen}
                            setOpen={(value) =>
                              dispatch(
                                customerPopup({
                                  isCustomerOpen: value
                                })
                              )
                            }
                            handlerAddress={(value) => setFieldValue('customerInfo', value)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </MainCard>
                  {touched.customerInfo && errors.customerInfo && (
                    <FormHelperText error={true}>{errors?.customerInfo?.name}</FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                      <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}></Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Grid container justifyContent="space-between" spacing={2} sx={{ pt: 2.5, pb: 2.5 }}>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <InputLabel>amount</InputLabel>
                            <TextField
                              type="number"
                              style={{ width: '100%' }}
                              name="amount"
                              id="amount"
                              placeholder="0.0"
                              value={values.amount}
                              onChange={handleChange}
                            />
                            {touched.amount && errors.amount && <FormHelperText error={true}>{errors.amount}</FormHelperText>}
                          </Stack>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={2}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle1">Grand Total:</Typography>
                            <Typography variant="subtitle1"> {Amount}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>Notes</InputLabel>
                    <TextField
                      placeholder="Address"
                      rows={3}
                      value={values.notes}
                      multiline
                      name="notes"
                      onChange={handleChange}
                      inputProps={{
                        maxLength: notesLimit
                      }}
                      helperText={`${values.notes.length} / ${notesLimit}`}
                      sx={{
                        width: '100%',
                        '& .MuiFormHelperText-root': {
                          mr: 0,
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>Set Currency*</InputLabel>
                    <FormControl sx={{ width: { xs: '100%', sm: 250 } }}>
                      <Autocomplete
                        id="country-select-demo"
                        fullWidth
                        options={countries}
                        defaultValue={countries[2]}
                        value={countries.find((option) => option.code === country?.code)}
                        onChange={(event, value) => {
                          dispatch(
                            selectCountry({
                              country: value
                            })
                          );
                        }}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.code && (
                              <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""
                              />
                            )}
                            {option.label}
                          </Box>
                        )}
                        renderInput={(params) => {
                          const selected = countries.find((option) => option.code === country?.code);
                          return (
                            <TextField
                              {...params}
                              name="phoneCode"
                              placeholder="Select"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    {selected && selected.code !== '' && (
                                      <img
                                        style={{ marginRight: 6 }}
                                        loading="lazy"
                                        width="20"
                                        src={`https://flagcdn.com/w20/${selected.code.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${selected.code.toLowerCase()}.png 2x`}
                                        alt=""
                                      />
                                    )}
                                  </>
                                )
                              }}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password' // disable autocomplete and autofill
                              }}
                            />
                          );
                        }}
                      />
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2} sx={{ height: '100%' }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      disabled={values.status === '' || !isValid}
                      sx={{ color: 'secondary.dark' }}
                      onClick={() =>
                        dispatch(
                          reviewInvoicePopup({
                            isOpen: true
                          })
                        )
                      }
                    >
                      Preview
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ color: 'secondary.dark' }}>
                      Save
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      Create & Send
                    </Button>
                    <InvoiceModal
                      isOpen={isOpen}
                      setIsOpen={(value) =>
                        dispatch(
                          reviewInvoicePopup({
                            isOpen: value
                          })
                        )
                      }
                      key={values.invoice_id}
                      invoiceInfo={{
                        ...values
                      }}
                      items={values?.invoice_detail}
                      onAddNextInvoice={addNextInvoiceHandler}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </MainCard>
  );
};

export default CreateUserInvoice;
