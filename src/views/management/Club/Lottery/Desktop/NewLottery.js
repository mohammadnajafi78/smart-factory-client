import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import Upload from 'src/assets/img/icons/upload.svg';

export default function NewCompetition() {
  const [works, setWorks] = useState([]);
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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '16px 16px 12px',
          gap: '20px',
          width: '70%',
          //   height: '500px',
          background: '#FFFFFF',
          borderRadius: '4px'
          //   overflow: 'auto'
        }}
      >
        <Formik
          initialValues={{
            // field: data?.user_type_list,
            // company: data?.company?.name,
            company: ''
            // address: data?.company?.location_info?.address
          }}
          validate={values => {
            const errors = {};
            if (!values.input) {
              errors.username = 'نام کاربری اجباری می باشد';
            }
            return errors;
          }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            // httpsService
            //   .post(`${API_BASE_URL}/api/users/add_user_type/`, {
            //     user_type: selected
            //   })
            //   .then(res => {
            //     if (res.status === 200) {
            //       history.push('/home');
            //     }
            //   });
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
            setFieldValue
          }) => (
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                width: '100%'
              }}
            >
              <Box>
                <InputLabelHeader style={{ color: '#00AAB5', fontWeight: 700 }}>
                  قرعه جدید
                </InputLabelHeader>
                <Divider
                  variant="middle"
                  sx={{ margin: '6px 0px', width: '98%' }}
                />
                <InputLabelHeader style={{ fontWeight: 700, color: '#231F20' }}>
                  مشخصات
                </InputLabelHeader>
                <Box sx={{ mt: 3 }}>
                  <InputLabel>عنوان قرعه کشی</InputLabel>
                  <TextField
                    id="company"
                    aria-describedby="my-helper-text"
                    fullWidth
                    // placeholder="رمز عبور"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    // value={values.company}
                    // onChange={handleChange}
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>اعتبار تا</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          //   value={}
                          //   onChange={newValue => {}}
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                background: '#F2F2F2'
                              }}
                              fullWidth
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>امتیاز</InputLabel>
                      <TextField
                        id="company"
                        aria-describedby="my-helper-text"
                        fullWidth
                        // placeholder="رمز عبور"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px'
                          //   margin: '6px 3px'
                        }}
                        // value={values.company}
                        // onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>سطح کاربری</InputLabel>
                      <Autocomplete
                        multiple
                        fullWidth
                        disablePortal
                        id="field"
                        limitTags={1}
                        options={works}
                        getOptionLabel={option => option.translate}
                        defaultValue={values.field}
                        renderInput={params => <TextField {...params} />}
                        // onChange={(event, values) => {
                        //   setFieldValue('field', values);
                        // }}
                        isOptionEqualToValue={(option, value) =>
                          option.translate === value.translate
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>توضیحات بیش تر</InputLabel>
                      <TextField
                        id="company"
                        aria-describedby="my-helper-text"
                        fullWidth
                        // placeholder="رمز عبور"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '6px 3px'
                        }}
                        multiline
                        rows={3}
                        // value={values.company}
                        // onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider
                  variant="middle"
                  sx={{ margin: '20px 0px', width: '98%' }}
                />
              </Box>
              <InputLabelHeader style={{ fontWeight: 700, color: '#231F20' }}>
                جایزه قرعه کشی
              </InputLabelHeader>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ mt: 3 }}>
                    <InputLabel>جایزه ۱</InputLabel>
                    <TextField
                      id="company"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      // value={values.company}
                      // onChange={handleChange}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 3
                }}
              >
                <ConfirmButton
                  disabled={false}
                  variant="contained"
                  //   onClick={() =>
                  //     history.push({
                  //       pathname: '/profile/detail',
                  //       state: {
                  //         data: data
                  //       }
                  //     })
                  //   }
                  style={{ width: '25%' }}
                >
                  {'ثبت قرعه کشی'}
                </ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
