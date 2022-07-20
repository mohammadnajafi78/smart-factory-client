import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ChevronLeft, Star } from 'react-feather';
import { NavLink } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import iphone13 from 'src/assets/img/icons/iphone13.jpeg';
import { Drawer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import LinkButton from 'src/components/Mobile/Button/Link';
import Rating from '@mui/material/Rating';
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  },
  rating: {
    '& .MuiRating-iconFilled': {
      color: '#D3D2D2'
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47'
    }
  }
}));
export default function CommentItem({ data }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '12px',
          gap: '15px',
          width: '93%',
          height: '114px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
          borderRadius: '8px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '38px',

            width: '100%',
            height: '90px'
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
              height: '25px'
            }}
          >
            <InputLabel
              style={{ fontWeight: 500, fontSize: '16px', color: '#00346D' }}
            >
              {data.name}
            </InputLabel>
            {data.seen === true ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2px 6px !important',
                  height: '22px',
                  background: '#CCEEF0',
                  borderRadius: '4px',
                  color: '#00AAB5'
                }}
              >
                <InputLabel style={{ color: '#00AAB5', fontSize: '12px' }}>
                  مشاهده شده
                </InputLabel>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2px 6px !important',
                  height: '22px',
                  background: '#F3F3F3;',
                  borderRadius: '4px',
                  color: '#A7A5A6'
                }}
              >
                <InputLabel style={{ color: '#A7A5A6', fontSize: '12px' }}>
                  بدون پاسخ
                </InputLabel>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',

              width: '100%',
              height: '25px'
            }}
          >
            <InputLabel
              style={{ fontWeight: 400, fontSize: '12px', color: '#808286' }}
            >
              {data.expireDate}
            </InputLabel>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: '#7B7979',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400,
                cursor: 'pointer'
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              مشاهده
              <ChevronLeft color="#7B7979" height={'15px'} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => setOpen(false)}
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
            padding: '24px 0px 0px !important',
            gap: '20px',
            background: '#FFFFFF',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0px',
              gap: '12px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0px 16px',
                gap: '8px',
                width: '100%'
              }}
            >
              <InputLabelHeader style={{ color: '#00346D', marginBottom: 0 }}>
                دفاتر و کارشناس فروش
              </InputLabelHeader>
              <InputLabel style={{ color: '#808286', fontSize: '14px' }}>
                ارسال : ۲/۲۰
              </InputLabel>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '10px 16px'
              }}
            >
              <InputLabel style={{ color: '#7B7979', fontSize: '14px' }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است.
              </InputLabel>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              gap: '15px',
              width: '320px',
              height: '260px',
              background: '#FFFFFF',
              border: '0.5px solid #D3D2D2',
              borderRadius: '8px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '12px',
                paddingBottom: '15px',
                borderBottom: '0.5px solid #D3D2D2'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px 16px',
                  gap: '8px',
                  width: '100%'
                }}
              >
                <InputLabelHeader
                  style={{
                    color: '#ED1C24',
                    marginBottom: 0,
                    fontSize: '16px'
                  }}
                >
                  پاسخ کارشناس
                </InputLabelHeader>
                <InputLabel style={{ color: '#808286', fontSize: '14px' }}>
                  ارسال : ۲/۲۰
                </InputLabel>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '10px 16px'
                }}
              >
                <InputLabel style={{ color: '#4F4C4D', fontSize: '14px' }}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است.
                </InputLabel>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                width: '100%',
                gap: 1
              }}
            >
              <InputLabel>به پاسخ کارشناس امتیاز دهید:</InputLabel>
              <Rating
                name="simple-controlled"
                value={0}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                classes={{ root: classes.rating }}
              />
            </Box>
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
            <ConfirmButton onClick={() => setOpen(false)}>بستن</ConfirmButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
