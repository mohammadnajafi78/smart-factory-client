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
import { Download, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import SmallSize from 'src/assets/img/smallSize.svg';
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
export default function ProductListSelectable(props) {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [unitSelected, setUnitSelected] = useState('SINGULAR');
  const [count, setCount] = useState(0);
  const [all, setAll] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getData();
    setUnitSelected('SINGULAR');
  }, []);

  function getData() {
    httpService
      .get(`${API_BASE_URL}/api/orders/get_order?order_num=${props.orderNum}`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(ex => {
        if (ex.response.status === 417) {
          enqueueSnackbar(ex.response.data.error, { variant: 'error' });
        } else {
          enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
            variant: 'error'
          });
        }
      });
  }

  // useEffect(() => {
  //   if (selected) setOpen(true);
  // }, [selected]);

  return (
    <>
      <Box style={{ position: 'relative', marginTop: '10px' }}>
        {data && (
          <Box>
            <Box>
              {data.products.map((item, key) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <img
                      src={item.product_detail.type_detail.images[0].url}
                      width="36px"
                      height="36px"
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '15px'
                      }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'inline-flex' }}>
                          <InputLabel
                            style={{
                              color: '#00346D',
                              fontSize: '12px',
                              fontWeight: 400
                            }}
                          >
                            {item.product_type.name_translate.item_fa}
                          </InputLabel>
                          <InputLabel
                            style={{
                              color: '#6685A7',
                              fontSize: '12px',
                              fontWeight: 200,
                              direction: 'ltr'
                            }}
                          >{`(${item.product_detail.size})`}</InputLabel>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'inline-flex' }}>
                          {/* <img src={}/> */}
                          <InputLabel
                            style={{
                              color: '#00346D',
                              fontSize: '14px',
                              fontWeight: 400
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
                              fontWeight: 300
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
                      </Box>
                    </Box>
                    <ConfirmButton
                      variant="outlined"
                      style={{
                        borderRadius: '8px',
                        padding: '0px 12px',
                        width: '63px',
                        height: '20px',
                        fontSize: '14px'
                      }}
                      onClick={() => {
                        setSelected(item);
                        setOpen(true);
                      }}
                    >
                      انتخاب
                    </ConfirmButton>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
      <CustomizedDialogs
        open={open}
        handleClose={() => setOpen(false)}
        title={'محصول'}
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
                    {selected.product_detail.small_plural_package_qty +
                      ' ' +
                      selected.product_detail.singular_package_detail
                        .translate_detail.item_fa}
                  </InputLabel>
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#335D8A'
                    }}
                  >
                    {' در ' +
                      selected.product_detail.small_plural_package_detail
                        .translate_detail.item_fa}
                  </InputLabel>
                </Box>
              )}
              {selected &&
                selected.product_detail.large_plural_package_qty > 0 && (
                  <Box style={{ display: 'inline-flex' }}>
                    <img src={SmallSize} />
                    <InputLabel
                      style={{
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#00346D'
                      }}
                    >
                      {selected.product_detail.large_plural_package_qty +
                        ' ' +
                        selected.product_detail.singular_package_detail
                          .translate_detail.item_fa}
                    </InputLabel>
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#335D8A'
                      }}
                    >
                      {' در ' +
                        selected.product_detail.large_plural_package_detail
                          .translate_detail.item_fa}
                    </InputLabel>
                  </Box>
                )}

              <Divider color={'#99AEC5'} />

              <Box sx={{ mt: 1, mb: 1, width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>تعداد</InputLabel>
                  <ConfirmButton
                    variant={all ? 'contained' : 'outlined'}
                    style={{
                      borderRadius: '8px',
                      padding: '0px 12px',
                      minWidth: '40px',
                      width: '50px',
                      minHeight: '35px',
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}
                    onClick={() => {
                      setAll(!all);
                    }}
                  >
                    همه
                  </ConfirmButton>
                </Box>
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
                  disabled={all}
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
                            ? selected.product_detail.singular_package_detail
                                .translate_detail.item_fa
                            : unitSelected === 'SMALL'
                            ? selected &&
                              selected.product_detail.small_plural_package_qty >
                                0 &&
                              selected.product_detail
                                .small_plural_package_detail.translate_detail
                                .item_fa
                            : selected &&
                              selected.product_detail.large_plural_package_qty >
                                0 &&
                              selected.product_detail
                                .large_plural_package_detail.translate_detail
                                .item_fa}
                        </InputLabel>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
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
                {selected !== null && (
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
                    disabled={all}
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
                        selected.product_detail.singular_package_detail
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
                  fontSize: '14px'
                }}
                onClick={() => {
                  setOpen(false);
                  setAll(false);
                  setSelected(null);
                }}
              >
                {/* <img src={CancelImg} /> */}
                {'لغو'}
              </ConfirmButton>
              <ConfirmButton
                disabled={false}
                onClick={() => {
                  httpService
                    .post(
                      `${API_BASE_URL}/api/orders/add_incomplete_delivery/`,
                      {
                        order_num: props.orderNum,
                        code: selected.product_detail.code,
                        quantity: count,
                        package: unitSelected,
                        all: all
                      }
                    )
                    .then(res => {
                      if (res.status === 200) {
                        setOpen(false);
                        setSelected(null);
                        setAll(false);
                        getData();
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
