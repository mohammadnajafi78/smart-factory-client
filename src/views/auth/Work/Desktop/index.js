import React, { useEffect, useState } from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import LoginFrame from 'src/components/Desktop/LoginFrame';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'axios';

const arr = [
  'فروشگاه',
  'مهندس / مجری تاسیسات',
  'مهندس طراح / ناظر',
  'پیمانکار',
  'کارفرما',
  'پرسنل شرکت'
];
function WorkDesktop() {
  const [selected, setSelected] = useState(null);
  const [works, setWorks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/users/user_type/activity_list/`, {
        headers: {
          Authorizations: `Bearer ${localStorage.getItem('token')}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(res => {
        if (res.status === 200) {
          setWorks(res.data);
        }
      });
  }, []);

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
          height: '590px',
          background: '#FFFFFF',
          border: '1px solid #D3D2D2',
          borderRadius: '10px'
        }}
      >
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
                  >
                    {works &&
                      works.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            sx={{
                              backgroundColor:
                                selected === index
                                  ? '#DFF2F2 !important'
                                  : '#F7FCFC',
                              border: '1px solid #CCEEF0 !important',
                              borderRadius: '4px !important',
                              padding: '12px',
                              height: '48px',
                              fontStyle: 'normal',
                              fontWeight: selected === index ? 600 : 400,
                              fontSize: '16px',
                              lineHeight: '24px',
                              color:
                                selected === index
                                  ? '#231F20 !important'
                                  : '#231F20',
                              fontFamily: 'IRANSans',
                              justifyContent: 'start',

                              '&:hover': {
                                color: '#231F20 !important',
                                backgroundColor: '#DFF2F2 !important',
                                fontWeight: 600,
                                fontSize: '16px'
                              }
                            }}
                            onClick={() => setSelected(index)}
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
                  gap: 2,
                  padding: '0px',
                  margin: 0,
                  width: '100%'
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
                  {'بعدی'}
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
