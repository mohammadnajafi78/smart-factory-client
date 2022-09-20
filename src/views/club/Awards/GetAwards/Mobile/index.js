import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import LinkButton from 'src/components/Mobile/Button/Link';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { Star } from 'react-feather';
import Received from 'src/assets/img/icons/received.svg';
import Presents from 'src/assets/img/icons/presents.svg';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import UserClub from 'src/utils/userClub';
import useScore from 'src/hooks/useScore';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function GetAwardMobile(props) {
  const data = props.location.state.data;
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { setScore } = useScore();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // height: '80%',
          padding: '16px 20px 0px'
          // gap: '480px'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '12px',
              width: '100%',
              height: '114px',
              background: '#FFFFFF',
              boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
              borderRadius: '8px',
              gap: 3
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 15px',
                gap: '10px',

                width: '75px',
                height: '84px',

                background: '#F4F4F4',
                borderRadius: '8px'
              }}
            >
              <img
                // src={data.image}
                src={iphone13}
                alt={data.name}
                style={{ width: '44px', height: '60px' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '12px 0px',
                gap: '25px',
                width: '100%',
                height: '90px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: '0px',
                  paddingBottom: '30px',
                  // gap: '3px',

                  width: '100%',
                  height: '40px',
                  borderBottom: '0.5px solid #D7D7D7'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#00346D',
                    lineHeight: '17px'
                  }}
                >
                  {data.name}
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '3px 6px !important',
                    // height: '22px',
                    background: '#CCEEF0',
                    borderRadius: '4px',
                    color: '#00AAB5'
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>
                    {data.gift_grade}
                  </InputLabel>
                  <Star style={{ width: '27px', height: '18px' }} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '10px',

                  width: '100%',
                  height: '25px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#808286'
                  }}
                >
                  {MomentFa(data.expire_date)}
                </InputLabel>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '20px',
              // height: '300px',
              mt: 2
            }}
          >
            <InputLabel style={{ color: '#231F20', fontWeight: 500 }}>
              توضیحات
            </InputLabel>
            <InputLabel style={{ color: '#4F4C4D' }}>
              {data.description}
            </InputLabel>
          </Box>
        </Box>
        <Box sx={{ width: '90%', position: 'absolute', bottom: 90 }}>
          <LinkIconButton onClick={() => setOpenFirst(true)}>
            <img
              src={Received}
              width="26px"
              height="20px"
              style={{ color: 'white' }}
            />
            <div>
              {data.gift_type && data.gift_type != 4
                ? 'دریافت جایزه'
                : 'شرکت در قرعه کشی'}
            </div>
          </LinkIconButton>
        </Box>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={openFirst}
        onClose={() => setOpenFirst(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '60px 0px 0px !important',
            gap: '20px',
            // height: '342px',
            background: '#FFFFFF'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px',
              gap: '40px'
            }}
          >
            <img src={Presents} alt="awards" width={'61px'} height={'60px'} />
            <InputLabelHeader
              style={{ textAlign: 'center', color: '#00346D', fontWeight: 500 }}
            >
              {data.gift_type && data.gift_type != 4
                ? ' آیا از دریافت این جایزه مطمئن هستید؟'
                : ' آیا از شرکت در قرعه کشی مطمئن هستید؟'}
            </InputLabelHeader>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => setOpenFirst(false)}
            >
              {'خیر'}
            </ConfirmButton>
            <ConfirmButton
              disabled={false}
              onClick={() => {
                if (data.gift_type && data.gift_type != 4) {
                  httpService
                    .post(`${API_BASE_URL}/api/club/user_gifts/`, {
                      gift: data.id
                    })
                    .then(res => {
                      if (res.status === 201) {
                        setOpenFirst(false);
                        setOpenSecond(true);
                        // UserClub();
                        setScore();
                      }
                    });
                } else {
                  httpService
                    .post(`${API_BASE_URL}/api/club/lottery_participant/`, {
                      lot_id: data.id
                    })
                    .then(res => {
                      if (res.status === 201) {
                        setOpenFirst(false);
                        setOpenSecond(true);
                        setScore();

                        // UserClub();
                      }
                    });
                }
              }}
            >
              {'بله'}
            </ConfirmButton>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={openSecond}
        onClose={() => setOpenSecond(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '60px 0px 0px !important',
            gap: '20px',
            // height: '342px',
            background: '#FFFFFF'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px',
              gap: '40px'
            }}
          >
            <img src={Presents} alt="awards" width={'61px'} height={'60px'} />
            <InputLabelHeader style={{ color: '#00346D', fontWeight: 500 }}>
              شما جایزه را دریافت کردید
            </InputLabelHeader>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '76px',
              borderTop: '0.5px solid #D3D2D2',
              padding: '12px 16px'
            }}
          >
            <LinkButton
              variant={'contained'}
              onClick={() => history.push('/club/received')}
            >
              مشاهده جوایز در لیست دریافتی ها
            </LinkButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
