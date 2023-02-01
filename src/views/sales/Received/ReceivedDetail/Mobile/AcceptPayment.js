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
  const data = props.location.state;
  const classes = useStyles();
  const [locations, setLocations] = useState([1, 2]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // const [selectedList, setSelectedList] = useState([]);
  // const [units, setUnits] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // httpService
    //   .get(
    //     `${API_BASE_URL}/api/locationss/locations/get_locationss?ref=shop&type_id=${data.id}`
    //   )
    //   .then(res => {
    //     setlocations(res.data);
    //   });
  }, []);

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
                  <InputLabel style={{ color: '#00AAB5' }}>
                    {data?.current_state}
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

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '15px'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'inline-flex' }}>
                {/* <img src={}/> */}
                <InputLabel
                  style={{
                    color: '#00346D',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  بوشن پرسی
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontSize: '14px',
                    fontWeight: 300
                  }}
                >{`(${'سایز'})`}</InputLabel>
              </Box>
              <InputLabel
                style={{
                  color: '#00346D',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                24000تومان
              </InputLabel>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'inline-flex' }}>
                {/* <img src={}/> */}
                <InputLabel
                  style={{
                    color: '#00346D',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  ۳
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#00AAB5',
                    fontSize: '14px',
                    fontWeight: 300
                  }}
                >
                  x
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontSize: '14px',
                    fontWeight: 300
                  }}
                >
                  {'جعبه'}
                </InputLabel>
              </Box>
              <InputLabel
                style={{
                  color: '#335D8A',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                24000تومان
              </InputLabel>
            </Box>
          </Box>

          <ConfirmButton
            style={{ color: '#00AAB5', backgroundColor: '#DDF5F6' }}
          >
            <Download />
            دانلود فایل درخواست
          </ConfirmButton>
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
              // history.push('/sale/products/order/1');
            }}
            type={'button'}
          >
            {'عدم تایید سفارش'}
          </ConfirmButton>
          <ConfirmButton onClick={() => history.push('/sale/received/confirm')}>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 15px 0px !important',
            // gap: '10px',
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
              gap: '10px',
              width: '100%'
            }}
          >
            <InputLabel style={{ color: '#00346D' }}>
              آدرس جدید را وارد کنید:
            </InputLabel>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>نام آدرس</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="نام آدرس"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>کد پستی</InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="کد پستی"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mt: 1, width: '100%' }}>
              <InputLabel style={{ color: '#A7A5A6' }}>
                توضیحات بیشتر
              </InputLabel>
              <TextField
                id="name"
                aria-describedby="my-helper-text"
                fullWidth
                placeholder="توضیحات بیشتر"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '3px 3px'
                }}
                // value={values.name}
                // onChange={handleChange}
                // onBlur={handleBlur}
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
            <ConfirmButton
              disabled={false}
              // variant="outlined"
              style={{
                background: '#FFFFFF',
                color: '#6685A7',
                border: '0.8px solid #6685A7'
              }}
              // onClick={() => setOpen(false)}
            >
              <img src={CancelImg} />
              {'عدم تایید'}
            </ConfirmButton>
            <ConfirmButton disabled={false} onClick={() => {}}>
              {'تایید سفارش'}
            </ConfirmButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
