import React, { useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import useAuth from 'src/hooks/useAuth';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

function EnterNewPasswordMobile(props) {
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
    <>
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
                setSubmitting(false);
                history.push('/login');
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
              <InputLabelHeader>رمز عبور جدید</InputLabelHeader>
              <InputLabel>
                جهت ثبت رمز عبور جدید، اطلاعات زیر را وارد کنید:
              </InputLabel>{' '}
              <Box>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    id="password"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="رمز عبور جدید"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
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
                    placeholder="تکرار رمز عبور جدید"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password2 && errors.password2)}
                    helperText={touched.password2 && errors.password2}
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
            <Box>
              <ConfirmButton
                disabled={isSubmitting}
                loading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'در حال ثبت' : 'ثبت'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default EnterNewPasswordMobile;
