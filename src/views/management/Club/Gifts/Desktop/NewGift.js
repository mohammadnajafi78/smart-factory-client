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
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';
import MomentEn from 'src/utils/MomentEn';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function NewCompetition() {
  const [giftType, setGiftType] = useState([]);
  const [grades, setGrades] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/club/gift_type/`)
      .then(res => {
        if (res.status === 200) {
          setGiftType(res.data);
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
            description: '',
            credit: '',
            start_date: new Date(),
            expire_date: new Date(),
            grade: '',
            gift_type: '',
            image: null
          }}
          // validate={values => {
          //   const errors = {};
          //   if (!values.input) {
          //     errors.username = 'نام کاربری اجباری می باشد';
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            const formData = new FormData();
            formData.append('image', values.image);
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('credit', values.credit);
            formData.append('start_date', MomentEn(values.start_date));
            formData.append('expire_date', MomentEn(values.expire_date));
            formData.append('grade', values.grade);
            formData.append('gift_type', values.gift_type);

            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/management/club/gifts/`, formData)
              .then(res => {
                if (res.status === 201) {
                  setSubmitting(false);
                  history.push('/management/club/gifts');
                }
              })
              .catch(ex => {
                setSubmitting(false);
                if (ex.response.status === 417) {
                  enqueueSnackbar(ex.response.data.error, { variant: 'error' });
                } else {
                  enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                    variant: 'error'
                  });
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
                  جایزه جدید
                </InputLabelHeader>
                <Divider
                  variant="middle"
                  sx={{ margin: '6px 0px', width: '98%' }}
                />
                <InputLabelHeader style={{ fontWeight: 700, color: '#231F20' }}>
                  مشخصات
                </InputLabelHeader>
                <Box sx={{ mt: 3 }}>
                  <InputLabel>عنوان جایزه</InputLabel>
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
                      <InputLabel>تاریخ شروع</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          value={values.start_date}
                          onChange={newValue => {
                            setFieldValue('start_date', newValue);
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
                      <InputLabel>تاریخ پایان</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          value={values.expire_date}
                          onChange={newValue => {
                            setFieldValue('start_date', newValue);
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
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>امتیاز</InputLabel>
                      <TextField
                        id="credit"
                        aria-describedby="my-helper-text"
                        fullWidth
                        // placeholder="رمز عبور"
                        InputProps={{ inputProps: { min: 0 } }}
                        type="number"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px'
                          //   margin: '6px 3px'
                        }}
                        value={values.credit}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>نوع</InputLabel>
                      <Autocomplete
                        // multiple
                        fullWidth
                        disablePortal
                        id="gift_type"
                        limitTags={1}
                        options={giftType}
                        getOptionLabel={option => option.translate}
                        // defaultValue={values.field}
                        renderInput={params => <TextField {...params} />}
                        onChange={(event, values) => {
                          setFieldValue('gift_type', values.id);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.translate === value.translate
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
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>سطح</InputLabel>
                      <Autocomplete
                        // multiple
                        fullWidth
                        disablePortal
                        id="grade"
                        limitTags={1}
                        options={grades}
                        getOptionLabel={option => option.name}
                        // defaultValue={values.field}
                        renderInput={params => <TextField {...params} />}
                        onChange={(event, values) => {
                          setFieldValue('grade', values.id);
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
                عکس جایزه
              </InputLabelHeader>
              <Grid container spacing={2}>
                <Grid item xs={12} justifyContent="center">
                  {values.image === null ? (
                    <Box sx={{ mt: 3 }}>
                      <Button
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '40px 0px',
                          gap: '30px',
                          width: '100%',
                          height: '150px',
                          border: '2px dashed #99DDE1',
                          borderRadius: '4px',
                          color: '#4F4C4D',
                          fontFamily: 'IRANSans',
                          fontWeight: 400,
                          fontSize: '16px'
                        }}
                        component="label"
                        onChange={event => {
                          setFieldValue('image', event.target.files[0]);
                        }}
                      >
                        <img src={Upload} with="33px" height="28px" />
                        {'انتخاب فایل'}
                        <input type="file" hidden />
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 0px 5px',
                        gap: '20px',
                        // width: '480px',
                        height: '320px',
                        border: '2px dashed #99DDE1',
                        borderRadius: '4px',
                        margin: '20px'
                      }}
                    >
                      <img
                        src={URL.createObjectURL(values.image)}
                        width="300px"
                        height="180px"
                        style={{ borderRadius: '8px' }}
                      />
                      <InputLabel style={{ color: '#335D8A' }}>
                        {values.image.name}
                      </InputLabel>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: '100%'
                        }}
                      >
                        <Button
                          sx={{
                            fontFamily: 'IRANSans',
                            fontSize: '16px',
                            fontWeight: 400
                          }}
                          onClick={() => {
                            setFieldValue('image', null);
                          }}
                        >
                          <img src={Delete} width="13px" height="13px" />
                          پاک کردن
                        </Button>
                        <Button
                          sx={{
                            fontFamily: 'IRANSans',
                            fontSize: '16px',
                            fontWeight: 400
                          }}
                          component="label"
                          onChange={e => {
                            setFieldValue('image', e.target.files[0]);
                          }}
                        >
                          <img src={Attach} width="13px" height="20px" />
                          تغییر فایل
                          <input type="file" hidden multiple={false} />
                        </Button>
                      </Box>
                    </Box>
                  )}
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
