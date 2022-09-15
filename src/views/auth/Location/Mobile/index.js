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

function LocationMobile() {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const history = useHistory();

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
        province: '',
        city: ''
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
            city_id: cityId,
            is_user: true
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
                id="province"
                options={provinces}
                renderInput={params => (
                  <TextField {...params} placeholder="استان" fullWidth />
                )}
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
                options={cities}
                // sx={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} placeholder="شهر" fullWidth />
                )}
                onChange={(event, newValue) => {
                  if (newValue) setCityId(newValue.id);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
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
              onClick={() => {
                history.push('/identity');
              }}
              type={'button'}
            >
              {'قبلی'}
            </ConfirmButton>
            <ConfirmButton disabled={isSubmitting}>{'بعدی'}</ConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LocationMobile;
