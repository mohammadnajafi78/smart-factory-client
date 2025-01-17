import React, { useEffect, useState } from 'react';
import { Box, TextField, Divider } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

function LocationMobile(props) {
  const data = props?.data;
  const editable = props?.editable;

  console.log('ppp', data?.user_location?.province);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(
    props.data?.user_location?.province
  );
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(props.data?.user_location?.city);
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
        province_name: data?.user_location?.province_name,
        city_name: data?.user_location?.city_name,
        postal_code: data?.user_location?.postal_code,
        address: data?.user_location?.address,
        provinceId: props.data?.user_location?.province,
        cityId: props.data?.user_location?.city
      }}
      validationSchema={Yup.object().shape({
        cityId: Yup.string().required('شهر نباید خالی باشد'),
        provinceId: Yup.string().required('استان نباید خالی باشد')
      })}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        setSubmitting(true);
        httpService
          .patch(
            `${API_BASE_URL}/api/utils/locations/${data?.user_location?.id}/`,
            {
              country_id: 25,
              province: provinceId,
              city: cityId,
              address: values.address,
              postal_code: values.postal_code
            }
          )
          .then(res => {
            if (res.status === 200) {
              props.getData();
              setSubmitting(false);
              props.setEditable(false);
            } else {
              setSubmitting(false);
            }
          })
          .catch(ex => {
            setSubmitting(false);
            if (ex.response.status === 417) {
              enqueueSnackbar(ex.response.data.error, { variant: 'error' });
            } else {
              enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                variant: 'error'
              });
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
            gap: '100px',
            // position: 'absolute',
            width: '100%',
            height: '100%'
            // left: '20px',
            // top: '57px'
          }}
        >
          <Box>
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>استان</InputLabel>
                  <InputLabel style={{ color: '#231F20' }}>
                    {values?.province_name}
                  </InputLabel>
                </Box>
                <Divider />
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>استان</InputLabel>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={provinces}
                  value={provinces.filter(f => f.id === values.provinceId)[0]}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="استان"
                      fullWidth
                      id="province"
                      error={Boolean(touched.provinceId && errors.provinceId)}
                      helperText={touched.provinceId && errors.provinceId}
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>شهر</InputLabel>
                  <InputLabel style={{ color: '#231F20' }}>
                    {values?.city_name}
                  </InputLabel>
                </Box>
                <Divider />
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>شهر</InputLabel>
                <Autocomplete
                  disablePortal
                  fullWidth
                  options={cities}
                  // sx={{ width: 300 }}
                  defaultValue={cities.filter(f => f.id === values.cityId)[0]}
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>کد پستی</InputLabel>
                  <InputLabel style={{ color: '#231F20' }}>
                    {values?.postal_code}
                  </InputLabel>
                </Box>
                <Divider />
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>کد پستی</InputLabel>
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
            )}
            {editable === false && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>آدرس</InputLabel>
                <InputLabel style={{ color: '#231F20' }}>
                  {values?.address}
                </InputLabel>
              </Box>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>آدرس</InputLabel>
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
            )}
          </Box>
          {editable && (
            // <Box
            //   sx={{
            //     width: '100%',
            //     backgroundColor: 'white',
            //     // position: 'fixed',
            //     // bottom: 0,
            //     // left: 0,
            //     display: 'flex',
            //     justifyContent: 'center'
            //   }}
            // >
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                gap: 2,
                width: '100%'
                // padding: '10px',
                // zIndex: 9999,
                // backgroundColor: 'white'
              }}
            >
              <ConfirmButton disabled={false} variant="outlined" type="submit">
                {'لغو'}
              </ConfirmButton>
              <ConfirmButton
                disabled={isSubmitting}
                type="submit"
                loading={isSubmitting}
              >
                {'ذخیره'}
              </ConfirmButton>
            </Box>
            // </Box>
          )}
        </form>
      )}
    </Formik>
  );
}

export default LocationMobile;
