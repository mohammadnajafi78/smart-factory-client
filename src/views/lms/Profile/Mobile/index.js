import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Drawer, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';
import MyCourse from './MyCourse';
import MyExam from './MyExams';
import MyCertificate from './MyCertificate';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import LibraryAdd from 'src/assets/img/library_add.png';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import makeStyles from '@mui/styles/makeStyles';
import InputLabel from 'src/components/Mobile/InputLabel';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    height: '73%'
  }
}));
export default function ProfileMobile() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box sx={{ padding: '20px' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>دوره های من</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <MyCourse />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>آزمون های من</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <MyExam />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>گواهینامه های من</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <MyCertificate />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <ConfirmButton
        style={{
          backgroundColor: '#00346D',
          position: 'absolute',
          bottom: '13%',
          left: '0%'
        }}
        onClick={() => setOpen(true)}
      >
        <img src={LibraryAdd} style={{ marginLeft: '3px' }} />
        درخواست دوره
      </ConfirmButton>

      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.paper
        }}
      >
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
                padding: '20px',
                gap: '50px'
                // position: 'absolute',
                // width: '90%',
                // left: '20px'
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
      </Drawer>
    </Box>
  );
}
