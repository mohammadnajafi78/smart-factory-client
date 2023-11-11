import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

function LocationMobile() {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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

  return (
    <Formik
      initialValues={{
        province: '',
        city: ''
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
            setSubmitting(false);
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
            gap: '159px',
            position: 'absolute',
            width: '90%',
            height: '90%',
            left: '20px',
            top: '57px'
          }}
        >
          <Box>
            <InputLabelHeader>محل سکونت شما</InputLabelHeader>
            <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
            <Box sx={{ mt: 2 }}>
              <InputLabel>استان</InputLabel>
              {/* <TextField
                  id="my-input"
                  aria-describedby="my-helper-text"
                  fullWidth
                  // placeholder="رمز عبور"
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '6px 3px'
                  }}
                /> */}
              <Autocomplete
                disablePortal
                fullWidth
                options={provinces}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder="استان"
                    fullWidth
                    id="province"
                    error={Boolean(touched.province && errors.province)}
                    helperText={touched.province && errors.province}
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setFieldValue('province', newValue.id);
                    setProvinceId(newValue.id);
                  } else {
                    setFieldValue('province', '');
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
              <InputLabel>شهر</InputLabel>
              <Autocomplete
                disablePortal
                fullWidth
                options={cities}
                // sx={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder="شهر"
                    fullWidth
                    id="city"
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setFieldValue('city', newValue.id);
                    setCityId(newValue.id);
                  } else {
                    setFieldValue('city', '');
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
            {/* <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => {
                history.push('/identity');
              }}
              type={'button'}
            >
              {'قبلی'}
            </ConfirmButton> */}
            <ConfirmButton disabled={isSubmitting} loading={isSubmitting}>
              {'ثبت'}
            </ConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LocationMobile;
