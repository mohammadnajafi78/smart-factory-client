import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Autocomplete } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import useSaleOrder from 'src/hooks/useSaleOrder';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
export default function Location(props) {
  const classes = useStyles();
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [selected, setSelected] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState();
  const history = useHistory();
  const { order, setOrder } = useSaleOrder();
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function getData() {
    httpService
      .get(`${API_BASE_URL}/api/orders/delivery/get_user_delivery_locations/ `)
      .then(res => {
        if (res.status === 200) setLocations(res.data);
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
  }

  useEffect(() => {
    getData();
    httpService
      .get(`${API_BASE_URL}/api/utils/provinces/?country_id=25`)
      .then(res => {
        if (res.status === 200) {
          setProvinces(res.data);
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

  useEffect(() => {
    if (provinceId) {
      httpService
        .get(`${API_BASE_URL}/api/utils/cities/?province__id=${provinceId}`)
        .then(res => {
          if (res.status === 200) {
            setCities(res.data);
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
    }
  }, [provinceId]);

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
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box>
              <InputLabelHeader
                style={{
                  color: '#231F20',
                  fontSize: '18px',
                  marginBottom: '20px'
                }}
              >
                ارسال سفارش
              </InputLabelHeader>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <InputLabel>آدرس را جهت ارسال مشخص کنید:</InputLabel>
                {locations.length > 0 &&
                  locations.map((item, key) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          padding: '10px 12px',
                          gap: '6px',

                          background: '#E6EBF0',
                          borderRadius: '4px',
                          border:
                            selected === item ? '1px solid #335D8A' : 'none'
                        }}
                        onClick={() => setSelected(item)}
                      >
                        <InputLabelHeader
                          style={{
                            color: '#00346D',
                            fontWeight: 700,
                            fontSize: '16px'
                          }}
                        >
                          {item.province_name + ' - ' + item.city_name}
                        </InputLabelHeader>
                        <InputLabel
                          style={{
                            fontSize: '14px',
                            color: '#6685A7',
                            fontWeight: 400
                          }}
                        >
                          {item.address}
                        </InputLabel>
                      </Box>
                    );
                  })}
                <ConfirmButton
                  style={{
                    background: '#DDF5F6',
                    color: '#00AAB5',
                    width: '50%'
                  }}
                  onClick={() => setOpen(true)}
                >
                  <Plus />
                  آدرس جدید
                </ConfirmButton>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <ConfirmButton
                disabled={false}
                // variant="outlined"
                style={{
                  background: '#FEEEEC',
                  color: '#F4777C',
                  border: '1px solid #FEEEEC',
                  fontSize: '12px',
                  width: '150px'
                }}
                onClick={() => {
                  setOpenCancel(true);
                }}
              >
                <img src={CancelImg} />
                {'لغو سفارش'}
              </ConfirmButton>
              <ConfirmButton
                style={{ width: '100px' }}
                loading={isLoading}
                onClick={() => {
                  setLoading(true);
                  httpService
                    .post(
                      `${API_BASE_URL}/api/orders/delivery/add_delivery_location/`,
                      {
                        location_id: selected.id,
                        order_num: order.order_num
                      }
                    )
                    .then(res => {
                      setLoading(false);
                      if (res.status === 200) {
                        setOrder(res.data);
                        history.push('/sale/products/order/3');
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
                disabled={order?.count <= 0 || selected === null}
              >
                {'ادامه'}
              </ConfirmButton>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CustomizedDialogs
        title={'آدرس جدید'}
        open={open}
        handleClose={() => setOpen(false)}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px 15px 0px !important',
              // gap: '10px',
              background: '#FFFFFF',
              width: '400px'
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
              <Formik
                initialValues={{
                  province_name: '',
                  city_name: '',
                  postal_code: '',
                  address: '',
                  provinceId: '',
                  cityId: ''
                }}
                validationSchema={Yup.object().shape({
                  cityId: Yup.string().required('شهر نباید خالی باشد'),
                  provinceId: Yup.string().required('استان نباید خالی باشد')
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  setSubmitting(true);
                  httpService
                    .post(`${API_BASE_URL}/api/utils/locations/`, {
                      country_id: 25,
                      province_id: provinceId,
                      city_id: cityId,
                      address: values.address,
                      postal_code: values.postal_code,
                      is_delivery: true
                    })
                    .then(res => {
                      if (res.status === 200) {
                        getData();
                        setSubmitting(false);
                        // props.setEditable(false);
                        setOpen(false);
                      } else {
                        setSubmitting(false);
                      }
                    })
                    .catch(ex => {
                      setSubmitting(false);
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
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue
                }) => (
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '20px',
                      // position: 'absolute',
                      width: '100%',
                      height: '100%'
                      // left: '20px',
                      // top: '57px'
                    }}
                  >
                    <Box>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          استان
                        </InputLabel>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={provinces}
                          value={
                            provinces.filter(f => f.id === values.provinceId)[0]
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="استان"
                              fullWidth
                              id="province"
                              error={Boolean(
                                touched.provinceId && errors.provinceId
                              )}
                              helperText={
                                touched.provinceId && errors.provinceId
                              }
                            />
                          )}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              setFieldValue('provinceId', newValue.id);
                              setProvinceId(newValue.id);
                              setCityId(null);
                            } else {
                              setFieldValue('provinceId', '');
                            }
                          }}
                          sx={{
                            '.MuiOutlinedInput-root': {
                              padding: '5px'
                            }
                          }}
                          noOptionsText={'موردی یافت نشد'}
                        />
                      </Box>

                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          شهر
                        </InputLabel>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={cities}
                          // sx={{ width: 300 }}
                          defaultValue={
                            cities.filter(f => f.id === values.cityId)[0]
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="شهر"
                              fullWidth
                              id="cityId"
                              error={Boolean(touched.cityId && errors.cityId)}
                              helperText={touched.cityId && errors.cityId}
                            />
                          )}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              setFieldValue('cityId', newValue.id);
                              setCityId(newValue.id);
                            } else {
                              setFieldValue('cityId', '');
                            }
                          }}
                          sx={{
                            '.MuiOutlinedInput-root': {
                              padding: '5px'
                            }
                          }}
                          noOptionsText={'موردی یافت نشد'}
                        />
                      </Box>

                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          کد پستی
                        </InputLabel>
                        <TextField
                          id="postal_code"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="کد پستی"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px 3px'
                          }}
                          value={values.postal_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>

                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          آدرس
                        </InputLabel>
                        <TextField
                          id="address"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="آدرس"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px 3px'
                          }}
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        width: '100%'
                      }}
                    >
                      <ConfirmButton
                        disabled={false}
                        variant="outlined"
                        type="submit"
                      >
                        {'لغو'}
                      </ConfirmButton>
                      <ConfirmButton
                        disabled={isSubmitting}
                        type="submit"
                        loading={isSubmitting}
                      >
                        {'ثبت آدرس'}
                      </ConfirmButton>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        }
      />
      <CustomizedDialogs
        open={openCancel}
        title={'لغو درخواست'}
        handleClose={() => setOpenCancel(false)}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px',
              justifyContent: 'space-between',
              // height: 'inherit',
              gap: '10px',
              margin: '20px 0px',
              borderRadius: '8px'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <InputLabel style={{ fontSize: '14px' }}>
                  آیا از لغو درخواست مطمئن هستید؟
                </InputLabel>
              </Box>
            </Box>
            {/* <Divider /> */}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end'
              }}
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
                  style={{ width: '150px' }}
                  onClick={() => {
                    setOpenCancel(false);
                  }}
                  type={'button'}
                >
                  {'خیر'}
                </ConfirmButton>
                <ConfirmButton
                  style={{ width: '150px' }}
                  // disabled={comment == null}
                  onClick={() => {
                    httpService
                      .post(`${API_BASE_URL}/api/orders/cancel_order/`, {
                        order_num: order.order_num
                      })
                      .then(res => {
                        if (res.status === 200) {
                          setOpenCancel(false);
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
                  {'بله'}
                </ConfirmButton>
              </Box>
            </Box>
          </Box>
        }
      />
    </>
  );
}
