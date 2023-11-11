import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { ArrowRight, ChevronLeft } from 'react-feather';
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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/orders/payment/get_order_payments/?order_num=${props.location.state.data.order_num}`
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
          height: '35vh',
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
                          gap: '20px',
                          background: 'white',
                          borderRadius: '8px'
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
                          {item.payment_state.name === 'REJECTED' && (
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
                                        pathname:
                                          '/sale/send/detail/payment/edit2',
                                        state: {
                                          data: props.location.state.data,
                                          dataPayment: item
                                        }
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
                                style={{
                                  color: '#335D8A',
                                  padding: 0,
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                ویرایش
                              </InputLabel>
                              <ChevronLeft
                                style={{ marginTop: '2px', color: '#335D8A' }}
                              />
                            </Box>
                          )}
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
                  padding: '10px',
                  marginTop: '20px'
                }}
              >
                <ConfirmButton
                  disabled={false}
                  style={{ width: '150px' }}
                  variant="outlined"
                  onClick={() => {
                    history.goBack();
                  }}
                  type={'button'}
                >
                  {'لغو'}
                </ConfirmButton>
                <ConfirmButton
                  style={{ width: '150px' }}
                  loading={isLoading}
                  onClick={() => {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append(
                      'order_num',
                      props.location.state.data.order_num
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
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
