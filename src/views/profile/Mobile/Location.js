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

function LocationMobile(props) {
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const history = useHistory();
  const data = props.location.state.data;

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
        province_name: data?.user_location?.province_name,
        city_name: data?.user_location?.city_name,
        code: data?.postal_code,
        address: data?.user_location?.address
      }}
      validate={values => {
        // const errors = {};
        // if (!values.input) {
        //   errors.username = 'نام کاربری اجباری می باشد';
        // }
        // return errors;
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        httpService
          .post(`${API_BASE_URL}/api/utils/locations/`, {
            country_id: 25,
            province_id: provinceId,
            city_id: cityId
          })
          .then(res => {
            if (res.status === 200) {
              history.push('/work');
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
            gap: '30px',
            position: 'absolute',
            width: '90%',
            height: '90%',
            left: '20px',
            top: '57px'
          }}
        >
          <Box>
            <InputLabelHeader>اطلاعات آدرس</InputLabelHeader>
            <InputLabel>مشخصات شما شامل موارد زیر می باشد:</InputLabel>
            <Box sx={{ mt: 2 }}>
              <InputLabel>استان</InputLabel>
              <Autocomplete
                disablePortal
                fullWidth
                id="province"
                name="province"
                value={values.province_name}
                options={provinces}
                renderInput={params => <TextField {...params} fullWidth />}
                onChange={(event, newValue) => {
                  setProvinceId(newValue.id);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel>شهر</InputLabel>
              <Autocomplete
                disablePortal
                fullWidth
                id="city"
                name="city"
                options={cities}
                value={values.city_name}
                renderInput={params => <TextField {...params} fullWidth />}
                onChange={(event, newValue) => {
                  if (newValue) setCityId(newValue.id);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel>کد پستی</InputLabel>
              <TextField
                id="code"
                aria-describedby="my-helper-text"
                fullWidth
                // placeholder="رمز عبور"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '6px 3px'
                }}
                value={values.code}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel>آدرس</InputLabel>
              <TextField
                id="address"
                aria-describedby="my-helper-text"
                fullWidth
                multiline
                rows={3}
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '6px 3px'
                }}
                value={values.address}
                onChange={handleChange}
              />
            </Box>
          </Box>
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
              onClick={() =>
                history.push({
                  pathname: '/profile/detail',
                  state: {
                    data: data
                  }
                })
              }
              type={'button'}
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton disabled={isSubmitting}>{'ویرایش'}</ConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LocationMobile;
