import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import LoginFrame from 'src/components/Desktop/LoginFrame';

function EnterPasswordDesktop() {
  const recaptchaRef = useRef();

  function onChange(value) {
    console.log('Captcha value:', value);
  }

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
              <Box sx={{ width: '100%' }}>
                <InputLabelHeader>ورود با رمز عبور</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>جهت ورود، اطلاعات زیر را وارد کنید:</InputLabel>
                </Box>
                <Box>
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      id="my-input"
                      aria-describedby="my-helper-text"
                      fullWidth
                      placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="my-input"
                      aria-describedby="my-helper-text"
                      fullWidth
                      placeholder="تکرار رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                    />
                  </Box>
                  {/* <Box sx={{ mt: 1 }}>
                    <ReCAPTCHA
                      style={{
                        display: 'inline-block',
                        width: '100%',
                        // backgroundColor: '#D3D2D2',
                        margin: '10px 5px',
                        borderRadius: '4px',
                        fontSize: '16px'
                      }}
                      ref={recaptchaRef}
                      sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                      // onChange={onChange}
                      // asyncScriptOnLoad={this.asyncScriptOnLoad}
                      hl="fa"
                    />
                  </Box> */}
                </Box>
              </Box>
              <Box
                sx={{
                  padding: '0px',
                  margin: 0,
                  width: '100%'
                }}
              >
                <ConfirmButton disabled={isSubmitting}>{'ثبت'}</ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default EnterPasswordDesktop;
