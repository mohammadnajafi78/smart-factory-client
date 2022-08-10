import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';
import { ChevronLeft, Star } from 'react-feather';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import Received from 'src/assets/img/icons/received.svg';
import makeStyles from '@mui/styles/makeStyles';
import { height } from '@mui/system';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';
import QRCode from 'react-qr-code';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedItemMobile(props) {
  const [data, setData] = useState(props.location.state);
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState(null);
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 12px 0px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '16px',
            gap: '10px',
            width: '100%',
            height: '114px',
            background: '#FFFFFF',
            boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
            borderRadius: '8px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // padding: '10px 15px',
              gap: '10px',
              borderRadius: '8px'
            }}
          >
            <img
              src={data.gift_data.image}
              alt={data.gift_data.name}
              style={{ width: '74px', height: '100px' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '22px',

              width: '100%',
              height: '70px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0px',
                gap: '8px',
                borderBottom: '0.5px solid #D7D7D7',
                paddingBottom: '8px',

                width: '100%',
                height: '25px'
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
                {data.gift_data.name}
              </InputLabel>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px 6px !important',
                  //   gap: '2px',
                  // width: 54.1px,
                  height: '22px',
                  background: '#CCEEF0',
                  borderRadius: '4px',
                  color: '#00AAB5'
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  {data.gift_data.credit}
                </InputLabel>
                <Star style={{ width: '27px', height: '18px' }} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '8px',

                  width: '100%',
                  height: '20px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#808286'
                  }}
                >
                  {'اعتبار تا '}
                  {MomentFa(data.expire_date)}
                </InputLabel>
              </Box>
              <InputLabel
                style={{ fontWeight: 400, fontSize: '10px', color: '#828282' }}
              >
                {`تاریخ کسب: ${MomentFa(data.create_date)}`}
              </InputLabel>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '16px 0px',
            width: '100%'
            // gap: '480px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '16px',
              height: '470px'
            }}
          >
            <InputLabelHeader>توضیحات</InputLabelHeader>
            <InputLabel>{data.gift_data.description}</InputLabel>
          </Box>
          <LinkIconButton
            onClick={() => {
              setOpen(true);
              httpService
                .get(
                  `${API_BASE_URL}/api/club/user_gifts/get_gift_qrcode/?gift_id=${data.id}`
                )
                .then(res => {
                  if (res.status === 200) {
                    setQr(res.data.qr_code);
                  }
                });
            }}
            style={{
              position: 'absolute',
              bottom: '90px',
              width: '93%'
            }}
          >
            <img
              src={Received}
              width="26px"
              height="20px"
              style={{ color: 'white' }}
            />
            <div>انتقال جایزه</div>
          </LinkIconButton>
        </Box>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={open}
        handleClose={() => {
          setOpen(false);
          setQr(null);
        }}
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
            padding: '30px 16px 40px',
            gap: '20px',
            background: '#FFFFFF'
          }}
        >
          <InputLabelHeader style={{ color: '#00346D' }}>
            {data.gift_data.name}
          </InputLabelHeader>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <InputLabel>
              1- گیرنده جایزه، بروی دکمه “دریافت جایزه” بزند.
            </InputLabel>
            <InputLabel>2- کد QR زیر را اسکن کند.</InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'space-between',
              gap: 2,
              // borderTop: '0.5px solid #D3D2D2',
              // padding: '12px 16px',
              width: '328px',
              height: '328px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* <img src={qr} width="328px" height="328px" /> */}
            {qr && <QRCode value={qr} />}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
