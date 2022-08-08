import React from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';

function IdentityInfoMobile(props) {
  const history = useHistory();

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          family: ''
        }}
        validate={values => {
          const errors = {};
          // if (!values.input) {
          //   errors.username = 'نام کاربری اجباری می باشد';
          // }
          return errors;
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          httpService
            .patch(
              `${API_BASE_URL}/api/users/${
                JSON.parse(localStorage.getItem('user')).id
              }/`,
              { first_name: values.name, last_name: values.family }
            )
            .then(res => {
              if (res.status === 200) {
                history.push('/location');
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
              gap: '159px',
              position: 'absolute',
              width: '90%',
              height: '90%',
              left: '20px',
              top: '57px'
            }}
          >
            <Box>
              <InputLabelHeader>اطلاعات هویتی</InputLabelHeader>
              <InputLabel>مشخصات خود را وارد کنید:</InputLabel>
              <Box sx={{ mt: 2 }}>
                <InputLabel>نام</InputLabel>
                <TextField
                  id="name"
                  aria-describedby="my-helper-text"
                  fullWidth
                  // placeholder="رمز عبور"
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '6px 3px'
                  }}
                  value={values.name}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>نام خانوادگی</InputLabel>
                <TextField
                  id="family"
                  aria-describedby="my-helper-text"
                  fullWidth
                  // placeholder="رمز عبور"
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '6px 3px'
                  }}
                  value={values.family}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                gap: 2
              }}
            >
              <ConfirmButton disabled={true} variant="outlined">
                {'قبلی'}
              </ConfirmButton>
              <ConfirmButton
                disabled={false}
                type="submit"
                onClick={() => handleSubmit()}
              >
                {'بعدی'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default IdentityInfoMobile;
