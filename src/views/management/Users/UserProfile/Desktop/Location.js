import React, { useEffect, useState } from 'react';
import { Box, TextField, Divider, Grid } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import Text from 'src/components/Desktop/Text';

function LocationMobile(props) {
  const data = props?.data;
  const editable = props?.editable;

  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState(props.data?.location?.province);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(props.data?.location?.city);
  const history = useHistory();

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

  return (
    <Formik
      initialValues={{
        province_name: data?.location?.province_name,
        city_name: data?.location?.city_name,
        postal_code: data?.location?.postal_code,
        address: data?.location?.address,
        provinceId: props.data?.location?.province,
        cityId: props.data?.location?.city
      }}
      validationSchema={Yup.object().shape({
        cityId: Yup.string().required('شهر نباید خالی باشد'),
        provinceId: Yup.string().required('استان نباید خالی باشد')
      })}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        setSubmitting(true);
        if (data.location.id) {
          httpService
            .patch(
              `${API_BASE_URL}/api/management/utils/locations/${data?.location?.id}/`,
              {
                country_id: 25,
                province: provinceId,
                city: cityId,
                address: values.address,
                postal_code: values.postal_code
              }
            )
            .then(res => {
              if (res.status === 200) {
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
        } else {
          httpService
            .post(`${API_BASE_URL}/api/management/util/locations/`, {
              country_id: 25,
              province_id: provinceId,
              city_id: cityId,
              address: values.address,
              postal_code: values.postal_code,
              user_id: data?.user?.user_id,
              is_user: true
            })
            .then(res => {
              if (res.status === 200) {
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
        }
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
            // gap: '100px',
            // position: 'absolute',
            width: '100%',
            height: '100%'
            // left: '20px',
            // top: '57px'
          }}
        >
          <Box
            sx={{
              // display: 'grid',
              // gridTemplateColumns: 'repeat(2, 1fr)',
              // gridColumnGap: '30px',
              mb: 6
            }}
          >
            {editable === false && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'استان'} value={values?.province_name} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'شهر'} value={values?.city_name} />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'کد پستی'} value={values?.postal_code} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <Text label={'آدرس'} value={values?.address} />
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}

            {editable === true && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        استان
                      </InputLabel>
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={provinces}
                        value={
                          provinces.filter(f => f.id === values.provinceId)[0]
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="استان"
                            fullWidth
                            id="provinceId"
                            error={Boolean(
                              touched.provinceId && errors.provinceId
                            )}
                            helperText={touched.provinceId && errors.provinceId}
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setFieldValue('provinceId', newValue.id);
                            setProvinceId(newValue.id);
                            setCityId(null);
                          } else {
                            setFieldValue('provinceId', '');
                          }
                        }}
                        sx={{
                          '.MuiOutlinedInput-root': {
                            padding: '5px'
                          }
                        }}
                        noOptionsText={'موردی یافت نشد'}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>شهر</InputLabel>
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={cities}
                        // sx={{ width: 300 }}
                        defaultValue={
                          cities.filter(f => f.id === values.cityId)[0]
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="شهر"
                            fullWidth
                            id="cityId"
                            error={Boolean(touched.cityId && errors.cityId)}
                            helperText={touched.cityId && errors.cityId}
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setFieldValue('cityId', newValue.id);
                            setCityId(newValue.id);
                          } else {
                            setFieldValue('cityId', '');
                          }
                        }}
                        sx={{
                          '.MuiOutlinedInput-root': {
                            padding: '5px'
                          }
                        }}
                        noOptionsText={'موردی یافت نشد'}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        کد پستی
                      </InputLabel>
                      <TextField
                        id="postal_code"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="کد پستی"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.postal_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>آدرس</InputLabel>
                      <TextField
                        id="address"
                        multiline
                        rows={2}
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="آدرس"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    // padding: '10px',
                    // zIndex: 9999,
                    // backgroundColor: 'white'
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    type="submit"
                    onClick={() => props.setEditable(false)}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton
                    disabled={isSubmitting}
                    type="submit"
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
  );
}

export default LocationMobile;
