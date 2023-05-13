import React from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import * as Yup from 'yup';

// import axios from 'axios';
// import axiosInstance from 'src/utils/axios';

function IdentityInfoDesktop(props) {
  const history = useHistory();

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
          height: '550px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
        <Formik
          initialValues={{
            name: '',
            family: '',
            introducer: '',
            supplier: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('نام اجباری می باشد'),
            family: Yup.string().required('نام خانوادگی اجباری می باشد'),
            supplier: Yup.string().required(
              'شناسه کاربری تامین کنننده اجباری می باشد'
            )
          })}
          onSubmit={(values, { setErrors, setSubmitting, setFieldError }) => {
            setSubmitting(true);
            axios
              .post(`${API_BASE_URL}/api/users/update_user/`, {
                first_name: values.name,
                last_name: values.family,
                introducer: values.introducer,
                supplier: values.supplier
              })
              .then(res => {
                if (res.status === 200) {
                  history.push('/location');
                  setSubmitting(false);
                }
              })
              .catch(err => {
                err.response.data.map(e => {
                  setFieldError(e.field, e.error);
                });
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
                <InputLabelHeader>اطلاعات هویتی</InputLabelHeader>
                <Box sx={{ mt: 0 }}>
                  <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
                </Box>
                <Box sx={{ mt: 0 }}>
                  <InputLabel style={{ marginRight: '5px' }}>نام</InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // placeholder="رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box sx={{ mt: 0 }}>
                  <InputLabel style={{ marginRight: '5px' }}>
                    نام خانوادگی
                  </InputLabel>
                  <TextField
                    id="family"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // placeholder="رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.family}
                    onChange={handleChange}
                    error={Boolean(touched.family && errors.family)}
                    helperText={touched.family && errors.family}
                  />
                </Box>
                <Box sx={{ mt: 0 }}>
                  <InputLabel>تامین کننده</InputLabel>
                  <TextField
                    id="supplier"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="شناسه کاربری تامین کننده"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.supplier}
                    onChange={handleChange}
                    error={Boolean(touched.supplier && errors.supplier)}
                    helperText={touched.supplier && errors.supplier}
                  />
                </Box>
                <Box sx={{ mt: 0 }}>
                  <InputLabel>معرف</InputLabel>
                  <TextField
                    id="introducer"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="شناسه کاربری معرف"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.introducer}
                    onChange={handleChange}
                    // error={Boolean(touched.family && errors.family)}
                    // helperText={touched.family && errors.family}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  padding: '0px',
                  margin: 0,
                  width: '100%',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                {/* <ConfirmButton
                  disabled={true}
                  variant="outlined"
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

export default IdentityInfoDesktop;
