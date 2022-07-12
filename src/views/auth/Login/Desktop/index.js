import React from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Formik } from 'formik';
import InputLabel from 'src/components/Desktop/InputLabel';
import Button from 'src/components/Desktop/Button/Confirm';
import InputLabelFooter from 'src/components/Desktop/InputLabel/InputLabelFooter';
import { Box, TextField, Divider } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';

function LoginDesktop() {
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
              errors.username = 'نام کاربری اجباری می باشد';
            }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            //   try {
            //     await login(values.username, values.password);
            //     setSubmitting(false);
            //   } catch (err) {
            //     setErrors({
            //       submit: t('login.validation')
            //     });
            //     setSubmitting(false);
            //   }
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
                    id="my-input"
                    aria-describedby="my-helper-text"
                    placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      height: '44px',
                      textAlign: 'left',
                      fontSize: '16px',
                      mt: 2
                    }}
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
