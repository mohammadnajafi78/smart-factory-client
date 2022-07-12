import React from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';

function IdentityInfoDesktop() {
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
                <InputLabelHeader>اطلاعات هویتی</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <InputLabel style={{ marginRight: '5px' }}>نام</InputLabel>
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // placeholder="رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <InputLabel style={{ marginRight: '5px' }}>
                    نام خانوادگی
                  </InputLabel>
                  <TextField
                    id="my-input"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // placeholder="رمز عبور"
                    sx={{
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
                  width: '100%',
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  gap: 2
                }}
              >
                <ConfirmButton disabled={true} variant="outlined">
                  {'قبلی'}
                </ConfirmButton>
                <ConfirmButton disabled={false}>{'بعدی'}</ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default IdentityInfoDesktop;
