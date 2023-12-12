import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Desktop/InputLabel';
import { Formik } from 'formik';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import CustomizedProgressBars from 'src/components/Desktop/ProgressBar';
import Upload from 'src/assets/img/icons/upload.svg';
import Delete from 'src/assets/img/icons/delete.svg';
import { useSnackbar } from 'notistack';
function PhotoInfoMobile(props) {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [file, setFile] = useState();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  let data = props.location.state;

  return (
    <Box
      sx={{
        mt: '80px',
        ml: '120px',
        width: '400px',
        background: 'white',
        padding: '20px',
        height: '580px',
        borderRadius: '8px',
        overflow: 'auto'
      }}
    >
      <InputLabelHeader style={{ marginRight: '10px' }}>
        عکس پروژه
      </InputLabelHeader>
      <CustomizedProgressBars activeStep={2} steps={['', '', '']} />

      <Formik
        initialValues={{
          files: data ? data.files : null
        }}
        validationSchema={Yup.object().shape({
          // province: Yup.string().required('استان اجباری می باشد'),
          // city: Yup.string().required('شهر اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          const formData = new FormData();
          formData.append(
            'project_num',
            data ? data.project_num : props.location.state1.project_num
          );
          for (let i = 0; i < file.length; i++) {
            formData.append('files' + i, file[i]);
          }

          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/project/update_project/`, formData)
            .then(res => {
              if (res.status === 200) {
                httpService
                  .post(`${API_BASE_URL}/api/project/submit_project/`, {
                    project_num: data
                      ? data.project_num
                      : props.location.state1.project_num
                  })
                  .then(result => {
                    if (result.status === 200) {
                      if (data) {
                        history.push({
                          pathname: '/project/project/',
                          state: data
                        });
                        setSubmitting(false);
                      } else {
                        history.push({
                          pathname: '/project/project/',
                          state1: result.data
                        });
                        setSubmitting(false);
                      }
                    }
                  })
                  .catch(ex => {
                    if (ex.response.status === 417) {
                      enqueueSnackbar(ex.response.data.error, {
                        variant: 'error'
                      });
                    } else {
                      enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                        variant: 'error'
                      });
                    }
                  });
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
              height: '480px'
            }}
          >
            <Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel style={{ fontSize: '13px' }}>
                  شما میتوانید ۱ تا ۵ عکس برای این پروژه آپلود کنید:
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginBottom: '30px'
                  }}
                >
                  {!file ? (
                    <Button
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '40px 0px',
                        gap: '30px',
                        // width: '480',
                        height: '150px',
                        border: '2px dashed #99DDE1',
                        borderRadius: '4px',
                        color: '#4F4C4D',
                        fontFamily: 'IRANSans',
                        fontWeight: 400,
                        fontSize: '16px',
                        width: '100%'
                      }}
                      component="label"
                      onChange={event => {
                        // console.log('fileeeeee', event.target.files);
                        setFile(Array.from(event.target.files));
                      }}
                    >
                      <img src={Upload} with="33px" height="28px" />
                      {'انتخاب فایل'}
                      <input type="file" hidden multiple={true} />
                    </Button>
                  ) : (
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                      {file.map((item, index) => {
                        return (
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              padding: '20px 0px 5px',
                              gap: '20px',
                              // width: '480px',
                              height: '300px',
                              border: '2px dashed #99DDE1',
                              borderRadius: '4px'
                            }}
                          >
                            <img
                              src={URL.createObjectURL(item)}
                              width="300px"
                              height="150px"
                              style={{ borderRadius: '8px' }}
                            />
                            <InputLabel style={{ color: '#335D8A' }}>
                              {item.name}
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
                                  if (
                                    file.filter(f => f.name !== item.name)
                                      .length > 0
                                  )
                                    setFile(
                                      file.filter(f => f.name !== item.name)
                                    );
                                  else setFile(null);
                                }}
                              >
                                <img src={Delete} width="13px" height="13px" />
                                پاک کردن
                              </Button>
                              {/* <Button
                                sx={{
                                  fontFamily: 'IRANSans',
                                  fontSize: '16px',
                                  fontWeight: 400
                                }}
                                component="label"
                                onChange={e => {
                                  // setFile(e.target.files);
                                  setFile(Array.from(event.target.files));
                                }}
                              >
                                <img src={Attach} width="13px" height="20px" />
                                تغییر فایل
                                <input type="file" hidden multiple={true} />
                              </Button> */}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              </Box>
              {/* {values.files !== undefined &&
                values.files !== null &&
                values.files.map(item => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        border: '1px solid #DFDFDF',
                        padding: '10px',
                        gap: 2,
                        mt: '20px'
                      }}
                    >
                      <img src={Upload} />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%'
                        }}
                      >
                        <InputLabel>نام فایل</InputLabel>
                        <InputLabel>{item?.name}</InputLabel>
                      </Box>
                    </Box>
                  );
                })} */}
            </Box>

            <Box
              sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <ConfirmButton
                disabled={false}
                variant="outlined"
                onClick={() => {
                  history.push({
                    pathname: '/project/project/new/2',
                    state: data
                  });
                }}
                type={'button'}
              >
                {'بازگشت'}
              </ConfirmButton>
              <ConfirmButton type="submit">{'ثبت پروژه'}</ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default PhotoInfoMobile;
