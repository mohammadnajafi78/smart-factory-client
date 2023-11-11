import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import CreditCard from 'src/assets/img/credit-card.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight, ChevronLeft, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

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
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar;

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/orders/payment/get_order_payments/?order_num=${props.location.state.order_num}`
      )
      .then(res => {
        if (res.status === 200) {
          setPayment(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          height: 'inherit',
          gap: '10px'
        }}
      >
        <Box sx={{ paddingBottom: '100px' }}>
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
              {payment.length > 0 ? (
                <Box>
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
                            gap: '80px',
                            background: '#E6EBF0',
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
                              <Box
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center'
                                }}
                              >
                                <InputLabel
                                  style={{
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    lineHeight: '28px',
                                    textAlign: 'right',
                                    color: '#00346D'
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
                                  {''}
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
                                    history.push({
                                      pathname: '/sale/send/payment/edit2',
                                      state: item
                                    });
                                  }
                                })
                                .catch(ex => {
                                  if (ex.response.status === 417) {
                                    enqueueSnackbar(ex.response.data.error, {
                                      variant: 'error'
                                    });
                                  } else {
                                    enqueueSnackbar(
                                      'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                                      {
                                        variant: 'error'
                                      }
                                    );
                                  }
                                });
                            }}
                          >
                            <InputLabel
                              style={{ color: '#335D8A', padding: 0 }}
                            >
                              ویرایش
                            </InputLabel>
                            <ChevronLeft
                              style={{ marginTop: '2px', color: '#335D8A' }}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                    <Button
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 12px',
                        gap: '10px',
                        background: '#DDF5F6',
                        border: '1px solid #00AAB5',
                        borderRadius: '4px',
                        mt: 2
                      }}
                      onClick={() => {
                        history.push({
                          pathname: '/sale/send/payment/add',
                          state: props.location.state,
                          new: true
                        });
                      }}
                    >
                      <Plus />
                      <InputLabel style={{ color: '#00AAB5' }}>
                        واریز جدید
                      </InputLabel>
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <img src={CreditCard} />
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        textAlign: 'center',
                        color: '#00346D',
                        marginTop: '10px'
                      }}
                    >
                      اطلاعات واریزی خود را برای این سفارش وارد کنید
                    </InputLabel>
                    <Button
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 12px',
                        gap: '10px',
                        background: '#DDF5F6',
                        border: '1px solid #00AAB5',
                        borderRadius: '4px',
                        mt: 3
                      }}
                      onClick={() => {
                        history.push({
                          pathname: '/sale/send/payment/add',
                          state: props.location.state
                        });
                      }}
                    >
                      <Plus />
                      <InputLabel style={{ color: '#00AAB5' }}>
                        ثبت واریز جدید
                      </InputLabel>
                    </Button>
                  </Box>
                </Box>
              )}
              {payment.length > 0 && (
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    gap: 2,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '10px',
                    backgroundColor: 'white'
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      //   history.push('/sale/products/order/1');
                      history.goBack();
                    }}
                    type={'button'}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton
                    // disabled={
                    //   payment.filter(f => f.payment_state.name === 'INITIAL')
                    //     .length > 0
                    // }
                    loading={isLoading}
                    onClick={() => {
                      setLoading(true);
                      const formData = new FormData();
                      formData.append(
                        'order_num',
                        props.location.state.order_num
                      );
                      formData.append('order_action', 'Approve');
                      formData.append('state', 'Payment');

                      httpService
                        .post(
                          `${API_BASE_URL}/api/orders/update_order_state/`,
                          formData
                        )
                        .then(res => {
                          setLoading(false);
                          if (res.status === 200) {
                            history.push('/sale/send');
                          }
                        })
                        .catch(ex => {
                          setLoading(false);
                          if (ex.response.status === 417) {
                            enqueueSnackbar(ex.response.data.error, {
                              variant: 'error'
                            });
                          } else {
                            enqueueSnackbar(
                              'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                              {
                                variant: 'error'
                              }
                            );
                          }
                        });
                    }}
                  >
                    {'ذخیره اطلاعات'}
                  </ConfirmButton>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
