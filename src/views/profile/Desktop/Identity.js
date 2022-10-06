import React, { useEffect, useState } from 'react';
import { Box, TextField, Divider, Autocomplete, Grid } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import LinkIconButton from 'src/components/Mobile/Button/LinkIcon';
import IdCard from 'src/assets/img/icons/id_card.svg';
import MomentEn from 'src/utils/MomentEn';

function IdentityInfoMobile(props) {
  const history = useHistory();
  const data = props?.data;
  const editable = props?.editable;
  const [works, setWorks] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [introducer, setIntroducer] = useState(null);

  // useEffect(() => {
  //   httpService
  //     .get(`${API_BASE_URL}/api/users/user_type/activity_list`)
  //     .then(res => {
  //       if (res.status === 200) {
  //         setWorks(res.data);
  //       }
  //     });
  // }, []);

  return (
    <>
      <Formik
        initialValues={{
          name: data?.first_name,
          family: data?.last_name,
          // mobile: data?.mobile,
          email: data?.email,
          national_id: data?.national_id,
          birth_date: data?.birth_date,
          user_type_list: data?.user_type_list,
          supplier_data: data?.supplier_data,
          introducer_data: data?.introducer_data,
          job_certificate_id: data?.job_certificate_id,
          job_certificate: data?.job_certificate,
          id_card: data?.id_card
        }}
        // validate={values => {
        //   const errors = {};
        //   // if (!values.input) {
        //   //   errors.username = 'نام کاربری اجباری می باشد';
        //   // }
        //   return errors;
        // }}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          const formData = new FormData();
          formData.append('first_name', values.name);
          formData.append('last_name', values.family);
          // formData.append('mobile', values.mobile);
          formData.append('email', values.email);
          formData.append('national_id', values.national_id);
          formData.append('birth_date', MomentEn(values.birth_date));
          formData.append('job_certificate_id', values.job_certificate_id);
          formData.append('job_certificate', values.job_certificate);
          if (supplier !== null) formData.append('supplier', supplier);
          if (introducer !== null) formData.append('introducer', introducer);
          formData.append('id_card', values.id_card);

          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/users/update_user/`, formData)
            .then(res => {
              if (res.status === 200) {
                // history.push('/location');
                props.getData();
                setSubmitting(false);
                props.setEditable(false);
              } else {
                setSubmitting(false);
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
              justifyContent: 'space-between',
              padding: '0px',
              gap: '0px',
              // position: 'absolute',
              width: '100%',
              height: '100%'
              // left: '20px',
              // top: '57px',
            }}
          >
            <Box
              sx={{
                mb: 3
                // display: 'grid',
                // gridTemplateColumns: 'repeat(2, 1fr)',
                // gridColumnGap: '30px'
              }}
            >
              {editable === true && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          نام
                        </InputLabel>
                        <TextField
                          id="name"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="نام"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px'
                          }}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          نام خانوادگی
                        </InputLabel>
                        <TextField
                          id="family"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="نام خانوادگی"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px'
                          }}
                          value={values.family}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          ایمیل
                        </InputLabel>
                        <TextField
                          id="email"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="ایمیل"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px'
                          }}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          تاریخ تولد
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                          <DatePicker
                            id="birth_date"
                            value={values.birth_date}
                            onChange={newValue => {
                              setFieldValue('birth_date', newValue);
                            }}
                            renderInput={params => (
                              <TextField
                                {...params}
                                sx={{
                                  background: '#F2F2F2',
                                  margin: '3px'
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
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          کد ملی
                        </InputLabel>
                        <TextField
                          id="national_id"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="کد ملی"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px'
                          }}
                          value={values.national_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} mt={3}>
                      <LinkIconButton
                        style={{
                          marginTop: '12px',
                          backgroundColor: '#DDF5F6',
                          color: '#00AAB5',
                          height: '56px'
                        }}
                        component="label"
                        onChange={event => {
                          setFieldValue('id_card', event.target.files[0]);
                        }}
                      >
                        <img src={IdCard} />
                        کارت ملی
                        <input type="file" hidden multiple={false} />
                      </LinkIconButton>
                    </Grid>
                  </Grid>
                  <Divider variant="middle" sx={{ margin: '10px 0px' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {values.supplier_data === null && (
                        <Box sx={{ mt: 1, mb: 1 }}>
                          <InputLabel style={{ color: '#A7A5A6' }}>
                            تامین کننده
                          </InputLabel>
                          <TextField
                            id="supplier"
                            aria-describedby="my-helper-text"
                            fullWidth
                            placeholder="تامین کننده"
                            sx={{
                              background: '#F2F2F2',
                              borderRadius: '4px',
                              margin: '3px'
                            }}
                            value={event => setSupplier(event.target.value)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {values.introducer_data === null && (
                        <Box sx={{ mt: 1, mb: 1 }}>
                          <InputLabel style={{ color: '#A7A5A6' }}>
                            معرف
                          </InputLabel>
                          <TextField
                            id="introducer"
                            aria-describedby="my-helper-text"
                            fullWidth
                            placeholder="معرف"
                            sx={{
                              background: '#F2F2F2',
                              borderRadius: '4px',
                              margin: '3px'
                            }}
                            value={values.introducer}
                            onChange={event =>
                              setIntroducer(event.target.value)
                            }
                            onBlur={handleBlur}
                          />
                        </Box>
                      )}
                    </Grid>

                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          شناسه مدرک فعالیت
                        </InputLabel>
                        <TextField
                          id="job_certificate_id"
                          aria-describedby="my-helper-text"
                          fullWidth
                          placeholder="شناسه مدرک فعالیت"
                          sx={{
                            background: '#F2F2F2',
                            borderRadius: '4px',
                            margin: '3px'
                          }}
                          value={values.job_certificate_id}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} mt={3}>
                      <LinkIconButton
                        style={{
                          marginTop: '12px',
                          backgroundColor: '#DDF5F6',
                          color: '#00AAB5',
                          height: '56px'
                        }}
                        component="label"
                        onChange={event => {
                          setFieldValue(
                            'job_certificate',
                            event.target.files[0]
                          );
                        }}
                      >
                        <img src={IdCard} />
                        مدرک فعالیت
                        <input type="file" hidden multiple={false} />
                      </LinkIconButton>
                    </Grid>
                  </Grid>
                </>
              )}

              {editable === false && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          ایمیل
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values?.email}
                        </InputLabel>
                        {/* <Divider /> */}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          کد ملی
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values?.national_id}
                        </InputLabel>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider variant="middle" sx={{ margin: '10px 0px' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          تاریخ تولد
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values.birth_date && MomentFa(values?.birth_date)}
                        </InputLabel>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          فعالیت
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values?.user_type_list
                            ?.map(option => option.translate)
                            .toString()}
                        </InputLabel>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider variant="middle" sx={{ margin: '10px 0px' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          تامین کننده
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values?.supplier_data?.first_name +
                            ' ' +
                            values?.supplier_data?.last_name}
                        </InputLabel>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          معرف
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values?.introducer_data?.first_name +
                            ' ' +
                            values?.introducer_data?.last_name}
                        </InputLabel>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider variant="middle" sx={{ margin: '10px 0px' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          شناسه مدرک فعالیت
                        </InputLabel>
                        <InputLabel style={{ color: '#231F20' }}>
                          {values?.job_certificate_id}
                        </InputLabel>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          کارت ملی
                        </InputLabel>
                        <img
                          src={values?.id_card}
                          width="320px"
                          height="160px"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          مدرک فعالیت
                        </InputLabel>
                        <img
                          src={values?.job_certificate}
                          width="320px"
                          height="160px"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>

            {editable && (
              <>
                <Divider sx={{ margin: '10px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      justifyContent: 'space-between',
                      gap: 2,
                      width: '50%'
                    }}
                  >
                    <ConfirmButton
                      disabled={false}
                      variant="outlined"
                      onClick={() => props.setEditable(false)}
                    >
                      {'لغو'}
                    </ConfirmButton>
                    <ConfirmButton
                      disabled={isSubmitting}
                      type="submit"
                      // onClick={() => handleSubmit()}
                      loading={isSubmitting}
                    >
                      {'ذخیره'}
                    </ConfirmButton>
                  </Box>
                </Box>
              </>
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

export default IdentityInfoMobile;
