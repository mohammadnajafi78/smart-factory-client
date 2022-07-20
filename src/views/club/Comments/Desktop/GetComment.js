import React from 'react';
import { Box, Rating } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import makeStyles from '@mui/styles/makeStyles';

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
export default function GetCommentDesktop({ selected }) {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 30px 0px !important',
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
          //   width: '320px',
          height: '260px',
          background: '#FAFAFA',
          border: '0.5px solid #D3D2D2',
          borderRadius: '8px',
          width: '100%'
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
            borderBottom: '0.5px solid #D3D2D2',
            width: '100%'
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
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است.
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
      {/* <Box
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
      </Box> */}
    </Box>
  );
}
