import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Drawer, TextField, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import SaleSubCategory from 'src/assets/img/SaleSubCategory.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Upload from 'src/assets/img/icons/upload.svg';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import useSaleOrder from 'src/hooks/useSaleOrder';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));

export default function CancelConfirm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          // height: 'inherit',
          gap: '10px',
          background: '#E6EBF0',
          margin: '20px 0px',
          borderRadius: '8px'
        }}
      >
        <Box
          sx={{ display: 'inline-flex' }}
          onClick={() => {
            // history.goBack();
            props.setSteps(0);
          }}
        >
          <ArrowRight color="#335D8A" width={'15px'} />
          <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
            بازگشت
          </InputLabel>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <InputLabel style={{ fontSize: '14px' }}>
              علت عدم تایید سفارش را وارد کنید:
            </InputLabel>

            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>توضیحات</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="...بنویسید"
                rows={4}
                multiline
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                value={comment}
                onChange={event => setComment(event.target.value)}
                // onBlur={handleBlur}
              />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'flex-end',
              // alignItems: 'flex-end',
              //   width: '50%',
              gap: 2
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              style={{ width: '150px' }}
              onClick={() => {
                //   history.push('/management/sale/products/order/1');
                props.setSteps(0);
              }}
              type={'button'}
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton
              style={{ width: '150px' }}
              disabled={comment == null}
              onClick={() => {
                httpService
                  .post(
                    `${API_BASE_URL}/api/management/order/update_order_state/`,
                    {
                      order_num: props.data.order_num,
                      order_action: 'Reject',
                      comment: comment,
                      state: 'PI'
                    }
                  )
                  .then(res => {
                    if (res.status === 200) {
                      history.push('/management/sale/received');
                    }
                  });
              }}
            >
              {'ثبت'}
            </ConfirmButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
