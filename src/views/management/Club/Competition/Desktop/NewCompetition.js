import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Divider, Grid, TextField } from '@mui/material';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import IconButton from 'src/components/Desktop/Button/Icon';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { Plus } from 'react-feather';
import p2e from 'src/utils/P2E';
import { useHistory } from 'react-router-dom';
import MomentEn from 'src/utils/MomentEn';

export default function NewCompetition() {
  const [gifts, setGifts] = useState([]);
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
            start_date: new Date(),
            end_date: new Date(),
            winner_count: 0,
            description: '',
            details: '',
            prize: []
          }}
          // validate={values => {
          //   const errors = {};
          //   if (!values.input) {
          //     errors.username = 'نام کاربری اجباری می باشد';
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            console.log('values', values);
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/management/club/matches/`, {
                name: values.name,
                start_date: MomentEn(values.start_date),
                end_date: MomentEn(values.end_date),
                winner_count: values.winner_count,
                description: values.description,
                details: values.details,
                prize: values.prize
              })
              .then(res => {
                if (res.status === 201) {
                  setSubmitting(false);
                  history.push('/management/club/competition');
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
                  مسابقه جدید
                </InputLabelHeader>
                <Divider
                  variant="middle"
                  sx={{ margin: '6px 0px', width: '98%' }}
                />
                <InputLabelHeader style={{ fontWeight: 700, color: '#231F20' }}>
                  مشخصات
                </InputLabelHeader>
                <Box sx={{ mt: 3 }}>
                  <InputLabel>عنوان مسابقه</InputLabel>
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
                      <InputLabel>زمان شروع</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          id="start_date"
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
                      <InputLabel>زمان پایان</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          id="end_date"
                          value={values.end_date}
                          onChange={newValue => {
                            setFieldValue('end_date', newValue);
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
                  {/* <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>کاربران هدف</InputLabel>
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
                        onChange={(event, values) => {
                          setFieldValue('field', values);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.translate === value.translate
                        }
                      />
                    </Box>
                  </Grid> */}
                  <Grid item xs={6}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>تعداد برندگان</InputLabel>
                      <TextField
                        id="winner_count"
                        aria-describedby="my-helper-text"
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        // placeholder="رمز عبور"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px'
                          //   margin: '6px 3px'
                        }}
                        value={values.winner_count}
                        onChange={(event, values) => {
                          console.log('values', event.target.value);
                          setFieldValue(
                            'winner_count',
                            p2e(event.target.value)
                          );
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>معرفی مسابقه</InputLabel>
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
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 3 }}>
                      <InputLabel>توضیحات بیش تر</InputLabel>
                      <TextField
                        id="details"
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
                        value={values.details}
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
                      id="prize"
                      limitTags={2}
                      options={gifts}
                      getOptionLabel={option => option.name}
                      // defaultValue={values.field}
                      renderInput={params => <TextField {...params} />}
                      onChange={(event, values) => {
                        setFieldValue(
                          'prize',
                          values.map(option => option.id)
                        );
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      noOptionsText={'موردی یافت نشد'}
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ mt: 3 }}>
                    <InputLabel>جایزه ۳</InputLabel>
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
                <Grid item xs={6}>
                  <Box sx={{ mt: 3 }}>
                    <InputLabel>جایزه ۴</InputLabel>
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
              </Grid> */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 3
                }}
              >
                <ConfirmButton
                  disabled={isSubmitting}
                  variant="contained"
                  //   onClick={() =>
                  //     history.push({
                  //       pathname: '/profile/details',
                  //       state: {
                  //         data: data
                  //       }
                  //     })
                  //   }
                  style={{ width: '25%' }}
                  type="submit"
                  loading={isSubmitting}
                >
                  {'ثبت مسابقه'}
                </ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
