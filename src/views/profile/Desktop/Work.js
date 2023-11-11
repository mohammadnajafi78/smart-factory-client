import React, { useEffect, useState } from 'react';
import { Box, TextField, Divider, Grid } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';
import Autocomplete from '@mui/material/Autocomplete';
import * as Yup from 'yup';
import Text from 'src/components/Desktop/Text';
import { useSnackbar } from 'notistack';

function WorkMobile(props) {
  const history = useHistory();
  const data = props?.data;
  const editable = props?.editable;
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(
    props.data?.company?.location_info?.province
  );
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(
    props.data?.company?.location_info?.city
  );
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
    <Formik
      initialValues={{
        name: data?.company?.name,
        phone: data?.company?.phone,
        email: data?.company?.email,
        website: data?.company?.website,
        national_id: data?.company?.national_id,
        province_name: data?.company?.location_info?.province_name,
        city_name: data?.company?.location_info?.city_name,
        postal_code: data?.company?.location_info?.postal_code,
        address: data?.company?.location_info?.address
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('نام شرکت اجباری می باشد'),
        phone: Yup.string().required('شماره تلفن شرکت اجباری می باشد'),
        national_id: Yup.string().required('شناسه ملی شرکت اجباری می باشد')
      })}
      onSubmit={(values, { setErrors, setSubmitting, setFieldError }) => {
        setSubmitting(true);
        const data = {};
        if (values.name !== null && values.name !== '')
          data['name'] = values.name;
        if (values.phone !== null && values.phone !== '')
          data['phone'] = values.phone;
        if (values.email !== null && values.email !== '')
          data['email'] = values.email;
        if (values.website !== null && values.website !== '')
          data['website'] = values.website;
        if (values.national_id !== null && values.national_id !== '')
          data['national_id'] = values.national_id;
        if (provinceId !== null && provinceId !== '')
          data['province'] = provinceId;
        if (cityId !== null && cityId !== '') data['city'] = cityId;
        if (values.postal_code !== null && values.postal_code !== '')
          data['postal_code'] = values.postal_code;
        if (values.address !== null && values.address !== '')
          data['address'] = values.address;
        httpService
          .post(`${API_BASE_URL}/api/utils/companies/company_update/`, data)
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
            if (ex.response.status === 417) {
              ex.response.data.map(e => {
                setFieldError(e.field, e.error);
              });
              setSubmitting(false);
              enqueueSnackbar(ex.response.data.error, { variant: 'error' });
            } else {
              enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                variant: 'error'
              });
            }
          })
          .catch(err => {});
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
            // gap: '100px',
            // position: 'absolute',
            width: '100%',
            height: '100%'
            // left: '20px',
            // top: '57px'
          }}
        >
          <Box
            sx={{
              // display: 'grid',
              // gridTemplateColumns: 'repeat(2, 1fr)',
              // gridColumnGap: '30px',
              mb: 6
            }}
          >
            {editable === false && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'نام شرکت'} value={values?.name} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'تلفن'} value={values?.phone} />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'ایمیل'} value={values?.email} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'وب سایت'} value={values?.website} />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'شناسه ملی'} value={values?.national_id} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'استان'} value={values?.province_name} />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'شهر'} value={values?.city_name} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'کد پستی'} value={values?.postal_code} />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'آدرس'} value={values?.address} />
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}

            {editable === true && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        نام شرکت
                      </InputLabel>
                      <TextField
                        id="name"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="نام شرکت"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>تلفن</InputLabel>
                      <TextField
                        id="phone"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="تلفن"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        ایمیل
                      </InputLabel>
                      <TextField
                        id="email"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="ایمیل"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        وب سایت
                      </InputLabel>
                      <TextField
                        id="website"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="وب سایت"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        شناسه ملی
                      </InputLabel>
                      <TextField
                        id="national_id"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="شناسه ملی"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.national_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched.national_id && errors.national_id
                        )}
                        helperText={touched.national_id && errors.national_id}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Divider variant="middle" style={{ margin: '10px 0px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        استان
                      </InputLabel>
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={provinces}
                        value={provinces.filter(f => f.id === provinceId)[0]}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="استان"
                            fullWidth
                            id="province"
                            // error={Boolean(touched.province && errors.province)}
                            // helperText={touched.province && errors.province}
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setFieldValue('province', newValue.id);
                            setProvinceId(newValue.id);
                            setCityId(null);
                          } else {
                            setFieldValue('province', '');
                            setProvinceId('');
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
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>شهر</InputLabel>
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={cities}
                        value={cities.filter(f => f.id === cityId)[0]}
                        // sx={{ width: 300 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="شهر"
                            fullWidth
                            id="city"
                            // error={Boolean(touched.city && errors.city)}
                            // helperText={touched.city && errors.city}
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setFieldValue('city', newValue.id);
                            setCityId(newValue.id);
                          } else {
                            setFieldValue('city', '');
                            setCityId('');
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
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={12}>
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
                        multiline
                        rows={2}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
          {editable === true && (
            <>
              <Divider sx={{ margin: '10px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    width: '50%'
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => props.setEditable(false)}
                  >
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
              </Box>
            </>
          )}
        </form>
      )}
    </Formik>
  );
}

export default WorkMobile;
