import React, { useEffect, useState } from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';

function LocationDesktop() {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/utils/provinces/?country_id=25`, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      })
      .then(res => {
        if (res.status === 200) {
          setProvinces(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (provinceId !== null) {
      axios
        .get(`${API_BASE_URL}/api/utils/cities/?province__id=${provinceId}`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        })
        .then(res => {
          if (res.status === 200) {
            setCities(res.data);
          }
        });
    }
  }, [provinceId]);

  return (
    <LoginFrame>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 30px 20px',
          gap: '60px',
          position: 'absolute',
          width: '386px',
          height: '520px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
        <Formik
          initialValues={{
            province: '',
            city: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.input) {
              errors.username = 'نام کاربری اجباری می باشد';
            }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            axios
              .post(
                `${API_BASE_URL}/api/utils/location/`,
                { country_id: 25, province_id: provinceId, city_id: cityId },
                {
                  headers: {
                    'x-auth-token': localStorage.getItem('token')
                  }
                }
              )
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
                alignItems: 'start',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <InputLabelHeader>محل سکونت شما</InputLabelHeader>
                <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>استان</InputLabel>
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
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  padding: '0px',
                  margin: 0,
                  width: '100%'
                }}
              >
                <ConfirmButton
                  disabled={false}
                  variant="outlined"
                  onClick={() => {
                    history.push('/identity');
                  }}
                >
                  {'قبلی'}
                </ConfirmButton>
                <ConfirmButton disabled={false} onClick={handleSubmit}>
                  {'بعدی'}
                </ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default LocationDesktop;
