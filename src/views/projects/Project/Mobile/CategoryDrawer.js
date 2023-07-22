import { Box, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import DoubleBox from 'src/components/Mobile/DoubleBox';
import { ChevronLeft, Star } from 'react-feather';
import useSaleSearch from 'src/hooks/useSaleSearch';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    height: '73%'
  }
}));
export default function CategoryDrawer({
  openCategory,
  setOpenCategory,
  data
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selected, setSelected] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [subCategorySelected, setSubCategorySelected] = useState(null);
  const classes = useStyles();
  const { setFilterProducts, getProducts } = useSaleSearch();

  useEffect(() => {
    if (showSubCategory === false) {
      console.log('data', data);
      const counts = data.map(item => item.count);
      let sum = (prev, cur) => {
        return prev + cur;
      };
      const result = counts.reduce(sum, 0);
      setCategoryCount(result);
    } else {
      const counts = selected.subcategories.map(item => item.count);
      let sum = (prev, cur) => {
        return prev + cur;
      };
      const result = counts.reduce(sum, 0);
      setCategoryCount(result);
    }
  }, [data, showSubCategory]);

  return (
    <Box sx={{ padding: '12px', display: 'flex', flexDirection: 'column' }}>
      <Drawer
        anchor={'bottom'}
        open={openCategory}
        onClose={() => {
          setOpenCategory(false);
          setSelected(null);
          setSelectedIndex(null);
          setShowSubCategory(false);
          setSubCategorySelected(null);
        }}
        classes={{
          paper: classes.paper
        }}
      >
        {showSubCategory === false ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '60px 0px 0px !important',
              gap: '10px',
              background: '#FFFFFF',
              padding: '20px 16px'
            }}
          >
            <InputLabel style={{ color: '#231F20' }}>
              دسته مورد نظر را انتخاب کنید:
            </InputLabel>
            {data &&
              data.map((item, index) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      border:
                        index === selectedIndex
                          ? '0.8px solid #33BBC4'
                          : '0.8px solid #CCD6E2',
                      borderRadius: '4px',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 10px',
                      gap: '12px',
                      width: '100%',
                      ':hover': {
                        bgcolor: '#DDF5F6' // theme.palette.primary.main
                      }
                    }}
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelected(item);
                    }}
                  >
                    <InputLabel style={{ color: '#335D8A' }}>
                      {item?.translate_detail?.item_fa}
                    </InputLabel>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                      <DoubleBox
                        isSelected={index === selectedIndex ? true : false}
                      >
                        <InputLabel style={{ color: '#335D8A' }}>
                          {item?.count}
                        </InputLabel>
                        <InputLabel style={{ color: '#335D8A' }}>
                          کالا
                        </InputLabel>
                      </DoubleBox>
                      <ChevronLeft
                        color="#33BBC4"
                        height={'25px'}
                        style={{ marginRight: '8px' }}
                        onClick={() => {
                          setShowSubCategory(true);
                          setSelectedIndex(null);
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '60px 0px 0px !important',
              gap: '10px',
              background: '#FFFFFF',
              padding: '20px 16px'
            }}
          >
            <InputLabel style={{ color: '#231F20' }}>
              زیر دسته مورد نظر را انتخاب کنید:
            </InputLabel>
            {selected.subcategories.length > 0 &&
              selected.subcategories.map((item, index) => {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      border:
                        index === selectedIndex
                          ? '0.8px solid #33BBC4'
                          : '0.8px solid #CCD6E2',
                      borderRadius: '4px',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 10px',
                      gap: '12px',
                      width: '100%',
                      ':hover': {
                        bgcolor: '#DDF5F6' // theme.palette.primary.main
                      }
                    }}
                    onClick={() => {
                      setSelectedIndex(index);
                      setSubCategorySelected(item);
                    }}
                  >
                    <InputLabel style={{ color: '#335D8A' }}>
                      {item?.translate_detail?.item_fa}
                    </InputLabel>
                    <DoubleBox
                      isSelected={index === selectedIndex ? true : false}
                    >
                      <InputLabel style={{ color: '#335D8A' }}>
                        {item?.count}
                      </InputLabel>
                      <InputLabel style={{ color: '#335D8A' }}>کالا</InputLabel>
                    </DoubleBox>
                  </Box>
                );
              })}
          </Box>
        )}
        <Box
          sx={{
            display: 'inline-flex',
            justifyContent: 'space-between',
            gap: 2,
            width: '100%',
            height: '76px',
            borderTop: '0.5px solid #D3D2D2',
            padding: '12px 16px',
            position: 'sticky',
            bottom: 0,
            background: 'white'
          }}
        >
          <ConfirmButton
            disabled={false}
            variant="outlined"
            onClick={() => {
              setSelected(null);
              setSelectedIndex(null);
              setShowSubCategory(false);
              setSubCategorySelected(null);
            }}
          >
            {'حدف فیلترها'}
          </ConfirmButton>
          <ConfirmButton
            disabled={false}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
            onClick={() => {
              if (subCategorySelected) {
                setFilterProducts([], [subCategorySelected.id]);
              } else if (selected) {
                setFilterProducts([selected.id], []);
              } else {
                getProducts();
              }
              setOpenCategory(false);
              setSelected(null);
              setSelectedIndex(null);
              setShowSubCategory(false);
              setSubCategorySelected(null);
            }}
          >
            {'نمایش'}
            <DoubleBox>
              <InputLabel style={{ color: '#335D8A', marginLeft: '3px' }}>
                {subCategorySelected
                  ? subCategorySelected?.count
                  : selected
                  ? selected.count
                  : categoryCount}
              </InputLabel>
              <InputLabel style={{ color: '#335D8A' }}>کالا</InputLabel>
            </DoubleBox>
          </ConfirmButton>
        </Box>
      </Drawer>
    </Box>
  );
}
