import React from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

function IdentityInfoMobile(props) {
  const history = useHistory();
  const data = props?.data;

  return (
    <>
      <Formik
        initialValues={{
          name: data?.first_name,
          family: data?.last_name,
          mobile: data?.mobile,
          email: data?.email
        }}
        validate={values => {
          const errors = {};
          // if (!values.input) {
          //   errors.username = 'نام کاربری اجباری می باشد';
          // }
          return errors;
        }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          //   httpService
          //     .patch(
          //       `${API_BASE_URL}/api/users/${
          //         JSON.parse(localStorage.getItem('user')).id
          //       }/`,
          //       { first_name: values.name, last_name: values.family }
          //     )
          //     .then(res => {
          //       if (res.status === 200) {
          //         history.push('/location');
          //       }
          //     });
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
              gap: '140px',
              // position: 'absolute',
              width: '100%',
              height: '100%'
              // left: '20px',
              // top: '57px'
            }}
          >
            <Box>
              {/* <InputLabelHeader>اطلاعات هویتی</InputLabelHeader> */}
              {/* <InputLabel>مشخصات شما شامل موارد زیر می باشد:</InputLabel> */}
              <Box>
                <InputLabel style={{ color: '#A7A5A6' }}>ایمیل</InputLabel>
                {values.email ? (
                  <InputLabel style={{ color: '#231F20' }}>
                    {values.email}
                  </InputLabel>
                ) : (
                  <TextField
                    id="email"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // placeholder="رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.email}
                    onChange={handleChange}
                  />
                )}
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
              <Box sx={{ mt: 2 }}>
                <InputLabel>شماره موبایل</InputLabel>
                <TextField
                  id="mobile"
                  aria-describedby="my-helper-text"
                  fullWidth
                  // placeholder="رمز عبور"
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '6px 3px'
                  }}
                  value={values.mobile}
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
              <ConfirmButton
                disabled={false}
                variant="outlined"
                onClick={() =>
                  history.push({
                    pathname: '/profile/detail',
                    state: {
                      data: data
                    }
                  })
                }
              >
                {'لغو'}
              </ConfirmButton>
              <ConfirmButton
                disabled={false}
                type="submit"
                onClick={() => handleSubmit()}
              >
                {'ویرایش'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}

export default IdentityInfoMobile;
