import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, TextField, Autocomplete } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';
import { useSnackbar } from 'notistack';
import {
  ClockPicker,
  DatePicker,
  LocalizationProvider
} from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DateTimePicker, TimePicker } from '@mui/lab';
import { AttachFile } from '@mui/icons-material';

export default function NewExam({
  open,
  handleClose,
  data,
  title,
  type,
  ...props
}) {
  return (
    <>
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        title={title}
        content={
          <Formik
            initialValues={
              type === 'edit'
                ? {
                    name: data ? data?.name : '',
                    description: data ? data?.description : '',
                    category: data ? data?.category?.name : '',
                    question_count: data ? data?.question_count : '',
                    date: data ? data?.date : '',
                    start_time: data ? data?.start_time : '',
                    end_time: data ? data?.end_time : '',
                    other: data ? data?.OTHER : '',
                    exam: data ? data?.EXAM : ''
                  }
                : ''
            }
            validationSchema={Yup.object().shape({
              name: Yup.string().required('پر کردن فیلد اجباری است'),
              description: Yup.string().required('پر کردن فیلد اجباری است'),
              category: Yup.string().required('پر کردن فیلد اجباری است'),
              question_count: Yup.string().required('پر کردن فیلد اجباری است'),
              date: Yup.string().required('پر کردن فیلد اجباری است'),
              start_time: Yup.string().required('پر کردن فیلد اجباری است'),
              end_time: Yup.string().required('پر کردن فیلد اجباری است'),
              other: Yup.string().required('پر کردن فیلد اجباری است'),
              exam: Yup.string().required('پر کردن فیلد اجباری است')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);

              const formData = new FormData();

              formData.append('name', values.name);
              formData.append('description', values.description);
              formData.append('category', values.category);
              formData.append('question_count', values.question_count);
              formData.append('date', values.date);
              formData.append('start_time', values.start_time);
              formData.append('end_time', values.end_time);
              formData.append('OTHER', values.other);
              formData.append('EXAM', values.exam);

              if (type === 'new') {
                httpService
                  .post(`${API_BASE_URL}/api/management/lms/exam/`, formData)
                  .then(res => {
                    if (res.status === 201) {
                      handleClose();
                      props.reloadData();
                      setSubmitting(false);
                    }
                  })
                  .catch(ex => {
                    enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                      variant: 'error'
                    });
                  });
              } else {
                console.log('edit');
                // httpService
                //   .patch(
                //     `${API_BASE_URL}/api/management/product/product/${data.id}/`,
                //     formData
                //   )
                //   .then(res => {
                //     if (res.status === 200) {
                //       handleClose();
                //       props.setData(res.data);
                //       setSubmitting(false);
                //     }
                //   })
                //   .catch(ex => {
                //     if (ex.response.status === 417) {
                //       enqueueSnackbar(ex.response.data.error, {
                //         variant: 'error'
                //       });
                //     } else {
                //       enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                //         variant: 'error'
                //       });
                //     }
                //   });
              }
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
                // noValidate
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
                <Grid container spacing={2}>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      عنوان آزمون
                    </InputLabel>
                    <TextField
                      id="name"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        color: '#000000',
                        fontWeight: '900',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px',
                        border: 'none'
                      }}
                      //   inputProps={{
                      //     style: {
                      //       color: '#00000',
                      //       fontWeight: 500
                      //     }
                      //   }}
                      value={values.name}
                      onChange={handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      تعداد سوالات
                    </InputLabel>
                    <TextField
                      id="question_count"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        color: '#000',
                        fontWeight: '800',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      type="number"
                      value={values.question_count}
                      onChange={handleChange}
                      error={Boolean(
                        touched.question_count && errors.question_count
                      )}
                      helperText={
                        touched.question_count && errors.question_count
                      }
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      تاریخ برگزاری آزمون
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        id="start_date"
                        value={values.date}
                        onChange={newValue => {
                          setFieldValue('date', newValue);
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            sx={{
                              background: '#F2F2F2',
                              margin: '6px 3px'
                            }}
                            fullWidth
                            error={Boolean(touched.date && errors.date)}
                            helperText={touched.date && errors.date}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      ساعت برگزاری آزمون
                    </InputLabel>

                    <TextField
                      id="start_time"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        color: '#000',
                        fontWeight: '800',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.start_time}
                      onChange={handleChange}
                      error={Boolean(touched.start_time && errors.start_time)}
                      helperText={touched.start_time && errors.start_time}
                      type={'text'}
                    />
                  </Grid>
                  <Divider sx={{ marginBottom: '20px' }} />
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      مدت زمان آزمون
                    </InputLabel>
                    <TextField
                      id="end_time"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        color: '#000',
                        fontWeight: '800',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.end_time}
                      onChange={handleChange}
                      error={Boolean(touched.end_time && errors.end_time)}
                      helperText={touched.end_time && errors.end_time}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      نمره قبولی
                    </InputLabel>
                    <TextField
                      id="large_plural_package_qty"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      //   value={values.large_plural_package_qty}
                      //   onChange={handleChange}
                      //   error={Boolean(
                      //   )}
                      //   helperText={

                      //   }
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      نوع آزمون
                    </InputLabel>
                    <TextField
                      id="category"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        color: '#000',
                        fontWeight: '800',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.category}
                      onChange={handleChange}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      شرح آزمون
                    </InputLabel>
                    <TextField
                      id="description"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        color: '#000',
                        fontWeight: '800',
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.description}
                      onChange={handleChange}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      فایل سوالات
                    </InputLabel>
                    <ConfirmButton
                      disabled={false}
                      variant="outlined"
                      component="label"
                      style={{
                        width: '50%',
                        height: '30px',
                        margin: '6px 3px'
                      }}
                    >
                      <AttachFile />
                      {'آپلود فایل'}
                      <input
                        type="file"
                        onChange={handleChange}
                        value={values.exam}
                        hidden
                        multiple
                      />
                    </ConfirmButton>
                  </Grid>
                  <Divider sx={{ marginBottom: '20px' }} />
                </Grid>

                <Divider sx={{ m: 2 }} />
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
                  <ConfirmButton
                    // disabled={true}
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                    }}
                    type={'button'}
                    style={{ width: '150px' }}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    style={{ width: '150px' }}
                    onClick={handleSubmit}
                  >
                    ایجاد آزمون
                  </ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        }
      />
    </>
  );
}
