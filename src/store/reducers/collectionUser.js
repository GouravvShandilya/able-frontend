// project-imports
import axios from 'utils/axios';
import { dispatch } from 'store';

// third-party
import { createSlice } from '@reduxjs/toolkit';

const countries = [
  { code: 'US', label: 'United States Dollar', currency: 'Dollar', prefix: '$' },
  { code: 'GB', label: 'United Kingdom Pound', currency: 'Pound', prefix: '£' },
  { code: 'IN', label: 'India Rupee', currency: 'Rupee', prefix: '₹' },
  { code: 'JP', label: 'Japan Yun', currency: 'Yun', prefix: '¥' }
];

const initialState = {
  isOpen: false,
  isCustomerOpen: false,
  open: false,
  country: countries[2],
  countries: countries,
  lists: [],
  list: null,
  error: null,
  alertPopup: false
};

// ==============================|| SLICE - INVOICE ||============================== //

const invoice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    // review invoice popup
    reviewInvoicePopup(state, action) {
      state.isOpen = action.payload.isOpen;
    },

    // is customer open
    customerPopup(state, action) {
      state.isCustomerOpen = action.payload.isCustomerOpen;
    },

    // handler customer form popup
    toggleCustomerPopup(state, action) {
      state.open = action.payload.open;
    },

    // handler customer form popup
    selectCountry(state, action) {
      state.country = action.payload.country;
    },

    hasError(state, action) {
      state.error = action.payload.error;
    },

    // get all invoice list
    getLists(state, action) {
      state.lists = action.payload;
    },

    // get invoice details
    getSingleList(state, action) {
      state.list = action.payload;
    },

    // create invoice
    createInvoice(state, action) {
      state.lists = [...state.lists, action.payload];
    },

    // update invoice
    UpdateInvoice(state, action) {
      const list = action.payload;
      const InvoiceUpdate = state.lists.map((item) => {
        if (item.id === list.id) {
          return list;
        }
        return item;
      });
      state.lists = InvoiceUpdate;
    },

    // delete invoice
    deleteInvoice(state, action) {
      const { invoiceId } = action.payload;
      const deleteInvoice = state.lists.filter((list) => list.id !== invoiceId);
      state.lists = deleteInvoice;
    },

    //alert popup
    alertPopupToggle(state, action) {
      state.alertPopup = action.payload.alertToggle;
    }
  }
});

export default invoice.reducer;

export const { reviewInvoicePopup, customerPopup, toggleCustomerPopup, selectCountry, getLists, alertPopupToggle } = invoice.actions;

export function getcollectionList() {
  return async () => {
    try {
      const response = await axios.get('/collection/collectionsOfUser');

      dispatch(invoice.actions.getLists(response.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}



export function getcollectionInsert(NewLists) {
  return async () => {
    try {
      const response = await axios.post('/collection/createCollection', NewLists);
      dispatch(invoice.actions.createInvoice(response.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}

export function getCollectionUpdate(NewLists) {
  return async () => {
    try {
      const response = await axios.put(`/collection/collections/${NewLists.invoice_id}`, NewLists);
      dispatch(invoice.actions.UpdateInvoice(response.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}

export function getCollectionDelete(invoiceId) {
  return async () => {
    try {
      await axios.delete(`/collection/collections/${invoiceId}`);
      dispatch(invoice.actions.deleteInvoice({ invoiceId }));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}

export function getCollectionSingleList(collectionId) {
  return async () => {
    try {
      const response = await axios.get(`/collection/collections/${collectionId}`);
      dispatch(invoice.actions.getSingleList(response.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}

export function getCustomerCollectionList() {
  return async () => {
    try {
      const response = await axios.get('/collection/getCustomerCollection');

      dispatch(invoice.actions.getLists(response.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}




export function getEditReqList() {
  return async () => {
    try {
      const response = await axios.get('/editRequest/getEditReqList');

      console.log(response.data);
      dispatch(invoice.actions.getLists(response.data.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}

export function getEditReqListAdmin() {
  return async () => {
    try {
      const response = await axios.get('/editRequest/getEditReqListAdmin');

      console.log(response.data);
      dispatch(invoice.actions.getLists(response.data.data));
    } catch (error) {
      dispatch(invoice.actions.hasError(error));
    }
  };
}