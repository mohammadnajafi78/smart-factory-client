import React, { useEffect, useState } from 'react';
import { Box, TextField, Divider, Autocomplete } from '@mui/material';
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

function IdentityInfoMobile(props) {
  const history = useHistory();
  const data = props?.data;
  const editable = props?.editable;
  const [works, setWorks] = useState([]);
  // const [supplier, setSupplier] = useState(null);
  // const [introducer, setIntroducer] = useState(null);

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
          id_card: data?.id_card,
          introducer: data?.introducer_data?.user_id,
          supplier: data?.supplier_data?.user_id
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('عبارت وارد شده باید به فرمت ایمیل باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting, setFieldError }) => {
          const formData = new FormData();
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
          if (values.supplier !== null)
            formData.append('supplier', values.supplier);
          if (values.introducer !== null)
            formData.append('introducer', values.introducer);
          if (values.id_card != null)
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
              console.log('error', err.response.data);
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
              gap: '100px',
              // position: 'absolute',
              width: '100%',
              height: '100%'
              // left: '20px',
              // top: '57px'
            }}
          >
            <Box sx={{ mb: 6 }}>
              {editable === true && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>نام</InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="نام"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
              )}
              {editable === true && (
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
                      margin: '6px 3px'
                    }}
                    value={values.family}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.family && errors.family)}
                    helperText={touched.family && errors.family}
                  />
                </Box>
              )}
              {editable === false && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>ایمیل</InputLabel>
                  <InputLabel style={{ color: '#231F20' }}>
                    {values?.email}
                  </InputLabel>
                  <Divider />
                </Box>
              )}
              {editable === true && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>ایمیل</InputLabel>
                  <TextField
                    id="email"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="ایمیل"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
              )}
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>کد ملی</InputLabel>
                    <InputLabel style={{ color: '#231F20' }}>
                      {values?.national_id}
                    </InputLabel>
                  </Box>
                  <Divider />
                </>
              )}
              {editable === true && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>کد ملی</InputLabel>
                  <TextField
                    id="national_id"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="کد ملی"
                    sx={{
                      background: '#F2F2F2',
                      borderRadius: '4px',
                      margin: '6px 3px'
                    }}
                    value={values.national_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.national_id && errors.national_id)}
                    helperText={touched.national_id && errors.national_id}
                  />
                </Box>
              )}
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      تاریخ تولد
                    </InputLabel>
                    <InputLabel style={{ color: '#231F20' }}>
                      {values.birth_date && MomentFa(values.birth_date)}
                    </InputLabel>
                  </Box>
                  <Divider />
                </>
              )}
              {editable === true && (
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
                          helperText={touched.birth_date && errors.birth_date}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              )}
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>فعالیت</InputLabel>
                    <InputLabel style={{ color: '#231F20' }}>
                      {values?.user_type_list
                        ?.map(option => option.translate)
                        .toString()}
                    </InputLabel>
                  </Box>
                  <Divider />
                </>
              )}
              {/* {editable === true && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>فعالیت</InputLabel>
                  <Autocomplete
                    multiple
                    disablePortal
                    id="user_type_list"
                    limitTags={1}
                    options={works}
                    getOptionLabel={option => option.translate}
                    defaultValue={values.user_type_list}
                    renderInput={params => <TextField {...params} />}
                    onChange={(event, values) => {
                      console.log(
                        'user_type_list',
                        values.map(m => m.id)
                      );
                      // setFieldValue(
                      //   'user_type_list',
                      //   values.map(m => m.id)
                      // );
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.translate === value.translate
                    }
                    noOptionsText={'موردی یافت نشد'}
                  />
                </Box>
              )} */}
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      تامین کننده
                    </InputLabel>
                    <InputLabel style={{ color: '#231F20' }}>
                      {values?.supplier_data
                        ? values?.supplier_data.first_name +
                          ' ' +
                          values?.supplier_data.last_name
                        : ''}
                    </InputLabel>
                  </Box>
                  <Divider />
                </>
              )}
              {values.supplier_data === null && editable === true && (
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
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>معرف</InputLabel>
                    <InputLabel style={{ color: '#231F20' }}>
                      {values?.introducer_data
                        ? values?.introducer_data.first_name +
                          ' ' +
                          values?.introducer_data.last_name
                        : ''}
                    </InputLabel>
                  </Box>
                  <Divider />
                </>
              )}
              {values.introducer_data === null && editable === true && (
                <Box sx={{ mt: 1, mb: 1 }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>معرف</InputLabel>
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
                    error={Boolean(touched.introducer && errors.introducer)}
                    helperText={touched.introducer && errors.introducer}
                  />
                </Box>
              )}
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      شناسه مدرک فعالیت
                    </InputLabel>
                    <InputLabel style={{ color: '#231F20' }}>
                      {values?.job_certificate_id}
                    </InputLabel>
                  </Box>
                  <Divider />
                </>
              )}
              {editable === true && (
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
                      margin: '6px 3px'
                    }}
                    value={values.job_certificate_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.job_certificate_id && errors.job_certificate_id
                    )}
                    helperText={
                      touched.job_certificate_id && errors.job_certificate_id
                    }
                  />
                </Box>
              )}
              {editable === false && (
                <>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      کارت ملی
                    </InputLabel>
                    <img src={values?.id_card} width="320px" height="160px" />
                  </Box>
                  <Divider />
                </>
              )}
              {editable === true && (
                <>
                  <LinkIconButton
                    style={{
                      marginTop: '20px',
                      backgroundColor: '#DDF5F6',
                      color: '#00AAB5'
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
                </>
              )}

              {editable === false && (
                <>
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
                </>
              )}
              {editable === true && (
                <>
                  <LinkIconButton
                    style={{
                      marginTop: '20px',
                      backgroundColor: '#DDF5F6',
                      color: '#00AAB5'
                    }}
                    component="label"
                    onChange={event => {
                      setFieldValue('job_certificate', event.target.files[0]);
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
                </>
              )}
            </Box>
            {editable && (
              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  width: '100%'
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
                  disabled={isSubmitting}
                  type="submit"
                  // onClick={() => handleSubmit()}
                  loading={isSubmitting}
                >
                  {'ذخیره'}
                </ConfirmButton>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

export default IdentityInfoMobile;