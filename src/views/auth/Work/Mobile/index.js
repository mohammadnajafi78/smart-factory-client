import React, { useRef } from 'react';
import { Box, ButtonGroup, Button } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

const arr = [
  'فروشگاه',
  'مهندس / مجری تاسیسات',
  'مهندس طراح / ناظر',
  'پیمانکار',
  'کارفرما',
  'پرسنل شرکت'
];
function WorkMobile() {
  const history = useHistory();
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
                {arr.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      sx={{
                        backgroundColor: '#F7FCFC',
                        border: '1px solid #CCEEF0 !important',
                        borderRadius: '4px !important',
                        padding: '12px',
                        height: '48px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#231F20',
                        fontFamily: 'IRANSans',

                        '&:hover': {
                          color: '#231F20 !important',
                          backgroundColor: '#DFF2F2 !important',
                          fontWeight: 600,
                          fontSize: '16px'
                        }
                      }}
                    >
                      {item}
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
