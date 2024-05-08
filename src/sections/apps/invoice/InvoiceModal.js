import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Chip, Dialog, FormControl, Grid, Stack, Typography } from '@mui/material';

// third-party
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';

// project-imports
import Logo from 'components/logo';
import ExportPDFView from './export-pdf';

// assets
import { DocumentDownload } from 'iconsax-react';

// ==============================|| INVOICE - PREVIEW ||============================== //

const InvoiceModal = ({ isOpen, setIsOpen, invoiceInfo, onAddNextInvoice }) => {
  useTheme();
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  let date;
  try {
    date = format(new Date(invoiceInfo.date), 'dd/mm/yyyy');
  } catch (error) {
    date = '';
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': { p: 0, minWidth: { xl: 1200, sm: 'calc(100% - 20%)' } },
        '& .MuiBackdrop-root': { opacity: '0.5 !important' }
      }}
    >
      <Box sx={{ pb: 2.5 }}>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span aria-hidden="true">&#8203;</span>
        <Box id="print" sx={{ p: 2.5 }}>
          <Box sx={{ pb: 2.5 }}>
            <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' } }} justifyContent="space-between">
              <Box sx={{ pt: 2.5 }}>
                <Stack direction="row" spacing={2}>
                  <Logo /> <Chip label="Paid" variant="light" color="success" />
                </Stack>
                <Typography color="secondary">{invoiceInfo.invoice_id}</Typography>
              </Box>
              <Box sx={{ pt: 2.5, pb: 1.75 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ pl: 4 }} variant="subtitle1">
                    Date{' '}
                  </Typography>
                  <Typography>{date}</Typography>
                </Stack>
              </Box>
            </Stack>
            <Box sx={{ pt: 2.5 }}>
              <Grid container spacing={2} justifyContent="space-between" direction="row">
                <Grid item xs={12} sm={6}>
                  <Box sx={{ border: 1, minHeight: 168, borderColor: 'secondary.200', borderRadius: 0.5, p: 2.5 }}>
                    <Grid container direction="row">
                      <Grid item md={8}>
                        <Typography variant="h5">From:</Typography>
                        <FormControl sx={{ width: '100%' }}>
                          <Typography variant="subtitle1">{invoiceInfo.cashierInfo.name}</Typography>
                          <Typography color="secondary">{invoiceInfo.cashierInfo.address}</Typography>
                          <Typography color="secondary">{invoiceInfo.cashierInfo.phone}</Typography>
                          <Typography color="secondary">{invoiceInfo.cashierInfo.email}</Typography>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ border: 1, minHeight: 168, borderColor: 'secondary.200', borderRadius: 0.5, p: 2.5 }}>
                    <Grid container direction="row">
                      <Grid item md={8}>
                        <Typography variant="h5">To:</Typography>
                        <FormControl sx={{ width: '100%' }}>
                          <Typography variant="subtitle1">{invoiceInfo.customerInfo.name}</Typography>
                          <Typography color="secondary">{invoiceInfo.customerInfo.address}</Typography>
                          <Typography color="secondary">{invoiceInfo.customerInfo.phone}</Typography>
                          <Typography color="secondary">{invoiceInfo.customerInfo.email}</Typography>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ p: 2.5 }}>
            <Grid container direction="row" justifyContent="flex-end">
              <Grid item md={4}></Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Typography>Notes: {invoiceInfo.notes}</Typography>
        </Box>
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ p: 2.5 }}>
          <Button color="secondary" onClick={addNextInvoiceHandler}>
            Cancel
          </Button>
          <PDFDownloadLink
            document={<ExportPDFView list={invoiceInfo} />}
            fileName={`${invoiceInfo?.invoiceId || invoiceInfo?.invoice_id}-${
              invoiceInfo?.customer_name || invoiceInfo?.from?.name || invoiceInfo?.customerInfo?.name
            }.pdf`}
            style={{ textDecoration: 'none' }}
          >
            <Button startIcon={<DocumentDownload />} variant="contained" color="primary">
              Download
            </Button>
          </PDFDownloadLink>
        </Stack>
      </Box>
    </Dialog>
  );
};

InvoiceModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  invoiceInfo: PropTypes.object,
  items: PropTypes.array,
  onAddNextInvoice: PropTypes.func
};

export default InvoiceModal;
