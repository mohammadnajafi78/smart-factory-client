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
import * as Yup from 'yup';
import Text from 'src/components/Desktop/Text';

function IdentityInfoMobile(props) {
  const history = useHistory();
  const data = props?.data;
  const editable = props?.editable;
  const [works, setWorks] = useState([]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/management/user/user_type/type_list`)
      .then(res => {
        if (res.status === 200) {
          setWorks(res.data);
        }
      });
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          name: data?.user?.first_name,
          family: data?.user?.last_name,
          // mobile: data?.mobile,
          email: data?.user?.email,
          national_id: data?.user?.national_id,
          birth_date: data?.user?.birth_date,
          user_type_list: data?.user?.user_type_list,
          supplier_data: data?.user?.supplier_data,
          introducer_data: data?.user?.introducer_data,
          job_certificate_id: data?.user?.job_certificate_id,
          job_certificate: data?.user?.job_certificate,
          id_card: data?.user?.id_card,
          introducer: data?.user?.introducer_data?.user_id,
          supplier: data?.user?.supplier_data?.user_id
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('عبارت وارد شده باید به فرمت ایمیل باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting, setFieldError }) => {
          const formData = new FormData();
          formData.append('user_id', data?.user?.user_id);
          if (values.name != null) formData.append('first_name', values.name);
          if (values.family != null)
            formData.append('last_name', values.family);
          // formData.append('mobile', values.mobile);
          if (values.email != null) formData.append('email', values.email);
          if (values.national_id != null)
            formData.append('national_id', values.national_id);
          if (values.birth_date != null)
            formData.append('birth_date', MomentEn(values.birth_date));
          if (values.job_certificate_id != null)
            formData.append('job_certificate_id', values.job_certificate_id);
          if (values.job_certificate != null)
            formData.append('job_certificate', values.job_certificate);
          if (
            values.supplier !== null &&
            values.supplier !== undefined &&
            data.supplier_data === null
          )
            formData.append('supplier', values.supplier);
          if (
            values.introducer !== null &&
            values.introducer !== undefined &&
            data.introducer_data === null
          )
            formData.append('introducer', values.introducer);
          if (values.id_card != null)
            formData.append('id_card', values.id_card);

          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/management/user/update_user/`, formData)
            .then(res => {
              if (res.status === 200) {
                httpService
                  .post(`${API_BASE_URL}/api/management/user/add_user_type/`, {
                    user_type: values.user_type_list.map(item => item.id),
                    user_id: data?.user?.user_id
                  })
                  .then(res => {
                    props.getData();
                    setSubmitting(false);
                    props.setEditable(false);
                  });
              } else {
                setSubmitting(false);
              }
            })
            .catch(err => {
              err.response.data.map(e => {
                setFieldError(e.field, e.error);
              });
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
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
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
                          error={Boolean(touched.family && errors.family)}
                          helperText={touched.family && errors.family}
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
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
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
                                error={Boolean(
                                  touched.birth_date && errors.birth_date
                                )}
                                helperText={
                                  touched.birth_date && errors.birth_date
                                }
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <InputLabel style={{ color: '#A7A5A6' }}>
                          فعالیت
                        </InputLabel>
                        <Autocomplete
                          disablePortal
                          fullWidth
                          multiple={true}
                          options={works}
                          value={values.user_type_list}
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="فعالیت"
                              fullWidth
                              id="user_type_list"
                              error={Boolean(
                                touched.user_type_list && errors.user_type_list
                              )}
                              helperText={
                                touched.user_type_list && errors.user_type_list
                              }
                            />
                          )}
                          // onChange={(event, values) => {
                          //   console.log('newValue', newValue);
                          //   if (newValue) {
                          //     setFieldValue('workId', newValue.id);
                          //     // setProvinceId(newValue.id);
                          //     // setCityId(null);
                          //   } else {
                          //     setFieldValue('workId', '');
                          //   }
                          // }}
                          onChange={(event, values) => {
                            setFieldValue('user_type_list', values);
                          }}
                          sx={{
                            '.MuiOutlinedInput-root': {
                              padding: '5px'
                            }
                          }}
                          noOptionsText={'موردی یافت نشد'}
                          getOptionLabel={option => option.translate}
                        />
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
                          error={Boolean(
                            touched.national_id && errors.national_id
                          )}
                          helperText={touched.national_id && errors.national_id}
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
                      {touched['id_card'] && errors['id_card'] && (
                        <ErrorMessage name={'id_card'}>
                          {msg => (
                            <div
                              style={{
                                color: 'red',
                                textAlign: 'right',
                                marginTop: '5px'
                              }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
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
                            value={values.supplier}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.supplier && errors.supplier)}
                            helperText={touched.supplier && errors.supplier}
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.introducer && errors.introducer
                            )}
                            helperText={touched.introducer && errors.introducer}
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
                          error={Boolean(
                            touched.job_certificate_id &&
                              errors.job_certificate_id
                          )}
                          helperText={
                            touched.job_certificate_id &&
                            errors.job_certificate_id
                          }
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
                      {touched['job_certificate'] && errors['job_certificate'] && (
                        <ErrorMessage name={'job_certificate'}>
                          {msg => (
                            <div
                              style={{
                                color: 'red',
                                textAlign: 'right',
                                marginTop: '5px'
                              }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      )}
                    </Grid>
                  </Grid>
                </>
              )}

              {editable === false && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Text label={'ایمیل'} value={values?.email} />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Text label={'کد ملی'} value={values?.national_id} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Text
                          label={'تاریخ تولد'}
                          value={
                            values.birth_date && MomentFa(values.birth_date)
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <div style={{ display: 'inline-flex' }}>
                          <InputLabel
                            style={{ color: '#00AAB5', width: '28%' }}
                          >{`فعالیت: `}</InputLabel>
                          <InputLabel
                            style={{
                              color: '#335D8A',
                              whiteSpace: 'break-spaces'
                            }}
                          >
                            {values?.user_type_list
                              ?.map(option => option.translate)
                              .toString()}
                          </InputLabel>
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Text
                          label={'تامین کننده'}
                          value={
                            values.supplier_data
                              ? values?.supplier_data?.first_name +
                                ' ' +
                                values?.supplier_data?.last_name
                              : ''
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Text
                          label={'معرف'}
                          value={
                            values.introducer_data
                              ? values?.introducer_data?.first_name +
                                ' ' +
                                values?.introducer_data?.last_name
                              : ''
                          }
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ mt: 1, mb: 1 }}>
                        <Text
                          label={'شناسه مدرک فعالیت'}
                          value={values?.job_certificate_id}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          mt: 1,
                          mb: 1,
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          borderRadius: '8px',
                          background: '#DDF5F6'
                        }}
                      >
                        <InputLabel style={{ color: '#00346D' }}>
                          کارت ملی
                        </InputLabel>
                        <img
                          src={values?.id_card}
                          width="100%"
                          height="160px"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          mt: 1,
                          mb: 1,
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          borderRadius: '8px',
                          background: '#DDF5F6'
                        }}
                      >
                        <InputLabel style={{ color: '#00346D' }}>
                          مدرک فعالیت
                        </InputLabel>
                        <img
                          src={values?.job_certificate}
                          width="100%"
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
