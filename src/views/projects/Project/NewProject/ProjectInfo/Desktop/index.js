import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import CustomizedProgressBars from 'src/components/Desktop/ProgressBar';
import { useSnackbar } from 'notistack';

function ProjectInfoDesktop(props) {
  // let data = props.location.state;
  let data = props.location.state;
  console.log('state', props.location.state);
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(
    data ? data.location.province : null
  );
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(data ? data.location.city : null);
  const [statusList, setStatusList] = useState(null);
  const [statusId, setStatusId] = useState(
    data ? data.project_state.name : null
  );
  const { enqueueSnackbar } = useSnackbar();
  // const [data, setData] = useState(
  //   props.location.state?.back === true
  //     ? props.location.state?.data
  //     : props.location.state
  // );
  const history = useHistory();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/utils/provinces/?country_id=25`)
      .then(res => {
        if (res.status === 200) {
          setProvinces(res.data);
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
    if (provinceId !== null) {
      httpService
        .get(`${API_BASE_URL}/api/utils/cities/?province__id=${provinceId}`)
        .then(res => {
          if (res.status === 200) {
            setCities(res.data);
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
    }
  }, [provinceId]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_state`)
      .then(res => {
        if (res.status === 200) {
          setStatusList(res.data);
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
    if (props.location.state?.back === true) {
      httpService
        .get(
          `${API_BASE_URL}/api/project/get_project?project_num=${data.project_num}`
        )
        .then(res => {
          if (res.status === 200) {
            console.log('inja', res.data);
            // setSelected(res.data);
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
    }
  }, []);

  return (
    <Box
      sx={{
        mt: '80px',
        ml: '120px',
        width: '400px',
        background: 'white',
        padding: '20px',
        height: '550px',
        borderRadius: '8px'
      }}
    >
      <InputLabelHeader style={{ marginRight: '10px', fontSize: '14px' }}>
        اطلاعات پروژه
      </InputLabelHeader>
      <CustomizedProgressBars activeStep={0} steps={['', '', '']} />

      <Formik
        initialValues={{
          name: data ? data.name : '',
          province_name: data ? data.location.province_name : '',
          city_name: data ? data.location.city_name : '',
          status_name: data ? data.project_state.label : '',
          address: data ? data.location.address : ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('نام اجباری می باشد'),
          province_name: Yup.string().required('استان اجباری می باشد'),
          city_name: Yup.string().required('شهر اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          if (data) {
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/project/update_project/`, {
                project_num: data.project_num,
                province: provinceId,
                city: cityId,
                is_user: true,
                name: values.name,
                address: values.address,
                state: statusId
              })
              .then(res => {
                if (res.status === 200) {
                  history.push({
                    pathname: '/project/project/new/2',
                    state: res.data
                  });
                  setSubmitting(false);
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
            setSubmitting(false);
          } else {
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/project/`, {
                province: provinceId,
                city: cityId,
                is_user: true,
                name: values.name,
                address: values.address,
                state: statusId
              })
              .then(res => {
                if (res.status === 201) {
                  history.push({
                    pathname: '/project/project/new/2',
                    state: res.data
                  });
                  setSubmitting(false);
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
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '0px',
              height: '440px'
            }}
          >
            <Box>
              <Box sx={{ mt: 1 }}>
                <InputLabel style={{ fontSize: '12px' }}>نام پروژه</InputLabel>
                <TextField
                  // {...params}
                  placeholder="نام پروژه"
                  fullWidth
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                <InputLabel style={{ fontSize: '12px' }}>وضعیت</InputLabel>
                {statusList && (
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={statusList}
                    value={values.status_name}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="وضعیت"
                        fullWidth
                        id="status"
                        // error={Boolean(touched.status_name && errors.status_name)}
                        // helperText={touched.status_name && errors.status_name}
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setFieldValue('status_name', newValue.label);
                        setStatusId(newValue.name);
                      } else {
                        setFieldValue('status_name', '');
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    noOptionsText={'موردی یافت نشد'}
                    sx={{
                      '.MuiOutlinedInput-root': {
                        padding: '5px'
                      }
                    }}
                  />
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <InputLabel style={{ fontSize: '12px' }}>استان</InputLabel>
                {provinces && (
                  <Autocomplete
                    disablePortal
                    id="province"
                    options={provinces}
                    renderInput={params => (
                      <TextField {...params} placeholder="استان" />
                    )}
                    value={values.province_name}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setFieldValue('province_name', newValue.label);
                        setProvinceId(newValue.id);
                      } else {
                        setFieldValue('province_name', '');
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    sx={{
                      '.MuiOutlinedInput-root': {
                        padding: '5px'
                      }
                    }}
                    noOptionsText={'موردی یافت نشد'}
                  />
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <InputLabel style={{ fontSize: '12px' }}>شهر</InputLabel>
                {cities && (
                  <Autocomplete
                    disablePortal
                    id="city"
                    options={cities}
                    value={values.city_name}
                    renderInput={params => (
                      <TextField {...params} placeholder="شهر" />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setFieldValue('city_name', newValue.label);
                        setCityId(newValue.id);
                      } else {
                        setFieldValue('city_name', '');
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    sx={{
                      '.MuiOutlinedInput-root': {
                        padding: '5px'
                      }
                    }}
                    noOptionsText={'موردی یافت نشد'}
                  />
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <InputLabel style={{ fontSize: '12px' }}>آدرس</InputLabel>
                <TextField
                  placeholder="آدرس"
                  fullWidth
                  id="address"
                  multiline
                  rows={2}
                  value={values.address}
                  onChange={handleChange}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Box>
            </Box>
            <Box
              sx={
                {
                  // position: 'absolute',
                  // bottom: 0,
                  // width: '100%'
                }
              }
            >
              <ConfirmButton
                disabled={isSubmitting}
                loading={isSubmitting}
                type="submit"
                // style={{ fontSize: '12px' }}
              >
                {'ثبت'}
              </ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default ProjectInfoDesktop;
