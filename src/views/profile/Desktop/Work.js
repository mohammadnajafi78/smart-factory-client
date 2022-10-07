import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  ListItemIcon,
  TextField,
  Divider,
  Grid
} from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';
import Autocomplete from '@mui/material/Autocomplete';

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

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/utils/provinces/?country_id=25`)
      .then(res => {
        if (res.status === 200) {
          setProvinces(res.data);
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
      // validate={values => {
      //   const errors = {};
      //   if (!values.input) {
      //     errors.username = 'نام کاربری اجباری می باشد';
      //   }
      //   return errors;
      // }}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        setSubmitting(true);
        httpService
          .post(`${API_BASE_URL}/api/utils/companies/company_update/`, {
            name: values.name,
            phone: values.phone,
            email: values.email,
            website: values.website,
            national_id: values.national_id,
            country: 25,
            province: provinceId,
            city: cityId,
            postal_code: values.postal_code,
            address: values.address
          })
          .then(res => {
            if (res.status === 200) {
              props.getData();
              setSubmitting(false);
              props.setEditable(false);
            } else {
              setSubmitting(false);
            }
          })
          .catch(err => {
            setSubmitting(false);
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
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        نام شرکت
                      </InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.name}
                      </InputLabel>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>تلفن</InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.phone}
                      </InputLabel>
                    </Box>
                  </Grid>
                </Grid>
                <Divider variant="middle" style={{ margin: '10px 0px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        ایمیل
                      </InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.email}
                      </InputLabel>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        وب سایت
                      </InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.website}
                      </InputLabel>
                    </Box>
                  </Grid>
                </Grid>
                <Divider variant="middle" style={{ margin: '10px 0px' }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        شناسه ملی
                      </InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.national_id}
                      </InputLabel>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        استان
                      </InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.province_name}
                      </InputLabel>
                    </Box>
                  </Grid>
                </Grid>
                <Divider variant="middle" style={{ margin: '10px 0px' }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>شهر</InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.city_name}
                      </InputLabel>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        کد پستی
                      </InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.postal_code}
                      </InputLabel>
                    </Box>
                  </Grid>
                </Grid>
                <Divider variant="middle" style={{ margin: '10px 0px' }} />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>آدرس</InputLabel>
                      <InputLabel style={{ color: '#231F20' }}>
                        {values?.address}
                      </InputLabel>
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
                        // isOptionEqualToValue={(option, value) =>
                        //   option.label === value.label
                        // }
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
