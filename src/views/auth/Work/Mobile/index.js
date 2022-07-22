import React, { useRef, useEffect, useState } from 'react';
import { Box, ButtonGroup, Button, ListItemIcon } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
// import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'src/utils/axios';
import httpService from 'src/utils/httpService';

// const arr = [
//   'فروشگاه',
//   'مهندس / مجری تاسیسات',
//   'مهندس طراح / ناظر',
//   'پیمانکار',
//   'کارفرما',
//   'پرسنل شرکت'
// ];
function WorkMobile() {
  const history = useHistory();
  const [works, setWorks] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/users/user_type/activity_list`)
      .then(res => {
        if (res.status === 200) {
          setWorks(res.data);
        }
      });
  }, []);

  return (
    <Formik
      initialValues={{
        input: ''
      }}
      validate={values => {
        const errors = {};
        if (!values.input) {
          errors.username = 'نام کاربری اجباری می باشد';
        }
        return errors;
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        //   try {
        //     await login(values.username, values.password);
        //     setSubmitting(false);
        //   } catch (err) {
        //     setErrors({
        //       submit: t('login.validation')
        //     });
        //     setSubmitting(false);
        //   }
        httpsService
          .post(`${API_BASE_URL}/api/users/add_user_type/`, {
            user_type: selected
          })
          .then(res => {
            if (res.status === 200) {
              history.push('/club/awards');
            }
          });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
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
                          } else setSelected(prevState => [...prevState, item]);
                        }}
                      >
                        {item.translate}
                      </Button>
                    );
                  })}
              </ButtonGroup>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() => history.push('/location')}
            >
              {'قبلی'}
            </ConfirmButton>
            <ConfirmButton disabled={false} onClick={handleSubmit}>
              {'ثبت'}
            </ConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default WorkMobile;
