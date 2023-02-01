import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Drawer, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import SaleSubCategory from 'src/assets/img/SaleSubCategory.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { Download, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import ProductList from './ProductList';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function Confirmation(props) {
  const data = props.data;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '90px 20px 20px 20px',
          justifyContent: 'space-between',
          height: 'inherit',
          backgroundColor: 'white'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px'
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
                src={data?.supplier_info?.user_profile_image}
                // alt={}
                style={{ width: '44px', height: '60px' }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '12px',

                width: '100%',
                height: '70px'
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
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#00346D',
                    lineHeight: '17px'
                  }}
                >
                  {data?.supplier_info?.first_name +
                    ' ' +
                    data?.supplier_info?.last_name}
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3px 6px !important',
                    background: '#CCEEF0',
                    borderRadius: '4px',
                    color: '#00AAB5'
                  }}
                >
                  <InputLabel
                    style={{
                      color: '#00AAB5',
                      fontSize: '12px',
                      textAlign: 'center'
                    }}
                  >
                    {data?.current_state?.label}
                  </InputLabel>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  // backgroundColor: '#DDF5F6',
                  color: '#335D8A',
                  width: '100%',
                  // height: '25px',
                  padding: '3px 6px',
                  borderRadius: '4px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#335D8A',
                    lineHeight: '16px'
                  }}
                >
                  {`ثبت: ${MomentFa(data?.create_date)}`}
                </InputLabel>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ m: 2 }} />

          <ProductList data={data} />
        </Box>

        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
            type={'button'}
          >
            {'عدم تایید سفارش'}
          </ConfirmButton>
          <ConfirmButton
            onClick={() =>
              history.push({ pathname: '/sale/received/confirm', state: data })
            }
          >
            {'تایید سفارش'}
          </ConfirmButton>
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
                gap: 2
              }}
            >
              <ConfirmButton
                disabled={false}
                variant="outlined"
                style={{ width: '150px' }}
                onClick={() => {
                  setOpen(false);
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
                      order_num: data.order_num,
                      order_action: 'Reject',
                      comment: comment
                    })
                    .then(res => {
                      if (res.status === 200) {
                        history.push('/sale/received');
                      }
                    });
                }}
              >
                {'ثبت'}
              </ConfirmButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
