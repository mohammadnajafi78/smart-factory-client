import React, { useRef, useState } from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import Logo from 'src/assets/img/LogoBTS.svg';
import InputLabel from 'src/components/Desktop/InputLabel';
import LinkButton from 'src/components/Desktop/Button/Link';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import useAuth from 'src/hooks/useAuth';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bcrypt from 'bcryptjs';

function EnterNewPasswordDesktop(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const recaptchaRef = useRef();
  const history = useHistory();
  const { registry } = useAuth();

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
          validate={values => {
            const errors = {};
            // if (!values.input) {
            //   errors.username = 'نام کاربری اجباری می باشد';
            // }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            httpService
              .post(`${API_BASE_URL}/api/users/reset_password/`, {
                mobile: props.location.state.mobile,
                verification_code: props.location.state.verification_code,
                password: bcrypt.hashSync(
                  values.password,
                  '$2a$10$p.DMYfbaIgtkCH7rseuMnu'
                )
              })
              .then(res => {
                if (res.status === 200) {
                  history.push('/login');
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
                alignItems: 'start',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <InputLabelHeader>رمز عبور جدید</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>
                    جهت ثبت رمز عبور جدید، اطلاعات زیر را وارد کنید:
                  </InputLabel>
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
                      onChange={handleChange}
                      type={showPassword === false ? 'password' : 'text'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
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
                      onChange={handleChange}
                      type={showPassword2 === false ? 'password' : 'text'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword2}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
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
                <ConfirmButton disabled={isSubmitting} type="submit">
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
export default EnterNewPasswordDesktop;
