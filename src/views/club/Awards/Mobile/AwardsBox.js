import React, { useState } from 'react';
import { Box, Divider, Drawer, Grid, IconButton } from '@mui/material';
import InputLabel from 'src/components/Mobile/InputLabel';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import LinkButton from 'src/components/Mobile/Button/Link';
import makeStyles from '@mui/styles/makeStyles';
import Chest from 'src/assets/img/icons/chest-win-close.svg';
import ChestWinOpen from 'src/assets/img/icons/chest-win-open.svg';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { useHistory } from 'react-router-dom';
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
  const [awards, setAwards] = useState(['1', '2', '3']);
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
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '10px 15px',
          gap: '10px',

          width: '100%',
          height: '122px',
          marginTop: '6px'
        }}
      >
        <InputLabel style={{ fontSize: '18px' }}>جوایز</InputLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 30px',
            gap: '15px',

            width: '100%',
            height: '68px'
          }}
        >
          {awards.map((item, key) => {
            return (
              <IconButton
                key={key}
                onClick={() => {
                  setOpenFirst(true);
                }}
              >
                {/* <Home /> */}
                <img src={Chest} width="74" height="68" />
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
            <InputLabelHeader>
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
            <ConfirmButton disabled={false} variant="outlined">
              {'خیر'}
            </ConfirmButton>
            <ConfirmButton
              disabled={false}
              onClick={() => {
                setOpenFirst(false);
                setOpenSecond(true);
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
              {awardsOfBox.map((item, key) => {
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
                    <img src={iphone13} width="44.09px" height="60px" />
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
            <LinkButton disabled={false} variant="contained">
              {'مشاهده جوایز در لیست دریافتی ها'}
            </LinkButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
