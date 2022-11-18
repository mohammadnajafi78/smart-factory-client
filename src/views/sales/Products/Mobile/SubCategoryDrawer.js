import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CategoryButton from 'src/components/Mobile/Button/Category';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import BasketSale from 'src/assets/img/basketSale.svg';
import ProductsList from './ProductList';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0
    // minHeight: '40%'
  }
}));
export default function SubCategoryDrawer({ subCategory, setSubCategory }) {
  const [data, setData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/products/category?ref=shop`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data);
        }
      });
  }, []);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      <Drawer
        anchor={'bottom'}
        open={subCategory}
        onClose={() => setSubCategory(false)}
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
            padding: '60px 0px 0px !important',
            gap: '20px',
            // height: '342px',
            background: '#FFFFFF'
          }}
        >
          subCategory
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
            variant="outlined"
            onClick={() => setOpenFirst(false)}
          >
            {'حدف فیلترها'}
          </ConfirmButton>
          <ConfirmButton
            disabled={false}
            // onClick={() => {
            //   httpService
            //     .post(`${API_BASE_URL}/api/club/gift_box/purchase_gift_box/`, {
            //       gift_box_id: selectedBox.id
            //     })
            //     .then(res => {
            //       if (res.status === 200) {
            //         setOpenFirst(false);
            //         setOpenSecond(true);
            //         setScore();
            //       }
            //     })
            //     .catch(err => {
            //       if (err.response.status === 417) {
            //         setOpenError(true);
            //         setError(err.response.data.error);
            //         setOpenFirst(false);
            //       }
            //     });
            // }}
          >
            {'نمایش'}
          </ConfirmButton>
        </Box>
      </Drawer>
    </Box>
  );
}
