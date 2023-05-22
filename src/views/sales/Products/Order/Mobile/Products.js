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
import { useHistory } from 'react-router-dom';
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
export default function Products(props) {
  const [product, setProduct] = useState(null);
  const history = useHistory();
  const { order, getOrder } = useSaleOrder();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/orders/get_order?order_num=${order.order_num}`)
      .then(res => {
        setProduct(res.data);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          height: 'inherit'
        }}
      >
        {product && (
          <Box>
            <InputLabelHeader
              style={{
                color: '#00AAB5',
                fontSize: '18px',
                marginBottom: '20px'
              }}
            >
              ثبت سفارش
            </InputLabelHeader>
            <Box>
              {product.products.map((item, key) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '15px'
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        {/* <img src={}/> */}
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
                      <InputLabel
                        style={{
                          color: '#00346D',
                          fontSize: '14px',
                          fontWeight: 400
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
                      <InputLabel
                        style={{
                          color: '#335D8A',
                          fontSize: '14px',
                          fontWeight: 400
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
        <Box
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
        </Box>
      </Box>
    </>
  );
}
