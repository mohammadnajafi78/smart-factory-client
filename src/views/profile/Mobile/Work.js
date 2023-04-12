import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  ListItemIcon,
  TextField,
  Divider
} from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';
import Autocomplete from '@mui/material/Autocomplete';
import Text from 'src/components/Mobile/Text';

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
    if (provinceId !== null) {
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
                  <Text label={'نام شرکت'} value={values?.name} />
                </Box>
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>نام شرکت</InputLabel>
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Text label={'تلفن'} value={values?.phone} />
                </Box>
              </>
            )}
            {editable === true && (
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Text label={'ایمیل'} value={values?.email} />
                </Box>
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>ایمیل</InputLabel>
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Text label={'وب سایت'} value={values?.website} />
                </Box>
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>وب سایت</InputLabel>
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Text label={'شناسه ملی'} value={values?.national_id} />
                </Box>
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>شناسه ملی</InputLabel>
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Text label={'استان'} value={values?.province_name} />
                </Box>
              </>
            )}
            {editable === true && (
              <Box sx={{ mt: 1, mb: 1 }}>
                <InputLabel style={{ color: '#A7A5A6' }}>استان</InputLabel>
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
            )}
            {editable === false && (
              <>
                <Box sx={{ mt: 1, mb: 1 }}>
                  <Text label={'شهر'} value={values?.city_name} />
                </Box>
              </>
            )}
            {editable === true && (
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
                  <Text label={'کد پستی'} value={values?.postal_code} />
                </Box>
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
                <Text label={'آدرس'} value={values?.address} />
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
          {editable === true && (
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                gap: 2
              }}
            >
              <ConfirmButton
                disabled={false}
                variant="outlined"
                // onClick={() =>
                //   history.push({
                //     pathname: '/profile/detail',
                //     state: {
                //       data: data
                //     }
                //   })
                // }
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
          )}
        </form>
      )}
    </Formik>
  );
}

export default WorkMobile;
