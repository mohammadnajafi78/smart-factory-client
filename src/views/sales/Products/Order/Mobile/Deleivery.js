import React, { useEffect, useState } from 'react';
import { Box, Drawer, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useHistory } from 'react-router-dom';
import useSaleOrder from 'src/hooks/useSaleOrder';
import CAR from 'src/assets/img/car.svg';
import TRANSPORTING_COMPANY from 'src/assets/img/transport.svg';
import TRUCK from 'src/assets/img/truck.svg';
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
export default function Delivery(props) {
  // const data = props.location.state;
  const classes = useStyles();
  const [types, setTypes] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { setOrder } = useSaleOrder();
  const history = useHistory();
  const order = props.order;
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/orders/delivery/get_delivery_type/`)
      .then(res => {
        setTypes(res.data);
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
          height: 'inherit'
        }}
      >
        <Box>
          <InputLabelHeader
            style={{ color: '#00AAB5', fontSize: '18px', marginBottom: '20px' }}
          >
            ثبت سفارش
          </InputLabelHeader>
          <Box sx={{ display: 'flex', gap: '۸px', flexDirection: 'column' }}>
            <InputLabel>نحوه ارسال سفارش را مشخص کنید:</InputLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                marginTop: '10px'
              }}
            >
              {types &&
                types.map((item, index) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 12px',
                        gap: '6px',
                        width: '100px',

                        background:
                          selected === item.name ? '#CCEEF0' : '#E6EBF0',
                        borderRadius: '4px',
                        border:
                          selected === item.name ? '1px solid #00AAB5' : 'none'
                      }}
                      onClick={() => setSelected(item.name)}
                    >
                      <img
                        src={
                          item.name === 'CAR'
                            ? CAR
                            : item.name === 'TRANSPORTING_COMPANY'
                            ? TRANSPORTING_COMPANY
                            : TRUCK
                        }
                      />
                      <InputLabel
                        style={{
                          textAlign: 'center',
                          color: '#335D8A',
                          fontSize: '12px',
                          lineHeight: 'inherit'
                        }}
                      >
                        {item.label}
                      </InputLabel>
                    </Box>
                  );
                })}
            </Box>
          </Box>
          <Box sx={{ marginTop: '15px', width: '100%' }}>
            <InputLabel>بازه زمانی ارسال را مشخص کنید:</InputLabel>

            <Box sx={{ mt: 1, mb: 1 }}>
              <InputLabel style={{ color: '#A7A5A6' }}>از</InputLabel>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DateTimePicker
                  mask="____/__/__"
                  // value={
                  //   filterList[index].length > 0
                  //     ? moment
                  //         .from(
                  //           p2e(
                  //             moment(filterList[index][0]).format('YYYY/MM/DD')
                  //           ),
                  //           'fa',
                  //           'YYYY/MM/DD'
                  //         )
                  //         .locale('en')
                  //     : new Date()
                  // }
                  onChange={newValue => {
                    //   if (newValue) {
                    //     setEndDate(moment(newValue).format('YYYY-MM-DD'));
                    //     filterList[index][0] = MomentFa(newValue);
                    //     console.log('change', filterList);
                    //     onChange(filterList[index], index, column);
                    //   } else {
                    //     filterList[index] = [];
                    //     onChange(filterList[index], index, column);
                    //   }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      sx={{
                        background: '#F2F2F2',
                        width: '100%'
                      }}
                      placeholder="ااز"
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ mt: 1, mb: 1 }}>
              <InputLabel style={{ color: '#A7A5A6' }}>تا</InputLabel>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DateTimePicker
                  mask="____/__/__"
                  // value={
                  //   filterList[index].length > 0
                  //     ? moment
                  //         .from(
                  //           p2e(
                  //             moment(filterList[index][0]).format('YYYY/MM/DD')
                  //           ),
                  //           'fa',
                  //           'YYYY/MM/DD'
                  //         )
                  //         .locale('en')
                  //     : new Date()
                  // }
                  onChange={newValue => {
                    //   if (newValue) {
                    //     setEndDate(moment(newValue).format('YYYY-MM-DD'));
                    //     filterList[index][0] = MomentFa(newValue);
                    //     console.log('change', filterList);
                    //     onChange(filterList[index], index, column);
                    //   } else {
                    //     filterList[index] = [];
                    //     onChange(filterList[index], index, column);
                    //   }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      sx={{
                        background: '#F2F2F2',
                        width: '100%'
                      }}
                      placeholder="تا"
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            onClick={() => {
              history.push('/sale/products/order/2');
            }}
            type={'button'}
          >
            {'بارگشت'}
          </ConfirmButton>
          <ConfirmButton
            loading={isLoading}
            onClick={() => {
              setLoading(true);
              httpService
                .post(`${API_BASE_URL}/api/orders/delivery/update_delivery/`, {
                  start_date: startDate,
                  end_date: endDate,
                  delivery_type: selected,
                  delivery_num: order.delivery_detail.delivery_num,
                  order_num: order.order_num
                  // description:
                })
                .then(res => {
                  if (res.status === 200) {
                    httpService
                      .post(`${API_BASE_URL}/api/orders/submit_order/`, {
                        order_num: order.order_num
                      })
                      .then(res => {
                        setLoading(false);
                        if (res.status === 200) {
                          setOrder(res.data);
                          history.push({
                            pathname: '/sale/products/order/4',
                            state: res.data
                          });
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
                  } else {
                    setLoading(false);
                  }
                })
                .catch(ex => {
                  setLoading(false);
                  if (ex.response.status === 417) {
                    enqueueSnackbar(ex.response.data.error, {
                      variant: 'error'
                    });
                  } else {
                    enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                      variant: 'error'
                    });
                  }
                });
            }}
          >
            {'ارسال سفارش'}
          </ConfirmButton>
        </Box>
      </Box>

      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 15px 0px !important',
            // gap: '10px',
            background: '#FFFFFF',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '10px',
              width: '100%'
            }}
          >
            <InputLabel style={{ color: '#00346D' }}>
              آدرس جدید را وارد کنید:
            </InputLabel>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>نام آدرس</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="نام آدرس"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>کد پستی</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="کد پستی"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>
                توضیحات بیشتر
              </InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="توضیحات بیشتر"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <ConfirmButton
              disabled={false}
              // variant="outlined"
              style={{
                background: '#FFFFFF',
                color: '#6685A7',
                border: '0.8px solid #6685A7'
              }}
              onClick={() => setOpen(false)}
            >
              <img src={CancelImg} />
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton disabled={false} onClick={() => {}}>
              {'ثبت آدرس'}
            </ConfirmButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
