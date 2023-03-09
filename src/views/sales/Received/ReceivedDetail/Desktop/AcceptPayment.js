import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Drawer,
  TextField,
  Button,
  Autocomplete
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import CreditCard from 'src/assets/img/credit-card.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight, ChevronLeft, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Upload from 'src/assets/img/icons/upload.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function AcceptPayment(props) {
  const [file, setFile] = useState();
  const [payment, setPayment] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/orders/payment/get_order_payments/?order_num=${props.data.order_num}`
      )
      .then(res => {
        if (res.status === 200) {
          setPayment(res.data);
        }
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 20px',
          justifyContent: 'space-between',
          height: '43vh',
          gap: '10px',
          width: '100%',
          overflow: 'auto'
        }}
      >
        <Box>
          <Box
            sx={{ display: 'inline-flex' }}
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowRight color="#335D8A" width={'15px'} />
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              بازگشت
            </InputLabel>
          </Box>
          {payment !== null && (
            <Box>
              <Box sx={{ paddingBottom: '100px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'column'
                  }}
                >
                  <InputLabel style={{ fontSize: '14px' }}>
                    اطلاعات واریزی شما:
                  </InputLabel>
                  {payment.map((item, key) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          gap: '20px',
                          // background: '#E6EBF0',
                          background: 'white',
                          borderRadius: '8px'
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              padding: '0px',
                              gap: '3px',
                              // width: '95px',
                              // height: '51px',
                              borderRadius: '8px'
                            }}
                          >
                            <Box sx={{ display: 'inline-flex' }}>
                              <InputLabel
                                style={{
                                  fontStyle: 'normal',
                                  fontWeight: 700,
                                  fontSize: '18px',
                                  lineHeight: '28px',
                                  textAlign: 'right',
                                  color: '#00346D',
                                  marginBottom: '10px'
                                }}
                              >
                                {item.payment_amount}
                              </InputLabel>
                              <InputLabel
                                style={{
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '20px',
                                  textAlign: 'right',
                                  color: '#6685A7'
                                }}
                              >
                                {'ریال'}
                              </InputLabel>
                            </Box>
                          </Box>
                          <InputLabel
                            style={{
                              fontStyle: 'normal',
                              fontWeight: 400,
                              fontSize: '14px',
                              lineHeight: '20px',
                              textAlign: 'right',
                              color: '#335D8A'
                            }}
                          >
                            {item.payment_type.label}
                          </InputLabel>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '3px 4px !important',
                              background:
                                item.payment_state.name === 'APPROVED'
                                  ? '#CCEEF0'
                                  : item.payment_state.name === 'INITIAL'
                                  ? '#FFFFFF'
                                  : '#FEEEEC',
                              borderRadius: '4px',
                              // color: '#00AAB5',
                              width: '100px',
                              mb: 1
                            }}
                          >
                            <InputLabel
                              style={{
                                color:
                                  item?.payment_state.name === 'APPROVED'
                                    ? '#00AAB5'
                                    : item.payment_state.name === 'INITIAL'
                                    ? '#00346D'
                                    : '#F14950',
                                fontSize: '12px',
                                textAlign: 'center',
                                padding: 0
                              }}
                            >
                              {item?.payment_state.label}
                            </InputLabel>
                          </Box>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              color: '#335D8A'
                            }}
                            onClick={() => {
                              httpService
                                .get(
                                  `${API_BASE_URL}/api/orders/payment/get_payment?payment_num=${item.payment_num}`
                                )
                                .then(res => {
                                  if (res.status === 200) {
                                    // history.push({
                                    //   pathname: '/sale/received/payment/add',
                                    //   state: item
                                    // });
                                    props.setPayment(false);
                                    props.setAddPayment(true);
                                    props.setSelected(item);
                                  }
                                });
                            }}
                          >
                            <InputLabel
                              style={{
                                color: '#335D8A',
                                padding: 0,
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              مشاهده و تایید
                            </InputLabel>
                            <ChevronLeft
                              style={{ marginTop: '2px', color: '#335D8A' }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  // position: 'fixed',
                  // bottom: 0,
                  // left: 0,
                  width: '100%',
                  padding: '10px'
                  // backgroundColor: 'white'
                }}
              >
                <ConfirmButton
                  disabled={false}
                  variant="outlined"
                  onClick={() => {
                    history.goBack();
                  }}
                  type={'button'}
                  style={{ width: '150px' }}
                >
                  {'لغو'}
                </ConfirmButton>
                <ConfirmButton
                  style={{ width: '150px' }}
                  disabled={
                    payment.filter(f => f.payment_state.name === 'INITIAL')
                      .length > 0
                  }
                  onClick={() => {
                    const formData = new FormData();
                    formData.append('order_num', props.data.order_num);

                    httpService
                      .post(
                        `${API_BASE_URL}/api/orders/payment/update_order_payment/`,
                        formData
                      )
                      .then(res => {
                        if (res.status === 200) {
                          history.push('/sale/received');
                        }
                      });
                  }}
                >
                  {'ذخیره اطلاعات'}
                </ConfirmButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
