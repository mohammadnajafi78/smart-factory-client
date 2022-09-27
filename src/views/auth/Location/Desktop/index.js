import React, { useEffect, useState } from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
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

function LocationDesktop() {
  const [provinces, setProvinces] = useState([]);
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
            setFieldValue,
            touched,
            values
          }) => (
            <form
              // noValidate
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
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  gap: 2,
                  padding: '0px',
                  margin: 0,
                  width: '100%'
                }}
              >
                {/* <ConfirmButton
                  disabled={true}
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
      </Box>
    </LoginFrame>
  );
}

export default LocationDesktop;
