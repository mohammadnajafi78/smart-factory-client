import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import DisableButton from 'src/components/Mobile/Button/Disable';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import CountDown from 'src/utils/CountDown';
import moment from 'moment';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import { TextCenterTextField } from 'src/components/Mobile/TextField/TextCenterTextField';
import useScore from 'src/hooks/useScore';
import * as Yup from 'yup';
import p2e from 'src/utils/P2E';

function LoginOTPMobile(props) {
  const history = useHistory();
  const [reSend, setReSend] = useState(false);
  const { registry } = useAuth();
  const { setScore } = useScore();

  function remainingTime(finish) {
    let today = moment();
    let temp = '00:02:00';
    let seconds =
      +finish.getHours() * 60 * 60 +
      +finish.getMinutes() * 60 +
      +finish.getSeconds();
    let end = temp.split(':');
    let seconds2 = +end[0] * 60 * 60 + +end[1] * 60 + +end[2];

    let date = new Date(1970, 0, 1);
    date.setSeconds(seconds + seconds2);

    let endTime = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    let endSeconds =
      +endTime.split(':')[0] * 60 * 60 +
      +endTime.split(':')[1] * 60 +
      +endTime.split(':')[2];

    let todaySeconds =
      parseInt(today.hour()) * 3600 +
      parseInt(today.minutes()) * 60 +
      parseInt(today.seconds());

    return endSeconds - todaySeconds > 0 ? endSeconds - todaySeconds : 0;
  }

  return (
    <Formik
      initialValues={{
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: ''
      }}
      validationSchema={Yup.object().shape({
        // input1: Yup.string().required()
      })}
      onSubmit={(values, { setErrors, setSubmitting, setFieldError }) => {
        if (props.location.state.status === 'entry') {
          httpService
            .post(`${API_BASE_URL}/api/users/login_with_otp/`, {
              verification_code: `${p2e(values.input1) +
                p2e(values.input2) +
                p2e(values.input3) +
                p2e(values.input4) +
                p2e(values.input5) +
                p2e(values.input6)}`,
              username: props.location.state.mobile
            })
            .then(res => {
              if (res.status === 200) {
                localStorage.setItem('token', res.headers['x-auth-token']);
                axios.defaults.headers.common.Authorization = `Bearer ${res.headers['x-auth-token']}`;
                localStorage.setItem('user', JSON.stringify(res.data));
                registry(res.headers['x-auth-token']);
                setScore();
                // history.push('/home');
                history.push('/' + res.data.profile_state.toLowerCase());
              } else {
                setErrors({
                  input1: true,
                  input2: true,
                  input3: true,
                  input4: true,
                  input5: true,
                  input6: true
                });
              }
            })
            .catch(err => {
              setErrors({
                input1: true,
                input2: true,
                input3: true,
                input4: true,
                input5: true,
                input6: true
              });
            });
        } else if (props.location.state.status === 'forgot') {
          history.push({
            pathname: '/newPassword',
            state: {
              mobile: props.location.state.mobile,
              verification_code:
                p2e(values.input1) +
                p2e(values.input2) +
                p2e(values.input3) +
                p2e(values.input4) +
                p2e(values.input5) +
                p2e(values.input6)
            }
          });
        } else {
          httpService
            .post(`${API_BASE_URL}/api/users/mobile_verification/`, {
              verification_code: `${p2e(values.input1) +
                p2e(values.input2) +
                p2e(values.input3) +
                p2e(values.input4) +
                p2e(values.input5) +
                p2e(values.input6)}`,
              mobile: props.location.state.mobile
            })
            .then(res => {
              if (res.status === 200)
                history.push({
                  pathname: `/registerPass`,
                  state: {
                    mobile: props.location.state.mobile
                  }
                });
            })
            .catch(err => {
              console.log('err');
            });
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue
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
            <InputLabelHeader>کد تایید</InputLabelHeader>
            <InputLabel>
              {`کد ارسال شده به ${props.location.state.mobile} را وارد کنید:`}
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px',
                marginTop: '6px',
                height: '50px',
                direction: 'rtl'
              }}
            >
              <TextCenterTextField
                id="input1"
                type="tel"
                aria-describedby="my-helper-text"
                // placeholder="ورود شماره همراه یا ایمیل"
                fullWidth
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  textAlign: 'center'
                }}
                value={values.input1}
                onChange={event => {
                  handleChange(event, 'input1');
                  if (event.target.value.length === 1) {
                    document.getElementById('input2').focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 8) {
                    document.getElementById('input1').focus();
                  }
                }}
                autoFocus={true}
                error={Boolean(touched.input1 && errors.input1)}
                helperText={touched.input1 && errors.input1}
                variant="filled"
              />
              <TextCenterTextField
                id="input2"
                type="tel"
                aria-describedby="my-helper-text"
                // placeholder="ورود شماره همراه یا ایمیل"
                fullWidth
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  textAlign: 'center'
                }}
                value={values.input2}
                onChange={event => {
                  handleChange(event, 'input2');
                  if (event.target.value.length === 1) {
                    document.getElementById('input3').focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 8) {
                    document.getElementById('input1').focus();
                  }
                }}
                error={Boolean(touched.input2 && errors.input2)}
                helperText={touched.input2 && errors.input2}
                variant="filled"
              />
              <TextCenterTextField
                id="input3"
                type="tel"
                aria-describedby="my-helper-text"
                // placeholder="ورود شماره همراه یا ایمیل"
                fullWidth
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  textAlign: 'center'
                }}
                value={values.input3}
                onChange={event => {
                  handleChange(event, 'input3');
                  if (event.target.value.length === 1) {
                    document.getElementById('input4').focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 8) {
                    document.getElementById('input2').focus();
                  }
                }}
                error={Boolean(touched.input3 && errors.input3)}
                helperText={touched.input3 && errors.input3}
                variant="filled"
              />
              <TextCenterTextField
                id="input4"
                type="tel"
                aria-describedby="my-helper-text"
                // placeholder="ورود شماره همراه یا ایمیل"
                fullWidth
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  textAlign: 'center'
                }}
                value={values.input4}
                onChange={event => {
                  handleChange(event, 'input4');
                  if (event.target.value.length === 1) {
                    document.getElementById('input5').focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 8) {
                    document.getElementById('input3').focus();
                  }
                }}
                error={Boolean(touched.input4 && errors.input4)}
                helperText={touched.input4 && errors.input4}
                variant="filled"
              />
              <TextCenterTextField
                id="input5"
                type="tel"
                aria-describedby="my-helper-text"
                // placeholder="ورود شماره همراه یا ایمیل"
                fullWidth
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  textAlign: 'center'
                }}
                value={values.input5}
                onChange={event => {
                  handleChange(event, 'input5');
                  if (event.target.value.length === 1) {
                    document.getElementById('input6').focus();
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 8) {
                    document.getElementById('input4').focus();
                  }
                }}
                error={Boolean(touched.input5 && errors.input5)}
                helperText={touched.input5 && errors.input5}
                variant="filled"
              />
              <TextCenterTextField
                id="input6"
                type="tel"
                aria-describedby="my-helper-text"
                // placeholder="ورود شماره همراه یا ایمیل"
                fullWidth
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '4px',
                  margin: '6px 3px',
                  textAlign: 'center'
                }}
                value={values.input6}
                onChange={event => {
                  handleChange(event, 'input6');
                  if (event.target.value.length === 1) {
                    document.getElementById('input7').focus();
                    handleSubmit();
                  }
                }}
                onKeyDown={e => {
                  if (e.keyCode === 8) {
                    setFieldValue('input6', '');
                    document.getElementById('input5').focus();
                  }
                }}
                error={Boolean(touched.input6 && errors.input6)}
                helperText={touched.input6 && errors.input6}
                variant="filled"
              />
            </Box>
          </Box>
          <Box>
            <InputLabel>شماره همراه خود را اشتباه وارد کردید؟</InputLabel>
            {!reSend && (
              <DisableButton disabled={isSubmitting} id={'input7'}>
                <CountDown
                  seconds={() =>
                    remainingTime(new Date(props.location.state.lastUpdate))
                  }
                  onEnd={() => {
                    setReSend(true);
                  }}
                />
              </DisableButton>
            )}
            {reSend && (
              <ConfirmButton
                disabled={isSubmitting}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {'ارسال مجدد کد'}
              </ConfirmButton>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default LoginOTPMobile;
