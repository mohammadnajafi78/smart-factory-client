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

export default function ProductList({ data }) {
  const product = data;
  console.log('inja', data);

  return (
    <Box style={{ position: 'relative' }}>
      {product && (
        <Box>
          <Box>
            {product.products.map((item, key) => {
              return (
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        {`${item.price} ریال`}
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
                        {`${item.total_price} ریال`}
                      </InputLabel>
                    </Box>
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
            >{`${product.final_price} ریال`}</InputLabel>
          </Box>
        </Box>
      )}
      <a
        href={data?.files.filter(f => f.subject === 'PI')[0].url}
        download
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <ConfirmButton
          style={{
            color: '#00AAB5',
            backgroundColor: '#DDF5F6',
            position: 'relative',
            bottom: 0,
            marginTop: '30px'
          }}
        >
          <Download />
          دانلود فایل درخواست
        </ConfirmButton>
      </a>
    </Box>
  );
}