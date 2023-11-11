import { Box, Grid, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { useState } from 'react';
import LibraryAdd from 'src/assets/img/library_add.png';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import MyCertificate from '../Mobile/MyCertificate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MyCourse from './MyCourse';
import MyExam from './MyExams';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
export default function ProfileDesktop() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: '60px',
          padding: '20px',
          marginRight: '140px',
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <ConfirmButton
            style={{
              backgroundColor: '#00346D',
              width: '200px'
            }}
            onClick={() => setOpen(true)}
          >
            <img src={LibraryAdd} style={{ marginLeft: '3px' }} />
            درخواست دوره
          </ConfirmButton>
        </Box>

        <Grid container sx={{ paddingTop: '30px' }} spacing={2}>
          <Grid item md={8} sx={{ background: 'white', mt: '15px' }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="دوره های من"
                    {...a11yProps(0)}
                    sx={{
                      fontFamily: 'IRANSans',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#335D8A'
                    }}
                  />
                  <Tab
                    label="آزمون های من"
                    {...a11yProps(1)}
                    sx={{
                      fontFamily: 'IRANSans',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#335D8A'
                    }}
                  />
                </Tabs>
              </Box>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <MyCourse />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <MyExam />
                </TabPanel>
              </SwipeableViews>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Accordion expanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>گواهینامه های من</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <MyCertificate />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>

      <CustomizedDialogs
        title={'درخواست دوره'}
        open={open}
        handleClose={() => setOpen(false)}
        content={
          <Formik
            initialValues={{
              subject: '',
              teacher: '',
              detail: ''
            }}
            validationSchema={Yup.object().shape({
              // user_id: Yup.string().required('کد کاربری اجباری می باشد')
              // project: Yup.string().required('پروژه مورد نظر اجباری می باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              console.log('inja');
              setSubmitting(true);
              httpService
                .post(`${API_BASE_URL}/api/lms/request/`, {
                  subject: values.subject,
                  teacher: values.teacher,
                  detail: values.detail
                })
                .then(res => {
                  if (res.status === 201) {
                    setOpen(false);
                    setSubmitting(false);
                  }
                })
                .catch(ex => {
                  setSubmitting(false);
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
                  padding: '10px',
                  gap: '50px',
                  width: '400px'
                }}
              >
                <Box>
                  <Box sx={{ mt: 2 }}>
                    <InputLabel>عنوان دروه درخواستی</InputLabel>
                    <TextField
                      placeholder="عنوان دوره"
                      fullWidth
                      id="subject"
                      value={values.subject}
                      onChange={handleChange}
                      // error={Boolean(touched.subject && errors.subject)}
                      // helperText={touched.subject && errors.subject}
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <InputLabel>نام و نام خانوادگی مدرس درخواستی</InputLabel>
                    <TextField
                      placeholder="نام و نام خانوادگی"
                      fullWidth
                      id="teacher"
                      value={values.teacher}
                      onChange={handleChange}
                      // error={Boolean(touched.user_id && errors.user_id)}
                      // helperText={touched.user_id && errors.user_id}
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <InputLabel>شرح دوره و سرفصل ها</InputLabel>
                    <TextField
                      placeholder="شرح"
                      fullWidth
                      id="detail"
                      value={values.detail}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      // error={Boolean(touched.user_id && errors.user_id)}
                      // helperText={touched.user_id && errors.user_id}
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
                      setOpen(false);
                    }}
                    type={'button'}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton type="submit">{'ثبت درخواست'}</ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        }
      />
    </>
  );
}
