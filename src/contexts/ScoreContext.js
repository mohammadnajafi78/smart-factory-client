import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const initialScoreState = {
  spent_credit: 0,
  total_credit: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCORE': {
      const { spent_credit, total_credit } = action.payload;
      return {
        ...state,
        spent_credit,
        total_credit
      };
    }

    default: {
      return { ...state };
    }
  }
};

const ScoreContext = createContext({
  ...initialScoreState,
  setScore: () => {}
});

export const ScoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialScoreState);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      // httpService.get(`${API_BASE_URL}/api/users/refresh_user`).then(result => {
      //   if (result.status === 200) {
      //     localStorage.setItem('user', JSON.stringify(result.data));
      dispatch({
        type: 'SET_SCORE',
        payload: {
          spent_credit: JSON.parse(localStorage.getItem('user')).user_club
            .spent_credit,
          total_credit: JSON.parse(localStorage.getItem('user')).user_club
            .total_credit
        }
      });
      //   }
      // });
    }
  }, []);

  const setScore = () => {
    httpService.get(`${API_BASE_URL}/api/users/refresh_user`).then(result => {
      if (result.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data));

        dispatch({
          type: 'SET_SCORE',
          payload: {
            spent_credit: result.data.user_club.spent_credit,
            total_credit: result.data.user_club.total_credit
          }
        });
      }
    });
  };

  // if (!state.isInitialised) {
  //   return <SplashScreen />;
  // }

  return (
    <ScoreContext.Provider
      value={{
        ...state,
        setScore
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
