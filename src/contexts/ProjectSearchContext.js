import { result } from 'lodash';
import React, { createContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

const initialProjectSearchState = {
  projects: null,
  searched: false,
  filtered: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECT_SEARCH_RESULT': {
      const { projects, searched, filtered } = action.payload;
      return {
        ...state,
        projects,
        searched,
        filtered
      };
    }
    case 'GET_PROJECTS': {
      const { projects, searched, filtered } = action.payload;
      return {
        ...state,
        projects,
        searched,
        filtered
      };
    }
    case 'SET_FILTER_PRODUCTS': {
      const { projects, searched, filtered } = action.payload;
      return {
        ...state,
        projects,
        searched,
        filtered
      };
    }

    default: {
      return { ...state };
    }
  }
};

const ProjectSearchContext = createContext({
  ...initialProjectSearchState,
  // setSaleSearch: () => Promise.resolve(),
  setProjectSearchResult: () => {},
  getProjects: () => {}
  // setFilterProjects: () => {}
});

export const ProjectSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialProjectSearchState);
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

  const setProjectSearchResult = search => {
    if (search.length > 0) {
      httpService
        .post(`${API_BASE_URL}/api/project/get_sent/?search=${search}`)
        .then(result => {
          if (result.status === 200) {
            dispatch({
              type: 'SET_PROJECT_SEARCH_RESULT',
              payload: {
                projects: result.data,
                searched: true
              }
            });
          } else {
            dispatch({
              type: 'SET_PROJECT_SEARCH_RESULT',
              payload: {
                projects: null,
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
      getProjects();
    }
  };

  const getProjects = () => {
    httpService
      .post(`${API_BASE_URL}/api/project/get_sent/`)
      .then(result => {
        if (result.status === 200) {
          dispatch({
            type: 'GET_PROJECTS',
            payload: {
              projects: result.data,
              searched: false,
              filtered: false
            }
          });
        } else {
          dispatch({
            type: 'GET_PROJECTS',
            payload: {
              projects: null,
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

  // const setFilterProjects = (cat, subCat) => {
  //   if (cat.length > 0 || subCat.length > 0) {
  //     httpService
  //       .post(`${API_BASE_URL}/api/products/type/get_product/?ref=shop`, {
  //         cat_id: cat,
  //         subcat_id: subCat
  //       })
  //       .then(result => {
  //         if (result.status === 200) {
  //           dispatch({
  //             type: 'SET_FILTER_PRODUCTS',
  //             payload: {
  //               projects: result.data,
  //               searched: false,
  //               filtered: true
  //             }
  //           });
  //         } else {
  //           dispatch({
  //             type: 'SET_PROJECT_SEARCH_RESULT',
  //             payload: {
  //               projects: null,
  //               searched: false,
  //               filtered: true
  //             }
  //           });
  //         }
  //       });
  //   } else {
  //     console.log('khar');
  //     getProjects();
  //   }
  // };

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
    <ProjectSearchContext.Provider
      value={{
        ...state,
        // setSaleSearch,
        setProjectSearchResult,
        getProjects
        // setFilterProjects
      }}
    >
      {children}
    </ProjectSearchContext.Provider>
  );
};

export default ProjectSearchContext;
