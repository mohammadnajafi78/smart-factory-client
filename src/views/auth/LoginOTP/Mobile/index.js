import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import DisableButton from 'src/components/Mobile/Button/Disable';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CountDown from 'src/utils/CountDown';
import moment from 'moment';
import { API_BASE_URL } from 'src/utils/urls';

function LoginOTPMobile(props) {
  const history = useHistory();
  const [reSend, setReSend] = useState(false);

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
      validate={values => {
        const errors = {};
        // if (!values.input) {
        //   errors.username = 'نام کاربری اجباری می باشد';
        // }
        return errors;
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        if (props.location.state.status === 'entry') {
          axios
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
                localStorage.setItem('user', JSON.stringify(res.data.data));
                history.push('/club/awards');
              }
            })
            .catch(err => {
              console.log('err');
              alert('کد اشتباه وارد شده است');
            });
        } else {
          axios
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
            <InputLabelHeader>کد تایید</InputLabelHeader>
            <InputLabel>کد ارسال شده به 09131234567 را وارد کنید:</InputLabel>
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
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
              />
              <TextField
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
                  handleSubmit();
                }}
              />
            </Box>
          </Box>
          <Box>
            <InputLabel>شماره همراه خود را اشتباه وارد کردید؟</InputLabel>
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
  );
}

export default LoginOTPMobile;
