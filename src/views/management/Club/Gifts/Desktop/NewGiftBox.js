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
import { useHistory } from 'react-router-dom';
import MomentEn from 'src/utils/MomentEn';

export default function NewGiftBox() {
  const [gifts, setGifts] = useState([]);
  const [grades, setGrades] = useState([]);

  const history = useHistory();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/management/club/gifts/select_list/`)
      .then(res => {
        if (res.status === 200) {
          setGifts(res.data);
        }
      });
  }, []);

  useEffect(() => {
    httpService
      .post(`${API_BASE_URL}/api/management/club/club_grade/grade_list/`, {
        search: '',
        order: ''
      })
      .then(res => {
        if (res.status === 200) {
          setGrades(res.data);
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
            name: '',
            valid_date: new Date(),
            require_credit: 0,
            require_grade: '',
            description: '',
            gifts: ''
          }}
          // validate={values => {
          //   const errors = {};
          //   if (!values.input) {
          //     errors.username = 'نام کاربری اجباری می باشد';
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/management/club/gift_box/`, {
                name: values.name,
                valid_date: MomentEn(values.valid_date),
                require_credit: values.require_credit,
                require_grade: values.require_grade,
                description: values.description,
                gifts: values.gifts
              })
              .then(res => {
                if (res.status === 201) {
                  setSubmitting(false);
                  history.push('/management/club/gifts');
                }
              })
              .catch(err => {
                setSubmitting(false);
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
                  صندوق جدید
                </InputLabelHeader>
                <Divider
                  variant="middle"
                  sx={{ margin: '6px 0px', width: '98%' }}
                />
                <InputLabelHeader style={{ fontWeight: 700, color: '#231F20' }}>
                  مشخصات
                </InputLabelHeader>
                <Box sx={{ mt: 3 }}>
                  <InputLabel>عنوان صندوق</InputLabel>
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>اعتبار تا</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          value={values.valid_date}
                          onChange={newValue => {
                            setFieldValue('valid_date', newValue);
                          }}
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
                        id="require_credit"
                        aria-describedby="my-helper-text"
                        fullWidth
                        // placeholder="رمز عبور"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px'
                          //   margin: '6px 3px'
                        }}
                        value={values.require_credit}
                        onChange={handleChange}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>سطح کاربری</InputLabel>
                      <Autocomplete
                        // multiple
                        fullWidth
                        disablePortal
                        id="require_grade"
                        limitTags={1}
                        options={grades}
                        getOptionLabel={option => option.name}
                        // defaultValue={values.field}
                        renderInput={params => <TextField {...params} />}
                        onChange={(event, values) => {
                          setFieldValue('require_grade', values.id);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.name
                        }
                        noOptionsText={'موردی یافت نشد'}
                        sx={{
                          '.MuiOutlinedInput-root': {
                            padding: '5px'
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>توضیحات بیش تر</InputLabel>
                      <TextField
                        id="description"
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
                        value={values.description}
                        onChange={handleChange}
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
                جوایز
              </InputLabelHeader>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ mt: 3 }}>
                    <InputLabel>جایزه ها</InputLabel>
                    <Autocomplete
                      multiple
                      fullWidth
                      disablePortal
                      id="gifts"
                      limitTags={2}
                      options={gifts}
                      getOptionLabel={option => option.name}
                      // defaultValue={values.field}
                      renderInput={params => <TextField {...params} />}
                      onChange={(event, values) => {
                        setFieldValue(
                          'gifts',
                          values.map(option => option.id)
                        );
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      noOptionsText={'موردی یافت نشد'}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          padding: '5px'
                        }
                      }}
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
                  style={{ width: '25%' }}
                  type="submit"
                  loading={isSubmitting}
                >
                  {'ثبت جایزه'}
                </ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
