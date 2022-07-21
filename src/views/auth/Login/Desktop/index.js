import React from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Formik } from 'formik';
import InputLabel from 'src/components/Desktop/InputLabel';
import Button from 'src/components/Desktop/Button/Confirm';
import InputLabelFooter from 'src/components/Desktop/InputLabel/InputLabelFooter';
import { Box, TextField, Divider } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';

function LoginDesktop() {
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
          height: '500px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
        <Formik
          initialValues={{
            input: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.input) {
              errors.input = 'نام کاربری اجباری می باشد';
            }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            try {
              console.log('values ', values);
              axios
                .get(
                  `${API_BASE_URL}/api/users/login_or_register?mobile=${values.input}`
                )
                .then(res => {
                  if (res.status === 204) {
                    axios
                      .post(`${API_BASE_URL}/api/users/register/`, {
                        mobile: values.input
                      })
                      .then(result => {
                        if (result.status === 200) {
                          history.push({
                            pathname: `/otp`,
                            state: {
                              mobile: values.input,
                              lastUpdate: result.data.last_update
                            }
                          });
                        } else console.log('error');
                      });
                  } else if (res.status === 200)
                    history.push({
                      pathname: '/entry',
                      state: {
                        mobile: values.input
                      }
                    });
                });
              setSubmitting(false);
            } catch (err) {
              // setErrors({
              //   submit: t('login.validation')
              // });
              setSubmitting(false);
            }
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
              <div>
                <InputLabelHeader>ورود</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>
                    جهت ورود یا ثبت‌نام شماره همراه یا ایمیل خود را وارد کنید
                  </InputLabel>
                  <TextField
                    id="input"
                    placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      height: '44px',
                      textAlign: 'left',
                      fontSize: '16px',
                      mt: 2
                    }}
                    value={values.input}
                    onChange={handleChange}
                  />
                </Box>
              </div>
              <Box
                sx={{
                  padding: '0px',
                  margin: 0,
                  width: '100%'
                }}
              >
                <Button disabled={isSubmitting}>{'ثبت'}</Button>
                <Divider variant="middle" sx={{ margin: '15px 0px' }} />
                <InputLabelFooter>
                  با ثبت‌نام در BTS، با قوانین و مقررات BTS موافقت می‌کنم.
                </InputLabelFooter>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default LoginDesktop;
