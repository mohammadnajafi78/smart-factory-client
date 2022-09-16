import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import DisableButton from 'src/components/Desktop/Button/Disable';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import CountDown from 'src/utils/CountDown';
import moment from 'moment';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';
import useAuth from 'src/hooks/useAuth';
import { TextCenterTextField } from 'src/components/Desktop/TextField/TextCenterTextField';

function LoginOTPDesktop(props) {
  const history = useHistory();
  const [reSend, setReSend] = useState(false);
  const { registry } = useAuth();

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
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: ''
          }}
          validate={values => {
            const errors = {};
            // if (!values.input) {
            //   errors.username = 'نام کاربری اجباری می باشد';
            // }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            if (props.location.state.status === 'entry') {
              httpService
                .post(`${API_BASE_URL}/api/users/login_with_otp/`, {
                  verification_code: `${values.input1 +
                    values.input2 +
                    values.input3 +
                    values.input4 +
                    values.input5 +
                    values.input6}`,
                  username: props.location.state.mobile
                })
                .then(res => {
                  if (res.status === 200) {
                    localStorage.setItem('token', res.headers['x-auth-token']);
                    axios.defaults.headers.common.Authorization = `Bearer ${res.headers['x-auth-token']}`;
                    registry(res.headers['x-auth-token']);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    // history.push('/home');
                    history.push('/' + res.data.profile_state.toLowerCase());
                  }
                })
                .catch(err => {
                  console.log('err');
                  alert('کد اشتباه وارد شده است');
                });
            } else if (props.location.state.status === 'forgot') {
              history.push({
                pathname: '/newPassword',
                state: {
                  mobile: props.location.state.mobile,
                  verification_code:
                    values.input1 +
                    values.input2 +
                    values.input3 +
                    values.input4 +
                    values.input5 +
                    values.input6
                }
              });
            } else {
              httpService
                .post(`${API_BASE_URL}/api/users/mobile_verification/`, {
                  verification_code: `${values.input1 +
                    values.input2 +
                    values.input3 +
                    values.input4 +
                    values.input5 +
                    values.input6}`,
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
                top: '27px'
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
                  />
                  <TextCenterTextField
                    id="input2"
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
                      console.log('event', e.keyCode);
                      if (e.keyCode === 8) {
                        document.getElementById('input1').focus();
                      }
                    }}
                    type="tel"
                  />
                  <TextCenterTextField
                    id="input3"
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
                  />
                  <TextCenterTextField
                    id="input4"
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
                  />
                  <TextCenterTextField
                    id="input5"
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
                  />
                  <TextCenterTextField
                    id="input6"
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
                        document.getElementById('input6').focus();
                        handleSubmit();
                      }
                    }}
                    onKeyDown={e => {
                      if (e.keyCode === 8) {
                        setFieldValue('input6', '');
                        document.getElementById('input5').focus();
                      }
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <InputLabel id={'input7'}>
                  شماره همراه خود را اشتباه وارد کردید؟
                </InputLabel>
                {!reSend && (
                  <DisableButton disabled={isSubmitting}>
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
      </Box>
    </LoginFrame>
  );
}

export default LoginOTPDesktop;
