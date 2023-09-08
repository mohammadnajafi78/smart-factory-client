import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const initialScoreState = {
  order: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ORDER': {
      const { order } = action.payload;
      return {
        ...state,
        order
      };
    }
    case 'SET_ORDER': {
      const { order } = action.payload;
      return {
        ...state,
        order
      };
    }

    default: {
      return { ...state };
    }
  }
};

const SaleOrderContext = createContext({
  ...initialScoreState,
  getOrder: () => {},
  setOrder: () => {}
});

export const SaleOrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialScoreState);
  const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     // httpService.get(`${API_BASE_URL}/api/users/refresh_user`).then(result => {
  //     //   if (result.status === 200) {
  //     //     localStorage.setItem('user', JSON.stringify(result.data));
  //     dispatch({
  //       type: 'GET_ORDER',
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

  const getOrder = () => {
    httpService
      .get(`${API_BASE_URL}/api/orders/get_current_order`)
      .then(result => {
        if (result.status === 200) {
          dispatch({
            type: 'GET_ORDER',
            payload: {
              order: result.data
            }
          });
        } else {
          dispatch({
            type: 'GET_ORDER',
            payload: {
              order: null
            }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: 'GET_ORDER',
          payload: {
            order: null
          }
        });
      });
  };

  const setOrder = order => {
    dispatch({
      type: 'SET_ORDER',
      payload: {
        order: order
      }
    });
  };

  // if (!state.isInitialised) {
  //   return <SplashScreen />;
  // }

  return (
    <SaleOrderContext.Provider
      value={{
        ...state,
        getOrder,
        setOrder
      }}
    >
      {children}
    </SaleOrderContext.Provider>
  );
};

export default SaleOrderContext;
