import { Box, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Mobile/ProgressBar';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';

function TechnicalInfoMobile(props) {
  let data = props.location.state;
  const [questions, setQuestions] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/project/design/get_questions/?ref_num=${data?.ref_num}`
      )
      .then(res => {
        if (res.status === 200) {
          setQuestions(res.data);
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

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>
        اطلاعات فنی طراحی
      </InputLabelHeader>
      <CustomizedProgressBars percentage={40} />

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
                <InputLabel>فرم های اطلاعات فنی طراحی را پر کنید</InputLabel>
                {/* <ProjectTreeView url="/api/project/get_project_type" /> */}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>عنوان</InputLabel>
                  <TextField
                    // {...params}
                    placeholder="مساحت زیربنا"
                    fullWidth
                    id="area"
                    value={values.area}
                    onChange={handleChange}
                    error={Boolean(touched.area && errors.area)}
                    helperText={touched.area && errors.area}
                  />
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
    </Box>
  );
}

export default TechnicalInfoMobile;
