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

const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
function EnterPasswordMobile(props) {
  const recaptchaRef = useRef();
  const history = useHistory();

  function onChange(value) {
    console.log('Captcha value:', value);
  }

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          password2: ''
        }}
        validate={values => {
          const errors = {};
          // if (!values.input) {
          //   errors.username = 'نام کاربری اجباری می باشد';
          // }
          return errors;
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          console.log('password');
          httpService
            .post(`${API_BASE_URL}/api/users/`, {
              mobile: props.location.state.mobile,
              password: values.password
            })
            .then(res => {
              if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem('token', res.headers['x-auth-token']);
                axios.defaults.headers.Authorization = `Bearer ${res.headers['x-auth-token']}`;
                history.push('/identity');
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
              <Box>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    id="password"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.password}
                    onChange={handleChange}
                  />
                </Box>
                <Box>
                  <TextField
                    id="password2"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="تکرار رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.password2}
                    onChange={handleChange}
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

export default EnterPasswordMobile;
