import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party

import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

// project-imports
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
// import InvoiceItem from 'sections/apps/invoice/InvoiceItem';
import InvoiceModal from 'sections/apps/invoice/InvoiceModal';
import AddressModal from 'sections/apps/invoice/AddressModal';

import { reviewInvoicePopup, customerPopup, selectCountry } from 'store/reducers/invoice';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { Add } from 'iconsax-react';
import { getCollectionSingleList, getCollectionUpdate } from 'store/reducers/collection';

const validationSchema = yup.object({
  date: yup.date().required('Invoice date is required'),
  customerInfo: yup
    .object({
      name: yup.string().required('Invoice receiver information is required')
    })
    .required('Invoice receiver information is required'),

  amount: yup
    .number()
    .typeError('amount must specify a numeric value.')
    // @ts-ignore
    .test('rate', 'Please enter a valid amount value', (number) => /^\d+(\.\d{1,2})?$/.test(number))
});

// ==============================|| INVOICE - EDIT ||============================== //

const Create = () => {
  useTheme();
  const { id } = useParams();
  const navigation = useNavigate();

  const [loading, setLoading] = useState(true);
  const { isCustomerOpen, countries, country, isOpen, list } = useSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(getCollectionSingleList(Number(id))).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const invoiceSingleList = {
    name: '',
    address: '',
    phone: '',
    email: ''
  };

  const notesLimit = 500;

  const handlerEdit = (values) => {
    const NewList = {
      invoice_id: values.invoice_id,
      date: format(new Date(values.date), 'MM/dd/yyyy'),
      cashierInfo: {
        name: values.cashierInfo?.name,
        address: values.cashierInfo?.address,
        phone: values.cashierInfo?.phone,
        email: values.cashierInfo?.email
      },
      customerInfo: {
        name: values.customerInfo?.name,
        address: values.customerInfo?.address,
        phone: values.customerInfo?.phone,
        email: values.customerInfo?.email
      },
      amount: values?.amount,
      notes: values.notes
    };

    // const NewList  = {
    //   id: Number(list?.id),
    //   invoice_id: Number(values.invoice_id),
    //   customer_name: values.cashierInfo?.name,
    //   email: values.cashierInfo?.email,
    //   avatar: Number(list?.avatar),
    //   discount: Number(values.discount),
    //   tax: Number(values.tax),
    //   date: format(new Date(values.date), 'MM/dd/yyyy'),
    //   due_date: format(new Date(values.due_date), 'MM/dd/yyyy'),
    //   quantity: Number(
    //     values.invoice_detail?.reduce((sum, i) => {
    //       return sum + i.qty;
    //     }, 0)
    //   ),
    //   status: values.status,
    //   cashierInfo: values.cashierInfo,
    //   customerInfo: values.customerInfo,
    //   invoice_detail: values.invoice_detail,
    //   notes: values.notes
    // };

    dispatch(getCollectionUpdate(NewList)).then(() => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Invoice Updated successfully',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      navigation('/apps/invoice/list');
    });
  };

  const addNextInvoiceHandler = () => {
    dispatch(
      reviewInvoicePopup({
        isOpen: false
      })
    );
  };

  if (loading) return <Loader />;

  return (
    <MainCard>
      <Formik
        enableReinitialize={true}
        initialValues={{
          invoice_id: list?.invoice_id || '',
          date: new Date(list?.date) || null,
          cashierInfo: list?.cashierInfo || invoiceSingleList,
          customerInfo: list?.customerInfo || invoiceSingleList,
          amount: list?.amount || 0,
          notes: list?.notes || ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handlerEdit(values);
        }}
      >
        {({ errors, handleChange, handleSubmit, values, isValid, setFieldValue, touched }) => {
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
                            Change
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
                    <Grid item xs={12} md={8}></Grid>
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
                              placeholder="00"
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
                            <Typography variant="subtitle1">{values?.amount}</Typography>
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
                      disabled={!isValid}
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
                    <Button color="primary" variant="contained" type="submit">
                      Update & Send
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

export default Create;
