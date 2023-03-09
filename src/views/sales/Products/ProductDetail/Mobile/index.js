import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Drawer,
  TextField,
  InputAdornment,
  ButtonGroup,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import SaleSubCategory from 'src/assets/img/SaleSubCategory.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import LargeSize from 'src/assets/img/largeSize.svg';
import SmallSize from 'src/assets/img/smallSize.svg';
import useSaleOrder from 'src/hooks/useSaleOrder';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ProductDetailMobile(props) {
  const data = props.location.state;
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [units, setUnits] = useState(null);
  const [count, setCount] = useState(0);
  const [unitSelected, setUnitSelected] = useState('SINGULAR');
  const { order, setOrder, getOrder } = useSaleOrder();

  const history = useHistory();

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
          flexDirection: 'column',
          paddingTop: '50px',
          backgroundColor: '#E5E5E5'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0px 0px',
            backgroundColor: '#E5E5E5'
          }}
        >
          <img
            src={data?.images[0]?.url}
            style={{ width: '120px', height: '120px' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '20px',
            // gap: '12px',
            background: '#FFFFFF',
            borderRadius: '30px 30px 0px 0px',
            width: '100%',
            height: '400px',
            overflow: 'auto',
            marginTop: '20px',
            position: 'absolute',
            bottom: '0%'
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
            <InputLabelHeader style={{ color: '#00346D', fontSize: '14px' }}>
              {data?.name_translate?.item_fa}
            </InputLabelHeader>
            <Box sx={{ display: 'inline-flex' }}>
              <img src={SaleCategory} style={{ marginLeft: '2px' }} />
              <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                {data?.category_detail?.translate_detail?.item_fa}
              </InputLabel>
            </Box>
            <Box sx={{ display: 'inline-flex' }}>
              <img src={SaleSubCategory} style={{ marginLeft: '2px' }} />
              <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                {data?.subcategory_detail?.translate_detail?.item_fa}{' '}
              </InputLabel>
            </Box>

            <Divider sx={{ color: '#D3D2D2' }} variant="middle" />

            <InputLabelHeader style={{ color: '#00346D', fontSize: '14px' }}>
              اندازه ها
            </InputLabelHeader>
            <Grid container spacing={2}>
              {product &&
                product.map((item, key) => {
                  return (
                    <Grid item xs={4}>
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
                            background: selectedList?.includes(item.code)
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
          {selectedList.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
                // padding: '20px 0px'
              }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    backgroundColor: '#DDF5F6',
                    color: '#00AAB5',
                    padding: '8px',
                    borderRadius: '8px',
                    margin: '0px 5px',
                    fontSize: '18px',
                    fontWeight: 500
                  }}
                >
                  {order.products.length}
                </Box>
                <InputLabel style={{ color: '#335D8A' }}>
                  محصول انتخاب شده
                </InputLabel>
              </Box>
              <ConfirmButton
                style={{ width: '120px' }}
                onClick={() => history.push('/sale/products/order')}
              >
                ثبت نهایی
              </ConfirmButton>
            </Box>
          )}
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
                    {selected.singular_package_detail.translate_detail.item_fa}
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
                        color: unitSelected === 'SMALL' ? '#231F20' : '#335D8A',
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
                        color: unitSelected === 'LARGE' ? '#231F20' : '#335D8A',
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
      </Drawer>
    </>
  );
}
