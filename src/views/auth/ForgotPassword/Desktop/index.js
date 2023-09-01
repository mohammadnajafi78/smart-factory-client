import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Formik } from 'formik';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import useAuth from 'src/hooks/useAuth';

function ForgotPasswordDesktop(props) {
  const recaptchaRef = useRef();
  const history = useHistory();
  const { registry } = useAuth();

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
            mobile: ''
          }}
          validate={values => {
            const errors = {};
            // if (!values.input) {
            //   errors.username = 'نام کاربری اجباری می باشد';
            // }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            httpService
              .post(`${API_BASE_URL}/api/users/request_otp/`, {
                username: values.mobile
              })
              .then(res => {
                if (res.status === 200) {
                  history.push({
                    pathname: '/otp',
                    state: {
                      mobile: values.mobile,
                      lastUpdate: res.data.last_update,
                      status: 'forgot'
                    }
                  });
                  setSubmitting(false);
                }
              })
              .catch(ex => {
                setSubmitting(false);
              });
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
                <InputLabelHeader>بازیابی رمز عبور</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  جهت بازیابی رمز عبور شماره همراه خود را وارد کنید::
                </Box>
                <Box>
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      id="mobile"
                      aria-describedby="my-helper-text"
                      fullWidth
                      placeholder="ورود شماره همراه"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.mobile}
                      onChange={handleChange}
                      type="mobile"
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

export default ForgotPasswordDesktop;
