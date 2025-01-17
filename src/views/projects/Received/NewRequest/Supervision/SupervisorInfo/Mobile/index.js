import React, { useEffect, useState } from 'react';
import { Box, TextField, Drawer } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import CustomizedProgressBars from 'src/components/Mobile/ProgressBar';
import LocationAway from 'src/assets/img/location_away.png';
import PersonFilled from 'src/assets/img/person_filled.png';
import Domain from 'src/assets/img/domain22.png';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  },
  paper2: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '80%'
  }
}));
function SupervisorInfoMobile(props) {
  // let data = props.location.state;
  const [requestTypeList, setRequestTypeList] = useState(null);
  const [requestTypeId, setRequestTypeId] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [selected, setSelected] = useState('BTS_WE');
  const [openDesigner, setOpenDesigner] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  let types = [
    { name: 'BTS_WE', label: 'مهندس ناظر شرکت', image: Domain },
    { name: 'BTS_DESIGNER', label: 'ناظر عضو اپلیکیشن', image: LocationAway },
    { name: 'OTHER', label: 'ناظر غیر عضو', image: PersonFilled }
  ];

  useEffect(() => {
    if (selected === 'BTS_DESIGNER') {
      setOpenDesigner(true);
    } else if (selected === 'OTHER') {
      setOpenOther(true);
    }
  }, [selected]);

  const history = useHistory();

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>
        انتخاب ناظر
      </InputLabelHeader>
      <CustomizedProgressBars percentage={33.33} />

      <Formik
        initialValues={
          {
            // requestTypeName: '',
            // project: ''
          }
        }
        validationSchema={Yup.object().shape({
          // requestTypeName: Yup.string().required('نوع پروژه اجباری می باشد'),
          // project: Yup.string().required('پروژه مورد نظر اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/project/design/update_design/`, {
              ref_num: '',
              design_type: [1, 2, 3],
              control: 'MANUAL'
            })
            .then(res => {
              if (res.status === 200) {
                history.push({
                  pathname: '/project/project/new/2'
                  // state: res.data
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
              gap: '159px',
              position: 'absolute',
              width: '90%',
              height: '88%',
              left: '20px',
              top: '67px'
            }}
          >
            <Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>نظارت پروژه توسط:</InputLabel>
                {/* <ProjectTreeView url="/api/project/get_project_type" /> */}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '8px',
                    marginTop: '10px'
                  }}
                >
                  {types.map((item, index) => {
                    return (
                      <>
                        {item.name === 'BTS_WE' ? (
                          <Box
                            sx={{
                              display: 'flex',
                              // flexDirection: 'column',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              padding: '10px 12px',
                              gap: '6px',
                              // width: '100px',

                              // background:
                              //   selected === item.name ? '#CCEEF0' : '#E6EBF0',
                              background: '#E6EBF0',
                              borderRadius: '4px',
                              border:
                                selected === item.name
                                  ? '1px solid #335D8A'
                                  : 'none'
                            }}
                            onClick={() => setSelected(item.name)}
                          >
                            <img src={item.image} />
                            <InputLabel
                              style={{
                                textAlign: 'center',
                                color: '#335D8A',
                                fontSize: '12px',
                                lineHeight: 'inherit'
                              }}
                            >
                              {item.label}
                            </InputLabel>
                          </Box>
                        ) : (
                          <Accordion
                            sx={{
                              background: '#E6EBF0',
                              borderRadius: '4px',
                              border:
                                selected === item.name
                                  ? '1px solid #335D8A'
                                  : 'none'
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              onClick={() => {
                                setSelected(item.name);
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  // flexDirection: 'column',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                  // padding: '10px 12px',
                                  gap: '6px',
                                  // width: '100px',

                                  // background:
                                  //   selected === item.name ? '#CCEEF0' : '#E6EBF0',
                                  background: '#E6EBF0'
                                  // borderRadius: '4px',
                                  // border:
                                  //   selected === item.name
                                  //     ? '1px solid #335D8A'
                                  //     : 'none'
                                }}
                              >
                                <img src={item.image} />
                                <InputLabel
                                  style={{
                                    textAlign: 'center',
                                    color: '#335D8A',
                                    fontSize: '12px',
                                    lineHeight: 'inherit'
                                  }}
                                >
                                  {item.label}
                                </InputLabel>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        )}
                      </>
                    );
                  })}
                </Box>
              </Box>
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
                // onClick={() => {
                //   history.push({
                //     pathname: '/project/project/new/2',
                //     state: data
                //   });
                // }}
                type={'button'}
              >
                {'بازگشت'}
              </ConfirmButton>
              <ConfirmButton type="submit">{'بعدی'}</ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>

      <Drawer
        anchor={'bottom'}
        open={openDesigner}
        onClose={() => {
          setOpenDesigner(false);
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#FFFFFF',
            width: '100%'
          }}
        >
          <Formik
            initialValues={{
              user_id: ''
            }}
            validationSchema={Yup.object().shape({
              user_id: Yup.string().required('کد کاربری اجباری می باشد')
              // project: Yup.string().required('پروژه مورد نظر اجباری می باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);
              httpService
                .post(`${API_BASE_URL}/api/project/design/add_designer/`, {
                  type: 'BTS_DESIGNER',
                  user_id: values.user_id
                })
                .then(res => {
                  if (res.status === 200) {
                    // history.push({
                    //   pathname: '/project/project/new/2'
                    //   // state: res.data
                    // });
                    setSubmitting(false);
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
                  gap: '100px',
                  position: 'absolute',
                  width: '90%',
                  left: '20px'
                }}
              >
                <Box sx={{ mt: 2 }}>
                  <InputLabel>کد کاربری مهندس طراح را وارد کنید</InputLabel>
                  <TextField
                    // {...params}
                    placeholder="کد کاربری"
                    fullWidth
                    id="user_id"
                    value={values.user_id}
                    onChange={handleChange}
                    error={Boolean(touched.user_id && errors.user_id)}
                    helperText={touched.user_id && errors.user_id}
                  />
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
                      setOpenDesigner(false);
                    }}
                    type={'button'}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton type="submit">{'ثبت'}</ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Drawer>

      <Drawer
        anchor={'bottom'}
        open={openOther}
        onClose={() => {
          setOpenOther(false);
        }}
        classes={{
          paper: classes.paper2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#FFFFFF',
            width: '100%'
          }}
        >
          <Formik
            initialValues={{
              mobile: '',
              first_name: '',
              last_name: '',
              supervision_id: ''
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().required('نام اجباری می باشد'),
              last_name: Yup.string().required('نام خانوادگی اجباری می باشد'),
              mobile: Yup.string().required('شماره موبایل اجباری می باشد'),
              supervision_id: Yup.string().required(
                'کد نظام مهندسی اجباری می باشد'
              )
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);
              httpService
                .post(`${API_BASE_URL}/api/project/design/add_designer/`, {
                  type: 'OTHER',
                  mobile: values.mobile,
                  first_name: values.first_name,
                  last_name: values.last_name,
                  supervision_id: values.supervision_id
                })
                .then(res => {
                  if (res.status === 200) {
                    // history.push({
                    //   pathname: '/project/project/new/2'
                    //   // state: res.data
                    // });
                    setSubmitting(false);
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
                  gap: '50px',
                  position: 'absolute',
                  width: '90%',
                  left: '20px'
                }}
              >
                <Box>
                  <Box sx={{ mt: 2 }}>
                    <InputLabel>مشخصات مهندس طراح را وارد کنید</InputLabel>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <InputLabel>نام</InputLabel>
                    <TextField
                      // {...params}
                      placeholder="نام"
                      fullWidth
                      id="user_id"
                      value={values.user_id}
                      onChange={handleChange}
                      error={Boolean(touched.user_id && errors.user_id)}
                      helperText={touched.user_id && errors.user_id}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <InputLabel>نام خانوادگی</InputLabel>
                    <TextField
                      // {...params}
                      placeholder="نام خانوادگی"
                      fullWidth
                      id="user_id"
                      value={values.user_id}
                      onChange={handleChange}
                      error={Boolean(touched.user_id && errors.user_id)}
                      helperText={touched.user_id && errors.user_id}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <InputLabel>شماره موبایل</InputLabel>
                    <TextField
                      // {...params}
                      placeholder="شماره موبایل"
                      fullWidth
                      id="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      error={Boolean(touched.mobile && errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <InputLabel>کد نظام مهندسی</InputLabel>
                    <TextField
                      // {...params}
                      placeholder="کد نظام مهندسی"
                      fullWidth
                      id="supervision_id"
                      value={values.supervision_id}
                      onChange={handleChange}
                      error={Boolean(
                        touched.supervision_id && errors.supervision_id
                      )}
                      helperText={
                        touched.supervision_id && errors.supervision_id
                      }
                    />
                  </Box>
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
                      setOpenDesigner(false);
                    }}
                    type={'button'}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton type="submit">{'ثبت'}</ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SupervisorInfoMobile;
