import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const initialSaleSearchState = {
  result: null,
  searched: false
};

const reducer = (state, action) => {
  switch (action.type) {
    // case 'SET_SALE_SEARCH': {
    //   const { search } = action.payload;
    //   return {
    //     ...state,
    //     search
    //   };
    // }
    case 'SET_SALE_SEARCH_RESULT': {
      const { result, searched } = action.payload;
      return {
        ...state,
        result,
        searched
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
  setSaleSearchResult: () => {}
});

export const SaleSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSaleSearchState);

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
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
        .get(
          `${API_BASE_URL}/api/products/product/get_products?ref=shop&search=${search}`
        )
        .then(result => {
          if (result.status === 200) {
            dispatch({
              type: 'SET_SALE_SEARCH_RESULT',
              payload: {
                result: result.data,
                searched: true
              }
            });
          } else {
            dispatch({
              type: 'SET_SALE_SEARCH_RESULT',
              payload: {
                result: null,
                searched: true
              }
            });
          }
        });
    } else {
      dispatch({
        type: 'SET_SALE_SEARCH_RESULT',
        payload: {
          result: null,
          searched: false
        }
      });
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
        setSaleSearchResult
      }}
    >
      {children}
    </SaleSearchContext.Provider>
  );
};

export default SaleSearchContext;
