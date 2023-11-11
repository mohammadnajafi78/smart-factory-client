import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import CustomizedProgressBars from 'src/components/Desktop/ProgressBar';
import { useSnackbar } from 'notistack';

function MoreInfoMobile() {
  const [brandsList, setBrandsList] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_brand`)
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
    if (provinceId !== null) {
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

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_state`)
      .then(res => {
        if (res.status === 200) {
          setStatusList(res.data);
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
    <Box
      sx={{
        mt: '80px',
        ml: '120px',
        width: '400px',
        background: 'white',
        padding: '20px',
        height: '580px',
        borderRadius: '8px'
      }}
    >
      <InputLabelHeader style={{ marginRight: '10px' }}>
        اطلاعات تکمیلی
      </InputLabelHeader>
      <CustomizedProgressBars activeStep={2} steps={['', '', '', '']} />

      <Formik
        initialValues={{
          name: '',
          province: '',
          city: '',
          status: '',
          address: ''
        }}
        validationSchema={Yup.object().shape({
          province: Yup.string().required('استان اجباری می باشد'),
          city: Yup.string().required('شهر اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/utils/locations/`, {
              country_id: 25,
              province_id: provinceId,
              city_id: cityId,
              is_user: true
            })
            .then(res => {
              if (res.status === 200) {
                history.push('/work');
                setSubmitting(false);
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
          setSubmitting(false);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '0px',
              height: '500px'
            }}
          >
            <Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>برند محصولات</InputLabel>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={statusList}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="برند محصولات"
                      fullWidth
                      id="status"
                      error={Boolean(touched.status && errors.status)}
                      helperText={touched.status && errors.status}
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setFieldValue('status', newValue.id);
                      setProvinceId(newValue.id);
                    } else {
                      setFieldValue('status', '');
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  noOptionsText={'موردی یافت نشد'}
                  sx={{
                    '.MuiOutlinedInput-root': {
                      padding: '5px'
                    }
                  }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>تامین کننده محصولات</InputLabel>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={statusList}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="برند محصولات"
                      fullWidth
                      id="status"
                      error={Boolean(touched.status && errors.status)}
                      helperText={touched.status && errors.status}
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setFieldValue('status', newValue.id);
                      setProvinceId(newValue.id);
                    } else {
                      setFieldValue('status', '');
                    }
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  noOptionsText={'موردی یافت نشد'}
                  sx={{
                    '.MuiOutlinedInput-root': {
                      padding: '5px'
                    }
                  }}
                />
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
                  history.push('/sale/products/order/1');
                }}
                type={'button'}
              >
                {'بارگشت'}
              </ConfirmButton>
              <ConfirmButton
                onClick={() => {
                  httpService
                    .post(
                      `${API_BASE_URL}/api/orders/delivery/add_delivery_location/`,
                      {
                        location_id: selected.id,
                        order_num: order.order_num
                      }
                    )
                    .then(res => {
                      if (res.status === 200) {
                        setOrder(res.data);
                        history.push('/sale/products/order/3');
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
                {'ادامه'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default MoreInfoMobile;
