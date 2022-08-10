import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ChevronLeft } from 'react-feather';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Drawer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Rating from '@mui/material/Rating';
import MomentFa from 'src/utils/MomentFa';

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
export default function CommentItem({ data, selected, setSelected }) {
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
          width: '100%',
          height: '114px',
          background:
            selected && data.id === selected.id ? '#CCEEF0' : '#FFFFFF',
          boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={() => {
          setSelected(data);
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
            height: '80px'
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
              {data.title}
            </InputLabel>
            {data.response !== null ? (
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
              {MomentFa(data.create_date)}
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
    </>
  );
}
