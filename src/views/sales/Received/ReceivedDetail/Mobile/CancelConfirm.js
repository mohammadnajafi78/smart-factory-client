import React, { useState } from 'react';
import { Box, Divider, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));

export default function CancelConfirm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          // height: 'inherit',
          gap: '10px',
          margin: '20px 0px',
          borderRadius: '8px'
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <InputLabel style={{ fontSize: '14px' }}>
              علت عدم تایید سفارش را وارد کنید:
            </InputLabel>

            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>توضیحات</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="...بنویسید"
                rows={4}
                multiline
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                value={comment}
                onChange={event => setComment(event.target.value)}
                // onBlur={handleBlur}
              />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'flex-end',
              // alignItems: 'flex-end',
              //   width: '50%',
              gap: 2
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              style={{ width: '150px' }}
              onClick={() => {
                //   history.push('/sale/products/order/1');
                props.setSteps(0);
              }}
              type={'button'}
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton
              style={{ width: '150px' }}
              disabled={comment == null}
              onClick={() => {
                httpService
                  .post(`${API_BASE_URL}/api/orders/update_order_state/`, {
                    order_num: props.location.state.order_num,
                    order_action: 'Reject',
                    comment: comment
                  })
                  .then(res => {
                    if (res.status === 200) {
                      history.push('/sale/received');
                    }
                  })
                  .catch(ex => {
                    if (ex.response.status === 417) {
                      enqueueSnackbar(ex.response.data.error, {
                        variant: 'error'
                      });
                    } else {
                      enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                        variant: 'error'
                      });
                    }
                  });
              }}
            >
              {'ثبت'}
            </ConfirmButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
