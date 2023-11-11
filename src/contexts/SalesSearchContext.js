import { result } from 'lodash';
import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

const initialSaleSearchState = {
  products: null,
  searched: false,
  filtered: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SALE_SEARCH_RESULT': {
      const { products, searched, filtered } = action.payload;
      return {
        ...state,
        products,
        searched,
        filtered
      };
    }
    case 'GET_PRODUCTS': {
      const { products, searched, filtered } = action.payload;
      return {
        ...state,
        products,
        searched,
        filtered
      };
    }
    case 'SET_FILTER_PRODUCTS': {
      const { products, searched, filtered } = action.payload;
      return {
        ...state,
        products,
        searched,
        filtered
      };
    }

    default: {
      return { ...state };
    }
  }
};

const SaleSearchContext = createContext({
  ...initialSaleSearchState,
  // setSaleSearch: () => Promise.resolve(),
  setSaleSearchResult: () => {},
  getProducts: () => {},
  setFilterProducts: () => {}
});

export const SaleSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSaleSearchState);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   if (localStorage/api/products/type/get_product/Item('user')) {
  //     // httpService.get(`${API_BASE_URL}/api/users/refresh_user`).then(result => {
  //     //   if (result.status === 200) {
  //     //     localStorage.setItem('user', JSON.stringify(result.data));
  //     dispatch({
  //       type: 'SET_SCORE',
  //       payload: {
  //         spent_credit: JSON.parse(localStorage.getItem('user')).user_club
  //           .spent_credit,
  //         total_credit: JSON.parse(localStorage.getItem('user')).user_club
  //           .total_credit
  //       }
  //     });
  //     //   }
  //     // });
  //   }
  // }, []);

  const setSaleSearchResult = search => {
    if (search.length > 0) {
      httpService
        .post(
          `${API_BASE_URL}/api/products/type/get_product/?ref=shop&search=${search}`
        )
        .then(result => {
          if (result.status === 200) {
            dispatch({
              type: 'SET_SALE_SEARCH_RESULT',
              payload: {
                products: result.data,
                searched: true
              }
            });
          } else {
            dispatch({
              type: 'SET_SALE_SEARCH_RESULT',
              payload: {
                products: null,
                searched: true
              }
            });
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
    } else {
      getProducts();
    }
  };

  const getProducts = () => {
    httpService
      .post(`${API_BASE_URL}/api/products/type/get_product/?ref=shop`)
      .then(result => {
        if (result.status === 200) {
          dispatch({
            type: 'GET_PRODUCTS',
            payload: {
              products: result.data,
              searched: false,
              filtered: false
            }
          });
        } else {
          dispatch({
            type: 'GET_PRODUCTS',
            payload: {
              products: null,
              searched: false,
              filtered: false
            }
          });
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
  };

  const setFilterProducts = (cat, subCat) => {
    if (cat.length > 0 || subCat.length > 0) {
      httpService
        .post(`${API_BASE_URL}/api/products/type/get_product/?ref=shop`, {
          cat_id: cat,
          subcat_id: subCat
        })
        .then(result => {
          if (result.status === 200) {
            dispatch({
              type: 'SET_FILTER_PRODUCTS',
              payload: {
                products: result.data,
                searched: false,
                filtered: true
              }
            });
          } else {
            dispatch({
              type: 'SET_SALE_SEARCH_RESULT',
              payload: {
                products: null,
                searched: false,
                filtered: true
              }
            });
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
    } else {
      console.log('khar');
      getProducts();
    }
  };

  // const setSaleSearch = search => {
  //   dispatch({
  //     type: 'SET_SALE_SEARCH',
  //     payload: {
  //       search
  //     }
  //   });
  // };

  // if (!state.isInitialised) {
  //   return <SplashScreen />;
  // }

  return (
    <SaleSearchContext.Provider
      value={{
        ...state,
        // setSaleSearch,
        setSaleSearchResult,
        getProducts,
        setFilterProducts
      }}
    >
      {children}
    </SaleSearchContext.Provider>
  );
};

export default SaleSearchContext;
