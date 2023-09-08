import React, { useState } from 'react';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { Box } from '@mui/material';
import Logo from 'src/assets/img/LogoBTS.svg';
import InputLabel from 'src/components/Desktop/InputLabel';
import LinkButton from 'src/components/Desktop/Button/Link';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

function EntryDesktop(props) {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <LoginFrame>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 30px 20px',
          gap: '80px',
          position: 'absolute',
          width: '386px',
          height: '500px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
            justifyContent: 'space-between',
            // gap: '159px',
            gap: '90px'
            // position: 'absolute',
            // width: '90%',
            // // height: '317px',
            // left: '20px',
            // top: '222px'
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: '121.27px', height: '50px' }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
              gap: '15px'
            }}
          >
            <InputLabel>
              جهت ورود، یکی از روش‌های زیر را انتخاب کنید:
            </InputLabel>
            <LinkButton
              variant={'outlined'}
              onClick={() => {
                history.push({
                  pathname: '/password',
                  state: {
                    mobile: props.location.state.mobile
                  }
                });
              }}
            >
              {'ورود با رمز عبور'}
            </LinkButton>
            <LinkButton
              variant={'outlined'}
              loading={isLoading}
              onClick={() => {
                setLoading(true);
                httpService
                  .post(`${API_BASE_URL}/api/users/request_otp/`, {
                    username: props.location.state.mobile
                  })
                  .then(res => {
                    setLoading(false);
                    if (res.status === 200) {
                      history.push({
                        pathname: '/otp',
                        state: {
                          mobile: props.location.state.mobile,
                          lastUpdate: res.data.last_update,
                          status: 'entry'
                        }
                      });
                    }
                  })
                  .catch(ex => {
                    setLoading(false);
                  });
              }}
            >
              {'ورود با رمز عبور یک بار مصرف'}
            </LinkButton>
          </Box>
        </Box>
        <Box onClick={() => history.push('/login')}>
          <InputLabel style={{ cursor: 'pointer' }}>
            شماره همراه خود را اشتباه وارد کردید؟
          </InputLabel>
        </Box>
      </Box>
    </LoginFrame>
  );
}

export default EntryDesktop;
