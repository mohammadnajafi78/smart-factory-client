import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import DisableButton from 'src/components/Desktop/Button/Disable';
import LoginFrame from 'src/components/Desktop/LoginFrame';

function LoginOTPDesktop() {
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
              <Box>
                <InputLabelHeader>کد تایید</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>
                    کد ارسال شده به 09131234567 را وارد کنید:
                  </InputLabel>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0px',
                    marginTop: '6px',
                    height: '50px'
                  }}
                >
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    fullWidth
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    // placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    // placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    // placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    // placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    // placeholder="ورود شماره همراه یا ایمیل"
                    fullWidth
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  padding: '0px',
                  margin: 0,
                  width: '100%'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <InputLabel sx={{ color: '#00AAB5', fontWeight: 400 }}>
                    شماره همراه خود را اشتباه وارد کردید؟
                  </InputLabel>
                </Box>
                <DisableButton disabled={isSubmitting}>{'۰۱:۴۵'}</DisableButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default LoginOTPDesktop;
