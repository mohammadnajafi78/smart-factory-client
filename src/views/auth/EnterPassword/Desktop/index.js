import React, { useRef, useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import bcrypt from 'bcryptjs';
import useScore from 'src/hooks/useScore';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ForgotPasswodDesktop(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const recaptchaRef = useRef();
  const history = useHistory();
  const { registry } = useAuth();
  const { setScore } = useScore();

  function onChange(value) {
    console.log('Captcha value:', value);
  }
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleClickShowPassword2() {
    setShowPassword2(!showPassword2);
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
            password: '',
            password2: ''
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .min(8, 'پسورد باید حداقل ۸ کاراکتر داشته باشد')
              .max(255)
              .required('رمز عبور اجباری می باشد')
              .matches(
                '(?=.*[A-Z]).',
                'رمز عبور باید شامل حداقل یکی از حروف بزرگ باشد'
              )
              .matches(
                '(?=.*[a-z]).',
                'رمز عبور باید شامل حداقل یکی از حروف کوچک باشد'
              )
              .matches(
                '(?=.*[0-9])',
                'رمز عبور باید شامل حداقل یک عدد ۰ تا ۹ باشد'
              )
              .matches(
                '([^A-Za-z0-9])',
                'رمز عبور باید شامل حداقل یک کاراکتر خاص باشد باشد'
              ),
            password2: Yup.string()
              .oneOf(
                [Yup.ref('password'), null],
                'رمز عبور و تکرار رمز عبور باید یکسان باشند'
              )
              .required('تکرار رمز عبور اجباری می باشد')
          })}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/users/`, {
                mobile: props.location.state.mobile,
                password: bcrypt.hashSync(
                  values.password,
                  '$2a$10$p.DMYfbaIgtkCH7rseuMnu'
                )
              })
              .then(res => {
                if (res.status === 200) {
                  setSubmitting(false);
                  localStorage.setItem('token', res.headers['x-auth-token']);
                  axios.defaults.headers.common.Authorization = `Bearer ${res.headers['x-auth-token']}`;
                  registry(res.headers['x-auth-token']);
                  localStorage.setItem('user', JSON.stringify(res.data));
                  setScore();
                  // history.push('/home');
                  history.push('/' + res.data.profile_state.toLowerCase());
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
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword === false ? 'password' : 'text'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" tabIndex={-1}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                              tabIndex={-1}
                            >
                              {!showPassword ? (
                                <VisibilityOff sx={{ color: '#00AAB5' }} />
                              ) : (
                                <Visibility sx={{ color: '#00AAB5' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
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
                      error={Boolean(touched.password2 && errors.password2)}
                      helperText={touched.password2 && errors.password2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword2 === false ? 'password' : 'text'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" tabIndex={-1}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                              tabIndex={-1}
                            >
                              {!showPassword2 ? (
                                <VisibilityOff sx={{ color: '#00AAB5' }} />
                              ) : (
                                <Visibility sx={{ color: '#00AAB5' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
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

export default ForgotPasswodDesktop;
