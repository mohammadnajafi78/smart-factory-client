import React from 'react';
import { Box, TextField, Divider } from '@mui/material';
import Logo from 'src/assets/img/LogoBTS.svg';
import { Formik } from 'formik';
import InputLabel from 'src/components/Mobile/InputLabel';
import Button from 'src/components/Mobile/Button/Confirm';
import InputLabelFooter from 'src/components/Mobile/InputLabel/InputLabelFooter';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';

function LoginMobile() {
  const history = useHistory();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          padding: 0,
          gap: '159px',
          position: 'absolute',
          width: '80%',
          height: '70%',
          left: '40px',
          top: '178px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px',
            gap: '90px',

            // width: '320px',
            height: '272px'
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: '121.27px', height: '50px' }}
          />

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
                httpService
                  .get(
                    `${API_BASE_URL}/api/users/login_or_register?mobile=${values.input}`
                  )
                  .then(res => {
                    if (res.status === 204) {
                      httpService
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
                  alignItems: 'center',
                  gap: '159px',
                  width: '100%'
                }}
              >
                <Box x={{ mt: 2, width: '100%' }}>
                  <InputLabel>
                    جهت ورود یا ثبت‌نام شماره همراه یا ایمیل خود را وارد کنید
                  </InputLabel>
                  <TextField
                    id="input"
                    placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{ height: '44px', textAlign: 'left', fontSize: '16px' }}
                    value={values.input}
                    onChange={handleChange}
                    type="tel"
                  />
                </Box>
                <Box
                  sx={{
                    padding: '0px',
                    margin: 0,
                    position: 'absolute',
                    bottom: 0,
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
      </Box>
    </>
  );
}

export default LoginMobile;
