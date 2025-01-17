import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Drawer, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Domain from 'src/assets/img/domain22.png';
import LocationAway from 'src/assets/img/location_away.png';
import PersonFilled from 'src/assets/img/person_filled.png';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Desktop/ProgressBar';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';

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
    minHeight: '65%'
  }
}));
function SupervisorInfoDesktop(props) {
  // let data = props.location.state;
  const [selected, setSelected] = useState('BTS_WE');
  const [openDesigner, setOpenDesigner] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  let types = [
    { name: 'BTS_WE', label: 'طراحی توسط شرکت', image: Domain },
    { name: 'BTS_DESIGNER', label: 'طراح عضو اپلیکیشن', image: LocationAway },
    { name: 'OTHER', label: 'طراح غیر عضو', image: PersonFilled }
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
    <Box
      sx={{
        mt: '80px',
        ml: '120px',
        width: '400px',
        background: 'white',
        padding: '20px',
        height: '650px',
        borderRadius: '8px'
      }}
    >
      <InputLabelHeader style={{ marginRight: '10px' }}>
        انتخاب طراح
      </InputLabelHeader>
      <CustomizedProgressBars activeStep={0} steps={['', '', '']} />

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
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '0px',
              height: '540px',
              gap: '20px',
              overflow: 'auto'
            }}
          >
            <Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>طراحی پروژه توسط:</InputLabel>
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

      <CustomizedDialogs
        open={openDesigner}
        handleClose={() => {
          setOpenDesigner(false);
        }}
        title={'انتخاب طراح'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 15px 0px !important',
              gap: '20px',
              background: '#FFFFFF',
              width: '350px'
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
                    // position: 'absolute',
                    width: '90%'
                    // left: '20px'
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
        }
      />

      <CustomizedDialogs
        open={openOther}
        handleClose={() => {
          setOpenOther(false);
        }}
        title={'انتخاب طراح'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 15px 0px !important',
              gap: '20px',
              background: '#FFFFFF',
              width: '350px'
            }}
          >
            <Formik
              initialValues={{
                Desktop: '',
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
                    Desktop: values.Desktop,
                    first_name: values.first_name,
                    last_name: values.last_name
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
                    // position: 'absolute',
                    width: '90%'
                    // left: '20px'
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
                        id="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        error={Boolean(touched.first_name && errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <InputLabel>نام خانوادگی</InputLabel>
                      <TextField
                        // {...params}
                        placeholder="نام خانوادگی"
                        fullWidth
                        id="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        error={Boolean(touched.last_name && errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
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
        }
      />
    </Box>
  );
}

export default SupervisorInfoDesktop;
