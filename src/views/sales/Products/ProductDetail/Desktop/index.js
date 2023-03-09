import React, { useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Divider,
  Drawer,
  Grid,
  TextField,
  Button,
  InputAdornment
} from '@mui/material';
import IconButton from 'src/components/Desktop/Button/Icon';
import LinkButton from 'src/components/Desktop/Button/Link';
import InputLabel from 'src/components/Desktop/InputLabel';
import Received from 'src/assets/img/icons/received.svg';
import Presents from 'src/assets/img/icons/presents.svg';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import makeStyles from '@mui/styles/makeStyles';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useHistory } from 'react-router-dom';
import useScore from 'src/hooks/useScore';
import ErrorImg from 'src/assets/img/icons/error.svg';
import { ChevronRight } from 'react-feather';
import ShopProducts from 'src/assets/img/shopProducts.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import SaleSubCategory from 'src/assets/img/SaleSubCategory.svg';
import CancelImg from 'src/assets/img/cancel.svg';
import LargeSize from 'src/assets/img/largeSize.svg';
import SmallSize from 'src/assets/img/smallSize.svg';
import useSaleOrder from 'src/hooks/useSaleOrder';
import SwiperImg from './Swiper';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function GetAwardDesktop(props) {
  const data = props.location.state;
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [unitSelected, setUnitSelected] = useState('SINGULAR');
  const [count, setCount] = useState(0);
  const { order, setOrder, getOrder } = useSaleOrder();
  const [selected, setSelected] = useState(null);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    getOrder();
    httpService
      .get(
        `${API_BASE_URL}/api/products/product/get_products?ref=shop&type_id=${data.id}`
      )
      .then(res => {
        setProduct(res.data);
      });
    setUnitSelected('SINGULAR');
  }, []);

  useEffect(() => {
    if (order) {
      setSelectedList(order.products.map(item => item.code));
    }
  }, [order]);

  useEffect(() => {
    if (open === true) {
      setUnitSelected('SINGULAR');
    }
  }, [open]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginTop: '70px',
          padding: '20px',
          marginLeft: '140px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '40px 70px 30px',
            backgroundColor: 'white',
            height: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{ display: 'inline-flex' }}
              onClick={() => {
                history.push('/sale/products/');
              }}
            >
              <ChevronRight color="#335D8A" />
              <InputLabel
                style={{ color: '#335D8A', fontWeight: 400, fontSize: '16px' }}
              >
                لیست محصولات
              </InputLabel>
            </Box>
            <ConfirmButton
              style={{
                backgroundColor: '#00346D',
                width: '170px',
                boxShadow: '0px -4px 6px rgba(205, 205, 205, 0.25)',
                borderRadius: '8px'
              }}
              onClick={() => history.push('/sale/products/order')}
            >
              <img src={ShopProducts} style={{ marginLeft: '4px' }} />
              <InputLabel
                style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 400,
                  cursor: 'pointer'
                }}
              >
                سبد سفارشات
              </InputLabel>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  margin: '0px 5px',
                  background: '#CCD6E2',
                  color: '#00346D',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}
              >
                {order ? order.count : 0}
              </Box>
            </ConfirmButton>
          </Box>
          <Box
            sx={{
              padding: '20px 40px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                xs={4}
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // gap: 2,
                  padding: '0px 50px'
                  // marginRight: '20px'
                }}
              >
                {/* <Box
                  sx={{
                    backgroundColor: '#E6EBF0',
                    padding: '40px',
                    borderRadius: '4px'
                  }}
                >
                  <img
                    src={data?.images[0]?.file}
                    style={{ width: '160px', height: '120px' }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 1
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#E6EBF0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '18px 18px',
                      borderRadius: '4px'
                    }}
                  >
                    <img
                      src={data?.images[0]?.file}
                      style={{ width: '40px', height: '40px' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#E6EBF0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '18px 18px',
                      borderRadius: '4px'
                    }}
                  >
                    <img
                      src={data?.images[0]?.file}
                      style={{ width: '40px', height: '40px' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#E6EBF0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '18px 18px',
                      borderRadius: '4px'
                    }}
                  >
                    <img
                      src={data?.images[0]?.file}
                      style={{ width: '40px', height: '40px' }}
                    />
                  </Box>
                </Box> */}
                {/* <Box sx={{ padding: '10px' }}> */}
                <SwiperImg data={data} />
                {/* </Box> */}
              </Grid>
              <Grid xs={8} item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '0px 20px',
                    background: '#FFFFFF',
                    borderRadius: '30px 30px 0px 0px',
                    width: '100%',
                    overflow: 'auto'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                      width: '100%'
                    }}
                  >
                    <InputLabelHeader
                      style={{ color: '#00346D', fontSize: '14px' }}
                    >
                      {data?.name_translate?.item_fa}
                    </InputLabelHeader>

                    <InputLabel style={{ fontSize: '16px', color: '#335D8A' }}>
                      مشخصات
                    </InputLabel>
                    <Grid container spacing={2}>
                      <Grid xs={6} item>
                        <Box sx={{ display: 'inline-flex' }}>
                          <img
                            src={SaleCategory}
                            style={{ marginLeft: '2px' }}
                          />
                          <InputLabel
                            style={{ color: '#335D8A', fontSize: '12px' }}
                          >
                            {data?.category_detail?.translate_detail?.item_fa}
                          </InputLabel>
                        </Box>
                      </Grid>
                      <Grid xs={6} item>
                        <Box sx={{ display: 'inline-flex' }}>
                          <img
                            src={SaleSubCategory}
                            style={{ marginLeft: '2px' }}
                          />
                          <InputLabel
                            style={{ color: '#335D8A', fontSize: '12px' }}
                          >
                            {
                              data?.subcategory_detail?.translate_detail
                                ?.item_fa
                            }
                          </InputLabel>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ color: '#D3D2D2' }} variant="middle" />

                    <InputLabelHeader
                      style={{
                        color: '#00346D',
                        fontSize: '14px',
                        marginTop: '10px'
                        // lineHeight: '25px'
                      }}
                    >
                      اندازه ها
                    </InputLabelHeader>
                    <Grid container spacing={2}>
                      {product &&
                        product.map((item, key) => {
                          return (
                            <Grid item xs={2}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding: '6px',
                                  gap: '10px',

                                  // width: '98.67px',
                                  height: '67px',
                                  border: selectedList?.includes(item.code)
                                    ? '0.8px solid #33BBC4'
                                    : '0.5px solid #CCD6E2',
                                  background: selectedList?.includes(item.code)
                                    ? '#DDF5F6'
                                    : 'white',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                                onClick={() => {
                                  setOpen(true);
                                  setSelected(item);
                                  if (order) {
                                    setCount(
                                      order.products.filter(
                                        f => f.code === item.code
                                      )[0]?.package_quantity
                                    );
                                    setUnitSelected(
                                      order.products
                                        .filter(f => f.code === item.code)[0]
                                        ?.package_type.toUpperCase()
                                    );
                                  }
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '0px 4px',
                                    gap: '4px',
                                    background: selectedList?.includes(
                                      item.code
                                    )
                                      ? 'white'
                                      : '#DDF5F6',
                                    borderRadius: '4px',
                                    width: '100%',
                                    direction: 'rtl'
                                  }}
                                >
                                  {item.size}
                                </Box>
                                <InputLabel
                                  style={{ color: '#335D8A', fontSize: '14px' }}
                                >
                                  {item.code}
                                </InputLabel>
                              </Box>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Box>
                  {/* {selectedList.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        gap: 5,
                        marginTop: '20px'
                        // padding: '20px 0px'
                      }}
                    >
                      <Box
                        sx={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        <Box
                          sx={{
                            backgroundColor: '#DDF5F6',
                            color: '#00AAB5',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            margin: '0px 5px',
                            fontSize: '18px',
                            fontWeight: 500
                          }}
                        >
                          {selectedList.length}
                        </Box>
                        <InputLabel style={{ color: '#335D8A' }}>
                          محصول انتخاب شده
                        </InputLabel>
                      </Box>
                      <ConfirmButton
                        style={{ width: '120px' }}
                        onClick={() => history.push('/sale/products/order')}
                      >
                        ثبت سفارش
                      </ConfirmButton>
                    </Box>
                  )} */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <CustomizedDialogs
        title={'انتخاب محصول'}
        open={open}
        handleClose={() => setOpen(false)}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 15px 0px !important',
              gap: '20px',
              background: '#FFFFFF',
              width: '350px'
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
                تعداد مورد نظر خود از محصول را مشخص کنید:
              </InputLabel>

              {selected && selected.small_plural_package_qty > 0 && (
                <Box style={{ display: 'inline-flex' }}>
                  <img src={SmallSize} />
                  <InputLabel
                    style={{
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#00346D'
                    }}
                  >
                    {selected.small_plural_package_qty +
                      ' ' +
                      selected.singular_package_detail.translate_detail.item_fa}
                  </InputLabel>
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#335D8A'
                    }}
                  >
                    {' در ' +
                      selected.small_plural_package_detail.translate_detail
                        .item_fa}
                  </InputLabel>
                </Box>
              )}
              {selected && selected.large_plural_package_qty > 0 && (
                <Box style={{ display: 'inline-flex' }}>
                  <img src={SmallSize} />
                  <InputLabel
                    style={{
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#00346D'
                    }}
                  >
                    {selected.large_plural_package_qty +
                      ' ' +
                      selected.singular_package_detail.translate_detail.item_fa}
                  </InputLabel>
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#335D8A'
                    }}
                  >
                    {' در ' +
                      selected.large_plural_package_detail.translate_detail
                        .item_fa}
                  </InputLabel>
                </Box>
              )}

              <Divider color={'#99AEC5'} />

              <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <InputLabel
                  style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#7B7979'
                  }}
                >
                  واحد
                </InputLabel>
                {selected && (
                  <ButtonGroup
                    fullWidth
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="contained"
                    sx={{
                      gap: 2,
                      boxShadow: 'none',
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                    id="input"
                  >
                    <Button
                      sx={{
                        backgroundColor:
                          unitSelected === 'SINGULAR' ? '#DFF2F2' : '#E6EBF0',
                        // border: '1px solid #CCEEF0 !important',
                        borderRadius: '4px !important',
                        padding: '10px 12px',
                        height: '48px',
                        fontStyle: 'normal',
                        fontWeight: unitSelected === 'SINGULAR' ? 600 : 400,
                        fontSize: '16px',
                        width: '80px',
                        height: '44px',
                        color:
                          unitSelected === 'SINGULAR' ? '#231F20' : '#335D8A',
                        fontFamily: 'IRANSans',

                        '&:hover': {
                          color: '#231F20 !important',
                          backgroundColor: '#DFF2F2 !important',
                          fontWeight: 600,
                          fontSize: '16px'
                        }
                      }}
                      onClick={() => {
                        setUnitSelected('SINGULAR');
                      }}
                    >
                      {
                        selected.singular_package_detail.translate_detail
                          .item_fa
                      }
                    </Button>
                    {/* )} */}
                    {selected.small_plural_package_qty > 0 && (
                      <Button
                        // key={index}
                        sx={{
                          backgroundColor:
                            unitSelected === 'SMALL' ? '#DFF2F2' : '#E6EBF0',
                          // border: '1px solid #CCEEF0 !important',
                          borderRadius: '4px !important',
                          padding: '10px 12px',
                          height: '48px',
                          fontStyle: 'normal',
                          fontWeight: unitSelected === 'SMALL' ? 600 : 400,
                          fontSize: '16px',
                          width: '104px',
                          height: '44px',
                          color:
                            unitSelected === 'SMALL' ? '#231F20' : '#335D8A',
                          fontFamily: 'IRANSans',

                          '&:hover': {
                            color: '#231F20 !important',
                            backgroundColor: '#DFF2F2 !important',
                            fontWeight: 600,
                            fontSize: '16px'
                          }
                        }}
                        onClick={() => {
                          setUnitSelected('SMALL');
                        }}
                      >
                        {
                          selected.small_plural_package_detail.translate_detail
                            .item_fa
                        }
                      </Button>
                    )}
                    {selected.large_plural_package_qty > 0 && (
                      <Button
                        // key={index}
                        sx={{
                          backgroundColor:
                            unitSelected === 'LARGE' ? '#DFF2F2' : '#E6EBF0',
                          // border: '1px solid #CCEEF0 !important',
                          borderRadius: '4px !important',
                          padding: '10px 12px',
                          height: '48px',
                          fontStyle: 'normal',
                          fontWeight: unitSelected === 'LARGE' ? 600 : 400,
                          fontSize: '16px',
                          width: '104px',
                          height: '44px',
                          color:
                            unitSelected === 'LARGE' ? '#231F20' : '#335D8A',
                          fontFamily: 'IRANSans',

                          '&:hover': {
                            color: '#231F20 !important',
                            backgroundColor: '#DFF2F2 !important',
                            fontWeight: 600,
                            fontSize: '16px'
                          }
                        }}
                        onClick={() => {
                          setUnitSelected('LARGE');
                        }}
                      >
                        {
                          selected.large_plural_package_detail.translate_detail
                            .item_fa
                        }
                      </Button>
                    )}
                  </ButtonGroup>
                )}
              </Box>

              <Box sx={{ mt: 1, mb: 1, width: '100%' }}>
                <InputLabel style={{ color: '#A7A5A6' }}>تعداد</InputLabel>
                <TextField
                  id="name"
                  aria-describedby="my-helper-text"
                  fullWidth
                  placeholder="تعداد"
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '3px 3px'
                  }}
                  value={count}
                  onChange={event => setCount(event.target.value)}
                  // onBlur={handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" tabIndex={-1}>
                        <InputLabel
                          style={{
                            color: '#335D8A',
                            fontSize: '16px',
                            fontWeight: 400
                          }}
                        >
                          {selected && unitSelected === 'SINGULAR'
                            ? selected.singular_package_detail.translate_detail
                                .item_fa
                            : unitSelected === 'SMALL'
                            ? selected &&
                              selected.small_plural_package_qty > 0 &&
                              selected.small_plural_package_detail
                                .translate_detail.item_fa
                            : selected &&
                              selected.large_plural_package_qty > 0 &&
                              selected.large_plural_package_detail
                                .translate_detail.item_fa}
                        </InputLabel>
                      </InputAdornment>
                    )
                  }}
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
                  background: '#FEEEEC',
                  color: '#F4777C',
                  border: '1px solid #FEEEEC',
                  fontSize: '12px'
                }}
                onClick={() => {
                  httpService
                    .post(`${API_BASE_URL}/api/orders/remove_product/`, {
                      order_num: order.order_num,
                      code: selected.code
                    })
                    .then(res => {
                      if (res.status === 200) {
                        getOrder();
                        setOpen(false);
                      }
                    });
                }}
              >
                <img src={CancelImg} />
                {'حذف از سبد خرید'}
              </ConfirmButton>
              <ConfirmButton
                disabled={false}
                onClick={() => {
                  if (order) {
                    httpService
                      .post(`${API_BASE_URL}/api/orders/add_product/`, {
                        order_num: order.order_num,
                        products: [
                          {
                            code: selected.code,
                            quantity: count,
                            package: unitSelected
                          }
                        ]
                      })
                      .then(res => {
                        if (res.status === 200) {
                          setOpen(false);
                          setOrder(res.data);
                          setSelected(null);
                        }
                      });
                  } else {
                    httpService
                      .post(`${API_BASE_URL}/api/orders/`, {
                        products: [
                          {
                            code: selected.code,
                            quantity: count,
                            package: unitSelected
                          }
                        ]
                      })
                      .then(res => {
                        if (res.status === 201) {
                          setOpen(false);
                          setOrder(res.data);
                          setSelected(null);
                        }
                      });
                  }
                }}
              >
                {'ثبت'}
              </ConfirmButton>
            </Box>
          </Box>
        }
      />
    </>
  );
}
