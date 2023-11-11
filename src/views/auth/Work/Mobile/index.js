import React, { useEffect, useState } from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { ErrorMessage, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
// import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

function WorkMobile() {
  const history = useHistory();
  const [works, setWorks] = useState([]);
  const [selected, setSelected] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/users/user_type/activity_list`)
      .then(res => {
        if (res.status === 200) {
          setWorks(res.data);
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
  }, []);

  return (
    <Formik
      initialValues={{
        input: ''
      }}
      validationSchema={Yup.object().shape({
        input: Yup.string().required(' حداقل یک فعالیت باید انتخاب شده باشد')
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
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '0px',
            // gap: '159px',
            position: 'absolute',
            width: '90%',
            height: '90%',
            left: '20px',
            top: '57px'
          }}
        >
          <Box>
            <InputLabelHeader>زمینه کاری شما</InputLabelHeader>
            <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
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
                            selected.filter(f => f.id === item.id).length === 0
                              ? '#F7FCFC'
                              : '#DFF2F2',
                          border: '1px solid #CCEEF0 !important',
                          borderRadius: '4px !important',
                          padding: '12px',
                          height: '48px',
                          fontStyle: 'normal',
                          fontWeight:
                            selected.filter(f => f.id === item.id).length === 0
                              ? 400
                              : 600,
                          fontSize: '16px',
                          lineHeight: '24px',
                          color:
                            selected.filter(f => f.id === item.id).length === 0
                              ? '#231F20'
                              : '#231F20',
                          fontFamily: 'IRANSans',

                          '&:hover': {
                            color: '#231F20 !important',
                            backgroundColor: '#DFF2F2 !important',
                            fontWeight: 600,
                            fontSize: '16px'
                          }
                        }}
                        onClick={() => {
                          if (
                            selected.filter(f => f.id === item.id).length > 0
                          ) {
                            setSelected(selected.filter(f => f.id !== item.id));
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
                      marginTop: '5px'
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
              gap: 2
            }}
          >
            {/* <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => history.push('/location')}
            >
              {'قبلی'}
            </ConfirmButton> */}
            <ConfirmButton
              disabled={isSubmitting}
              // onClick={handleSubmit}
              loading={isSubmitting}
              type={'submit'}
            >
              {'ثبت'}
            </ConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default WorkMobile;
