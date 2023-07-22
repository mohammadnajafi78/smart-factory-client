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
import useSaleOrder from 'src/hooks/useSaleOrder';
import { Edit } from 'react-feather';
import CustomizedDialogs from 'src/components/Desktop/Dialog';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function Products(props) {
  const [product, setProduct] = useState(null);
  const history = useHistory();
  const { order, getOrder, setOrder } = useSaleOrder();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(0);
  const [unitSelected, setUnitSelected] = useState('SINGULAR');

  function get_products() {
    httpService
      .get(`${API_BASE_URL}/api/orders/get_order?order_num=${order.order_num}`)
      .then(res => {
        setProduct(res.data);
      });
  }
  useEffect(() => {
    get_products();
    setUnitSelected('SINGULAR');
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          height: 'inherit',
          overflow: 'auto'
        }}
      >
        {product && (
          <Box>
            <InputLabelHeader
              style={{
                color: '#231F20',
                fontSize: '18px',
                marginBottom: '20px'
              }}
            >
              لیست سفارشات
            </InputLabelHeader>
            <Box sx={{ height: '300px', overflow: 'auto' }}>
              {product.products.map((item, key) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '15px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setOpen(true);
                      setSelected(item);
                      setCount(item.package_quantity);
                      setUnitSelected(item.package_type);
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        {/* <img src={}/> */}
                        <img
                          src={item.product_detail.type_detail.images[0].url}
                          width="26px"
                          height="26px"
                        />
                        <InputLabel
                          style={{
                            color: '#00346D',
                            fontSize: '12px',
                            fontWeight: 400,
                            cursor: 'pointer'
                          }}
                        >
                          {item.product_type.name_translate.item_fa}
                        </InputLabel>
                        <InputLabel
                          style={{
                            color: '#6685A7',
                            fontSize: '12px',
                            fontWeight: 200,
                            direction: 'ltr',
                            cursor: 'pointer'
                          }}
                        >{`(${item.product_detail.size})`}</InputLabel>
                      </Box>
                      <InputLabel
                        style={{
                          color: '#00346D',
                          fontSize: '12px',
                          fontWeight: 400,
                          cursor: 'pointer'
                        }}
                      >
                        {`${item.price} `}
                      </InputLabel>
                    </Box>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        {/* <img src={}/> */}
                        <InputLabel
                          style={{
                            color: '#00346D',
                            fontSize: '11px',
                            fontWeight: 400,
                            cursor: 'pointer'
                          }}
                        >
                          {item.package_quantity}
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
                            fontWeight: 300,
                            cursor: 'pointer'
                          }}
                        >
                          {item.package_type === 'SINGULAR'
                            ? item.product_detail.singular_package_detail
                                .translate_detail.item_fa
                            : item.package_type === 'SMALL'
                            ? item.product_detail.small_plural_package_detail
                                .translate_detail.item_fa
                            : item.product_detail.large_plural_package_detail
                                .translate_detail.item_fa}
                        </InputLabel>
                      </Box>
                      <InputLabel
                        style={{
                          color: '#335D8A',
                          fontSize: '11px',
                          fontWeight: 400,
                          cursor: 'pointer'
                        }}
                      >
                        {`${item.total_price} `}
                      </InputLabel>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <InputLabel
                style={{ color: '#335D8A', fontSize: '14px', fontWeight: 400 }}
              >
                مجموع
              </InputLabel>
              <InputLabel
                style={{ color: '#335D8A', fontSize: '16px', fontWeight: 700 }}
              >{`${product.final_price} `}</InputLabel>
            </Box>
          </Box>
        )}
        {/* <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <ConfirmButton
            disabled={true}
            variant="outlined"
            // onClick={() => {
            //   history.push('/identity');
            // }}
            type={'button'}
          >
            {'بارگشت'}
          </ConfirmButton>
          <ConfirmButton onClick={() => history.push('/sale/products/order/2')}>
            {'ادامه'}
          </ConfirmButton>
        </Box> */}
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
                        selected?.product_detail?.singular_package_detail
                          .translate_detail.item_fa
                      }
                    </Button>
                    {/* )} */}
                    {selected.product_detail.small_plural_package_qty > 0 && (
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
                          selected.product_detail.small_plural_package_detail
                            .translate_detail.item_fa
                        }
                      </Button>
                    )}
                    {selected.product_detail.large_plural_package_qty > 0 && (
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
                          selected.product_detail.large_plural_package_detail
                            .translate_detail.item_fa
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
                            ? selected?.product_detail?.singular_package_detail
                                .translate_detail.item_fa
                            : unitSelected === 'SMALL'
                            ? selected &&
                              selected.product_detail
                                ?.small_plural_package_qty > 0 &&
                              selected.product_detail
                                ?.small_plural_package_detail.translate_detail
                                .item_fa
                            : selected &&
                              selected.product_detail
                                ?.large_plural_package_qty > 0 &&
                              selected.product_detail
                                ?.large_plural_package_detail.translate_detail
                                .item_fa}
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
                      code: selected.product_detail.code
                    })
                    .then(res => {
                      if (res.status === 200) {
                        getOrder();
                        setOpen(false);
                        get_products();
                        setOrder(res.data);
                        setSelected(null);
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
                            code: selected.product_detail.code,
                            quantity: count,
                            package: unitSelected
                          }
                        ]
                      })
                      .then(res => {
                        if (res.status === 200) {
                          get_products();
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
