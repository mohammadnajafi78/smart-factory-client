import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ChevronLeft } from 'react-feather';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Drawer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import Rating from '@mui/material/Rating';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import MomentFa from 'src/utils/MomentFa';
import { useSnackbar } from 'notistack';

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
      color: '#faaf00'
    }
  }
}));
export default function CommentItem({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(data.rate);
  const { enqueueSnackbar } = useSnackbar();

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
              {data?.subject}
            </InputLabel>
            {data.status.toLowerCase() === 'answered' ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3px 6px !important',
                  // height: '22px',
                  background: '#CCEEF0',
                  borderRadius: '4px',
                  color: '#00AAB5'
                }}
              >
                <InputLabel style={{ color: '#00AAB5', fontSize: '12px' }}>
                  پاسخ داده شده
                </InputLabel>
              </Box>
            ) : data.status.toLowerCase() === 'closed' ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3px 6px !important',
                  // height: '22px',
                  background: '#FDE8E8;',
                  borderRadius: '4px',
                  color: '#A7A5A6'
                }}
              >
                <InputLabel style={{ color: '#F4777C', fontSize: '12px' }}>
                  بسته شده
                </InputLabel>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3px 6px !important',
                  // height: '22px',
                  background: '#F3F3F3;',
                  borderRadius: '4px',
                  color: '#A7A5A6'
                }}
              >
                <InputLabel style={{ color: '#A7A5A6', fontSize: '12px' }}>
                  در انتظار پاسخ
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
                history.push({
                  pathname: '/club/newComment',
                  state: {
                    data: data
                  }
                });
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
              alignItems: 'flex-start',
              padding: '0px',
              gap: '12px',
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
              <InputLabelHeader style={{ color: '#00346D', marginBottom: 0 }}>
                {data.title}
              </InputLabelHeader>
              <InputLabel style={{ color: '#808286', fontSize: '14px' }}>
                {`ارسال: ${MomentFa(data.create_date)}`}
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
                {data.description}
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
                  {data.response && data.response}
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
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                  httpService
                    .patch(`${API_BASE_URL}/api/club/suggestions/${data.id}/`, {
                      rate: newValue
                    })
                    .then(res => {
                      if (res.status === 200) {
                        alert('success');
                      }
                    })
                    .catch(ex => {
                      if (ex.response.status === 417) {
                        enqueueSnackbar(ex.response.data.error, {
                          variant: 'error'
                        });
                      } else {
                        enqueueSnackbar(
                          'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                          {
                            variant: 'error'
                          }
                        );
                      }
                    });
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
