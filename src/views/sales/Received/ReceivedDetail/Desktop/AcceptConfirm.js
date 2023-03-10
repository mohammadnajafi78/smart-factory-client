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
import useSaleSearch from 'src/hooks/useSaleSearch';
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

export default function AcceptConfirm(props) {
  const [file, setFile] = useState();
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
          height: '50vh',
          overflow: 'auto'
          // margin: '20px 0px'
          // borderRadius: '8px'
        }}
      >
        <Box
          sx={{ display: 'inline-flex' }}
          onClick={() => {
            // history.goBack();
            // props.setSteps(0);
            props.setAcceptConfirm(false);
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
              پیش‌فاکتور سفارش دریافتی خود را بارگذاری کنید:
            </InputLabel>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 0px',
                gap: '30px',
                width: '100%',
                height: '110px',
                border: '2px dashed #99DDE1',
                borderRadius: '4px',
                color: '#4F4C4D',
                fontFamily: 'IRANSans',
                fontWeight: 400,
                fontSize: '16px',
                background: 'white'
              }}
              component="label"
              onChange={event => {
                setFile(event.target.files[0]);
              }}
            >
              <img src={Upload} with="33px" height="28px" />
              {'انتخاب فایل'}
              <input type="file" hidden multiple={false} />
            </Button>
            {/* <Box sx={{ mt: 1, mb: 1, width: '50%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>تاریخ صدور</InputLabel>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  id="birth_date"
                  value={date}
                  onChange={newValue => {
                    setDate(newValue);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      sx={{
                        background: '#F2F2F2',
                        margin: '3px'
                      }}
                      fullWidth
                      //   error={Boolean(touched.birth_date && errors.birth_date)}
                      //   helperText={touched.birth_date && errors.birth_date}
                    />
                  )}
                />
              </LocalizationProvider>
            </Box> */}
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>توضیحات</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="...بنویسید"
                rows={2}
                multiline
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                value={comment}
                onChange={event => setComment(event.target.value)}
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
              gap: 2
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => {
                props.setSteps(0);
              }}
              style={{ width: '150px' }}
              type={'button'}
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton
              style={{ width: '150px' }}
              onClick={() => {
                const formData = new FormData();
                formData.append('order_num', props.data.order_num);
                formData.append('order_action', 'Approve');
                formData.append('state', 'PI');
                formData.append('comment', comment);
                formData.append('PI', file);

                httpService
                  .post(
                    `${API_BASE_URL}/api/orders/update_order_state/`,
                    formData
                  )
                  .then(res => {
                    if (res.status === 200) {
                      history.push('/sale/received');
                    }
                  });
              }}
            >
              {'ثبت پیش فاکتور'}
            </ConfirmButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}