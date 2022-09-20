import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Button,
  Divider,
  TextField,
  Autocomplete
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import profileImg from 'src/assets/img/icons/profile.png';
import useAuth from 'src/hooks/useAuth';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Formik } from 'formik';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ProfileDesktop(props) {
  const history = useHistory();
  const { logout } = useAuth();
  const data = props.location.state.data;

  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/utils/provinces/?country_id=25`)
      .then(res => {
        if (res.status === 200) {
          setProvinces(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (provinceId !== null) {
      httpService
        .get(`${API_BASE_URL}/api/utils/cities/?province__id=${provinceId}`)
        .then(res => {
          if (res.status === 200) {
            setCities(res.data);
          }
        });
    }
  }, [provinceId]);

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
        gap: '30px',
        justifyContent: 'flex-start',
        width: '100%',
        margin: '100px 40px 40px 170px',
        backgroundColor: 'white',
        overflow: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 40px 60px',
          gap: '20px',
          width: '25%'
        }}
      >
        <Avatar
          alt={data?.first_name}
          src={data?.user_profile_image}
          sx={{
            width: 160,
            height: 160
          }}
        />
        <ConfirmButton
          disabled={false}
          variant="contained"
          component="label"
          style={{
            backgroundColor: '#CCEEF0',
            color: '#00AAB5',
            with: '86px'
          }}
        >
          {'انتخاب عکس'}
          <input type="file" hidden />
        </ConfirmButton>
      </Box>
      <Divider light={true} orientation="vertical" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          width: '75%'
        }}
      >
        {data && (
          <Formik
            initialValues={{
              name: data?.first_name,
              family: data?.last_name,
              mobile: data?.mobile,
              province_name: data?.user_location?.province_name,
              city_name: data?.user_location?.city_name,
              postal_code: data?.postal_code,
              address: data?.user_location?.address,
              field: data?.user_type_list,
              company_name: data?.company?.name,
              company_address: data?.company?.location_info?.address
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
              values,
              setFieldValue
            }) => (
              <form
                noValidate
                onSubmit={handleSubmit}
                style={{
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // padding: '0px 30px 0px 20px',
                    gap: '102px',
                    width: '100%'
                  }}
                >
                  <InputLabelHeader style={{ color: '#00AAB5' }}>
                    ویرایش پروفایل
                  </InputLabelHeader>
                </Box>
                <Divider
                  variant="middle"
                  light={true}
                  sx={{ margin: '15px 0px', width: '100%' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    width: '100%'
                  }}
                >
                  <InputLabelHeader>اطلاعات هویتی</InputLabelHeader>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>نام</InputLabel>
                      <TextField
                        id="name"
                        aria-describedby="my-helper-text"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '6px 3px',
                          width: '94%'
                        }}
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>نام خانوادگی</InputLabel>
                      <TextField
                        id="family"
                        aria-describedby="my-helper-text"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '6px 3px',
                          width: '94%'
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
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '6px 3px',
                          width: '94%'
                        }}
                        value={values.mobile}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                </Box>
                <Divider
                  variant="middle"
                  light={true}
                  sx={{ margin: '15px 0px', width: '100%' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // padding: '0px 30px ',
                    gap: '16px',
                    width: '100%'
                  }}
                >
                  <InputLabelHeader>اطلاعات آدرس</InputLabelHeader>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>استان</InputLabel>
                      <Autocomplete
                        disablePortal
                        id="province"
                        options={provinces}
                        renderInput={params => (
                          <TextField {...params} placeholder="استان" />
                        )}
                        value={values.province_name}
                        onChange={(event, newValue) => {
                          setProvinceId(newValue.id);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.label === value.label
                        }
                        sx={{
                          width: '94%'
                        }}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>شهر</InputLabel>
                      <Autocomplete
                        disablePortal
                        id="city"
                        options={cities}
                        value={values.city_name}
                        renderInput={params => (
                          <TextField {...params} placeholder="شهر" />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) setCityId(newValue.id);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.label === value.label
                        }
                        sx={{
                          width: '94%'
                        }}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>کد پستی</InputLabel>
                      <TextField
                        id="postal_code"
                        aria-describedby="my-helper-text"
                        // placeholder="رمز عبور"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '6px 3px',
                          width: '94%'
                        }}
                        value={values.postal_code}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <InputLabel>آدرس</InputLabel>
                    <TextField
                      id="address"
                      aria-describedby="my-helper-text"
                      multiline
                      rows={1}
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px',
                        width: '97%'
                      }}
                      value={values.address}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
                <Divider
                  variant="middle"
                  light={true}
                  sx={{ margin: '15px 0px', width: '100%' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // padding: '0px 30px ',
                    gap: '16px',
                    width: '100%'
                  }}
                >
                  <InputLabelHeader>اطلاعات شغلی</InputLabelHeader>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      width: '100%'
                    }}
                  >
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>زمینه فعالیت</InputLabel>
                      <Autocomplete
                        multiple
                        disablePortal
                        id="field"
                        limitTags={1}
                        options={works}
                        getOptionLabel={option => option.translate}
                        defaultValue={values.field}
                        renderInput={params => <TextField {...params} />}
                        onChange={(event, values) => {
                          console.log('newVal', values);
                          setFieldValue('field', values);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.translate === value.translate
                        }
                        sx={{
                          width: '94%'
                        }}
                      />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <InputLabel>شرکت</InputLabel>
                      <TextField
                        id="company_name"
                        aria-describedby="my-helper-text"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          //   margin: '6px 3px',
                          width: '94%'
                        }}
                        value={values.company_name}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <InputLabel>آدرس</InputLabel>
                    <TextField
                      id="company_address"
                      aria-describedby="my-helper-text"
                      multiline
                      rows={1}
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px',
                        width: '97%'
                      }}
                      value={values.company_address}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
                <Divider
                  variant="middle"
                  light={true}
                  sx={{ margin: '15px 0px', width: '100%' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%',
                    height: '80px',
                    paddingBottom: '20px',
                    paddingRight: '20px'
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      history.push({
                        pathname: '/profile',
                        formName: 'پروفایل کاربر'
                      });
                    }}
                    type={'button'}
                    style={{ width: '200px' }}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton
                    disabled={isSubmitting}
                    style={{ width: '200px' }}
                  >
                    {'ویرایش'}
                  </ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
}
