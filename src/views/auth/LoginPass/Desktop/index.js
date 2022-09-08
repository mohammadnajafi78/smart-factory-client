import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import bcrypt from 'bcryptjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginPassDesktop(props) {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { registry } = useAuth();

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
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
            // if (!values.input) {
            //   errors.username = 'نام کاربری اجباری می باشد';
            // }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            httpService
              .post(`${API_BASE_URL}/api/users/login_with_pass/`, {
                username: props.location.state.mobile,
                password: bcrypt.hashSync(
                  values.input,
                  '$2a$10$p.DMYfbaIgtkCH7rseuMnu'
                )
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
                top: '27px'
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <InputLabelHeader>ورود با رمز عبور</InputLabelHeader>
                <InputLabel>جهت ورود، اطلاعات زیر را وارد کنید:</InputLabel>
                <Box>
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
                            {showPassword ? (
                              <VisibilityOff sx={{ color: '#00AAB5' }} />
                            ) : (
                              <Visibility sx={{ color: '#00AAB5' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
                <InputLabel
                  style={{ color: '#049099' }}
                  onClick={() => {
                    history.push('/forgotPass');
                  }}
                >
                  رمز عبور خود را فراموش کرده اید؟
                </InputLabel>
              </Box>
              <Box>
                <ConfirmButton type="submit" disabled={isSubmitting}>
                  {'ورود'}
                </ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default LoginPassDesktop;
