import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import FilesMenu from 'src/views/sales/FilesMenu';

export default function ProductList({ data, incomplete }) {
  const [product, setProduct] = useState();

  useEffect(() => {
    if (incomplete === true) {
      httpService
        .get(
          `${API_BASE_URL}/api/management/order/get_incomplete_delivery?order_num=${data.order_num}`
        )
        .then(res => {
          if (res.status === 200) {
            setProduct(res.data);
          }
        });
    } else {
      setProduct(data);
    }
  }, []);

  return (
    <Box style={{ position: 'relative' }}>
      {product && (
        <Box sx={{ mt: incomplete === true ? '20px' : '0px' }}>
          {incomplete !== true && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <InputLabelHeader
                style={{
                  color: '#231F20',
                  fontSize: '18px',
                  marginBottom: '20px'
                }}
              >
                لیست سفارشات
              </InputLabelHeader>
              {data && <FilesMenu data={data?.files} />}
            </Box>
          )}
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

          {incomplete !== true && (
            <>
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
                  style={{
                    color: '#335D8A',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  مجموع
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#335D8A',
                    fontSize: '16px',
                    fontWeight: 700
                  }}
                >{`${product.final_price} `}</InputLabel>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
