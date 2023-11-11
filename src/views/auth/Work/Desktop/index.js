import React, { useEffect, useState } from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { ErrorMessage, Formik } from 'formik';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { useHistory } from 'react-router-dom';
// import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
// import axios from 'src/utils/axios';
// import httpService from 'src/utils/httpService';
import httpService from 'src/utils/httpService';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

function WorkDesktop() {
  const [works, setWorks] = useState([]);
  const [selected, setSelected] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/users/user_type/activity_list`)
      .then(res => {
        if (res.status === 200) setWorks(res.data);
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
  }, []);

  // async function getData() {}

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await axiosInstance.get(
  //       `/api/users/user_type/activity_list`
  //     );
  //     console.log('res', response);
  //   }
  //   fetchData();
  // }, []);

  return (
    <LoginFrame>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 30px 20px',
          gap: '60px',
          position: 'absolute',
          width: '386px',
          height: '600px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
        <Formik
          initialValues={{
            input: ''
          }}
          validationSchema={Yup.object().shape({
            input: Yup.string().required(
              ' حداقل یک فعالیت باید انتخاب شده باشد'
            )
          })}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/users/add_user_type/`, {
                user_type: selected
              })
              .then(res => {
                if (res.status === 200) {
                  history.push('/home');
                  setSubmitting(false);
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
            setSubmitting(false);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values
          }) => (
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <InputLabelHeader>زمینه کاری شما</InputLabelHeader>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <ButtonGroup
                    fullWidth
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="contained"
                    sx={{ gap: 2, boxShadow: 'none' }}
                    // color="#CCEEF0"
                    id="input"
                  >
                    {works &&
                      works.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            sx={{
                              backgroundColor:
                                selected.filter(f => f.id === item.id)
                                  .length === 0
                                  ? '#F7FCFC'
                                  : '#DFF2F2',
                              border: '1px solid #CCEEF0 !important',
                              borderRadius: '4px !important',
                              padding: '12px',
                              height: '48px',
                              fontStyle: 'normal',
                              fontWeight:
                                selected.filter(f => f.id === item.id)
                                  .length === 0
                                  ? 400
                                  : 600,
                              fontSize: '16px',
                              lineHeight: '24px',
                              color:
                                selected.filter(f => f.id === item.id)
                                  .length === 0
                                  ? '#231F20'
                                  : '#231F20',
                              fontFamily: 'IRANSans'

                              // '&:hover': {
                              //   color: '#231F20 !important',
                              //   backgroundColor: '#DFF2F2 !important',
                              //   fontWeight: 600,
                              //   fontSize: '16px'
                              // }
                            }}
                            onClick={() => {
                              if (
                                selected.filter(f => f.id === item.id).length >
                                0
                              ) {
                                setSelected(
                                  selected.filter(f => f.id !== item.id)
                                );
                                setFieldValue(
                                  'input',
                                  selected.filter(f => f.id !== item.id)
                                );
                              } else {
                                setSelected(prevState => [...prevState, item]);
                                setFieldValue('input', prevState => [
                                  ...prevState,
                                  item
                                ]);
                              }
                            }}
                          >
                            {item.translate}
                          </Button>
                        );
                      })}
                  </ButtonGroup>
                </Box>
                {touched['input'] && errors['input'] && (
                  <ErrorMessage name={'input'}>
                    {msg => (
                      <div
                        style={{
                          color: 'red',
                          textAlign: 'right',
                          marginTop: '10px',
                          marginBottom: '10px'
                        }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                )}
              </Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  gap: 2,
                  padding: '0px',
                  margin: 0,
                  width: '100%'
                }}
              >
                {/* <ConfirmButton
                  disabled={false}
                  variant="outlined"
                  onClick={() => history.push('/location')}
                  type="button"
                >
                  {'قبلی'}
                </ConfirmButton> */}
                <ConfirmButton disabled={isSubmitting} loading={isSubmitting}>
                  {'ثبت'}
                </ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </LoginFrame>
  );
}

export default WorkDesktop;
