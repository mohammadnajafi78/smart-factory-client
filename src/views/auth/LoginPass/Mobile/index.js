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

const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
function LoginPassMobile(props) {
  const history = useHistory();
  const recaptchaRef = useRef();
  const { registry } = useAuth();

  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return (
    <>
      <Formik
        initialValues={{
          input: ''
        }}
        validate={values => {
          const errors = {};
          // if (!values.input) {
          //   errors.username = 'نام کاربری اجباری می باشد';
          // }
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
          httpService
            .post(`${API_BASE_URL}/api/users/login_with_pass/`, {
              username: props.location.state.mobile,
              password: values.input
            })
            .then(res => {
              if (res.status === 200) {
                localStorage.setItem('token', res.headers['x-auth-token']);
                axios.defaults.headers.common.Authorization = `Bearer ${res.headers['x-auth-token']}`;
                registry(res.headers['x-auth-token']);
                localStorage.setItem('user', JSON.stringify(res.data));
                history.push('/home');
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
              <InputLabelHeader>ورود با رمز عبور</InputLabelHeader>
              <InputLabel>جهت ورود، اطلاعات زیر را وارد کنید:</InputLabel>
              <Box
              // sx={{
              //   display: 'flex',
              //   flexDirection: 'row',
              //   justifyContent: 'center',
              //   alignItems: 'center',
              //   padding: '0px',
              //   marginTop: '6px',
              //   height: '50px'
              // }}
              >
                <TextField
                  id="input"
                  aria-describedby="my-helper-text"
                  fullWidth
                  placeholder="رمز عبور"
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '6px 3px'
                  }}
                  value={values.input}
                  onChange={handleChange}
                  type="password"
                />
                {/* <ReCAPTCHA
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
                /> */}
              </Box>
            </Box>
            <Box>
              <ConfirmButton type="submit" disabled={isSubmitting}>
                {'ورود'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginPassMobile;
