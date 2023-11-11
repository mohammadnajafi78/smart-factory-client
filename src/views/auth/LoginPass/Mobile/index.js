import React, { useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import bcrypt from 'bcryptjs';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useScore from 'src/hooks/useScore';
import { askForPermissionToReceiveNotifications } from 'src/push-notification';
import { useSnackbar } from 'notistack';

const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
function LoginPassMobile(props) {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const recaptchaRef = useRef();
  const { registry } = useAuth();
  const { setScore } = useScore();
  const { enqueueSnackbar } = useSnackbar();

  function onChange(value) {
    console.log('Captcha value:', value);
  }
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
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
        onSubmit={(values, { setErrors, setSubmitting }) => {
          //   try {
          //     await login(values.username, values.password);
          //     setSubmitting(false);
          //   } catch (err) {
          //     setErrors({
          //       submit: t('login.validation')
          //     });
          //     setSubmitting(false);
          //   }

          const salt = bcrypt.genSaltSync(10);
          setSubmitting(true);
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
                setSubmitting(false);
                localStorage.setItem('token', res.headers['x-auth-token']);
                askForPermissionToReceiveNotifications();
                axios.defaults.headers.common.Authorization = `Bearer ${res.headers['x-auth-token']}`;
                registry(res.headers['x-auth-token']);
                localStorage.setItem('user', JSON.stringify(res.data));
                setScore();
                history.push('/' + res.data.profile_state.toLowerCase());
              }
            })
            .catch(ex => {
              setSubmitting(false);
              if (ex.response.status === 417) {
                enqueueSnackbar(ex.response.data.error, { variant: 'error' });
              } else {
                enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                  variant: 'error'
                });
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
                style={{ color: '#049099', cursor: 'pointer' }}
                onClick={() => {
                  // history.push('/forgotPass');
                  httpService
                    .post(`${API_BASE_URL}/api/users/request_otp/`, {
                      username: props.location.state.mobile
                    })
                    .then(res => {
                      if (res.status === 200) {
                        history.push({
                          pathname: '/otp',
                          state: {
                            mobile: props.location.state.mobile,
                            lastUpdate: res.data.last_update,
                            status: 'forgot'
                          }
                        });
                      }
                    })
                    .catch(ex => {
                      if (ex.response.status === 417) {
                        enqueueSnackbar(ex.response.data.error, {
                          variant: 'error'
                        });
                      } else {
                        enqueueSnackbar(
                          'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                          {
                            variant: 'error'
                          }
                        );
                      }
                    });
                }}
              >
                رمز عبور خود را فراموش کرده اید؟
              </InputLabel>
            </Box>
            <Box>
              <ConfirmButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'در حال ورود' : 'ورود'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default LoginPassMobile;
