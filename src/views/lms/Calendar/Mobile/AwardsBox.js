import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer, Grid, IconButton } from '@mui/material';
import InputLabel from 'src/components/Mobile/InputLabel';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import LinkButton from 'src/components/Mobile/Button/Link';
import makeStyles from '@mui/styles/makeStyles';
import Chest from 'src/assets/img/icons/chest-win-close.svg';
import GiftBox from 'src/assets/img/icons/giftBox.svg';
import ChestWinOpen from 'src/assets/img/icons/chest-win-open.svg';
import ErrorImg from 'src/assets/img/icons/error.svg';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { Star } from 'react-feather';
import useScore from 'src/hooks/useScore';
// import ChestIcon from 'src/assets/img/icons/chest.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));

export default function AwardsBox() {
  const [awards, setAwards] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [awardsOfBox, setAwardsOfBox] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ]);
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openError, setOpenError] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { setScore } = useScore();
  const [error, setError] = useState(null);

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/gift_box/`).then(res => {
      if (res.status === 200) {
        setAwards(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '6px 16px 15px',
          gap: '10px',

          width: '100%',
          height: '150px',
          // marginTop: '6px',
          backgroundColor: '#33BBC4'
        }}
      >
        <InputLabel
          style={{
            fontSize: '18px',
            fontWeight: 500,
            paddingRight: '15px',
            color: 'white'
          }}
        >
          جوایز
        </InputLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 10px',
            gap: '15px',

            width: '100%',
            height: '80px',
            overflowX: 'auto',
            overflowY: 'hidden'
          }}
        >
          {awards &&
            awards.map((item, key) => {
              return (
                <IconButton
                  key={key}
                  onClick={() => {
                    setOpenFirst(true);
                    setSelectedBox(item);
                  }}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <img src={GiftBox} width="74" height="68" />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px 6px !important',
                      height: '22px',
                      background: '#CCEEF0',
                      borderRadius: '4px',
                      color: '#00AAB5',
                      position: 'relative',
                      top: '-15px'
                    }}
                  >
                    <InputLabel style={{ color: '#00AAB5' }}>
                      {item?.require_credit}
                    </InputLabel>
                    <Star style={{ width: '11px', height: '15px' }} />
                  </Box>
                </IconButton>
              );
            })}
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
            <img src={Chest} alt="awards" />
            <Box sx={{ display: 'inline-flex' }}>
              <InputLabelHeader style={{ color: '#00346D', fontWeight: 500 }}>
                امتیاز مورد نیاز:
              </InputLabelHeader>
              <InputLabelHeader
                style={{ color: '#00346D', fontSize: '18px', fontWeight: 700 }}
              >
                {` ${selectedBox?.require_credit} امتیاز`}
              </InputLabelHeader>
            </Box>

            <InputLabelHeader
              style={{
                color: '#00346D',
                fontWeight: '500',
                textAlign: 'center'
              }}
            >
              آیا از دریافت این صندوق مطمئن هستید؟
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
                httpService
                  .post(
                    `${API_BASE_URL}/api/club/gift_box/purchase_gift_box/`,
                    {
                      gift_box_id: selectedBox.id
                    }
                  )
                  .then(res => {
                    if (res.status === 200) {
                      setOpenFirst(false);
                      setOpenSecond(true);
                      setScore();
                    }
                  })
                  .catch(err => {
                    if (err.response.status === 417) {
                      setOpenError(true);
                      setError(err.response.data.error);
                      setOpenFirst(false);
                    }
                  });
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
            background: '#FFFFFF'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px',
              gap: '15px',
              width: '100%'
            }}
          >
            <img src={ChestWinOpen} alt="awardsopen" />
            <InputLabelHeader
              style={{
                marginBottom: 0,
                fontSize: '24px',
                color: '#00346D'
                // lineHeight: '34px'
              }}
            >
              تبریک
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              شما برنده ی جوایز زیر شده اید!
            </InputLabel>
          </Box>
          <Box
            sx={{
              borderTop: '0.5px solid #D3D2D2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px 0px',
              gap: '40px',
              width: '100%'
            }}
          >
            <InputLabelHeader style={{ marginBottom: 0, color: '#00346D' }}>
              جوایز صندوق
            </InputLabelHeader>
            <Grid
              container
              justifyContent={'center'}
              sx={{
                padding: '0px',
                gap: '16px'
              }}
            >
              {selectedBox &&
                selectedBox.gifts_list.length > 0 &&
                selectedBox.gifts_list.map((item, key) => {
                  return (
                    <Grid
                      item
                      xs={3}
                      justifyContent="center"
                      alignContent={'center'}
                      sx={{
                        padding: '10px 16px',
                        gap: '10px',
                        background: '#FFFFFF',
                        boxShadow: '2px 2px 8px rgba(146, 146, 146, 0.25)',
                        borderRadius: '8px'
                      }}
                      key={key}
                      onClick={() => {
                        setOpenSecond(false);
                        history.push('/club/getAwards');
                      }}
                    >
                      <img src={item.image} width="44.09px" height="60px" />
                    </Grid>
                  );
                })}
            </Grid>
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
              disabled={false}
              variant="contained"
              onClick={() => history.push('/club/received')}
            >
              {'مشاهده جوایز در لیست دریافتی ها'}
            </LinkButton>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={openError}
        onClose={() => setOpenError(false)}
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
            background: '#FFFFFF'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px',
              gap: '15px',
              width: '100%'
            }}
          >
            <img src={ErrorImg} alt="awardsopen" />
            {/* <InputLabelHeader
              style={{
                marginBottom: 0,
                fontSize: '24px',
                color: '#00346D'
                // lineHeight: '34px'
              }}
            >
              تبریک
            </InputLabelHeader> */}
            <InputLabel style={{ color: '#00346D' }}>{error}</InputLabel>
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
              variant="contained"
              onClick={() => {
                setOpenError(false);
              }}
            >
              {'متوجه شدم'}
            </ConfirmButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
