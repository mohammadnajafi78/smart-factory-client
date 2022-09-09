import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import bcrypt from 'bcryptjs';

// const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
function ForgotPasswordMobile(props) {
  const recaptchaRef = useRef();
  const history = useHistory();
  const { registry } = useAuth();

  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return (
    <>
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
                    status: 'forgot'
                  }
                });
                setSubmitting(false);
              }
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
              justifyContent: 'space-between',
              // alignItems: 'center',
              padding: '0px',
              gap: '159px',
              position: 'absolute',
              width: '90%',
              height: '90%',
              left: '20px',
              top: '57px'
            }}
          >
            <Box>
              <InputLabelHeader>بازیابی رمز عبور</InputLabelHeader>
              <InputLabel>
                جهت بازیابی رمز عبور شماره همراه خود را وارد کنید::
              </InputLabel>
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
            <Box>
              <ConfirmButton disabled={isSubmitting} type="submit">
                {'ثبت'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default ForgotPasswordMobile;
