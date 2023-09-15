import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import httpService from 'src/utils/httpService';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import CustomizedProgressBars from 'src/components/Mobile/ProgressBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RequestInfoMobile(props) {
  // let data = props.location.state;
  const [requestTypeList, setRequestTypeList] = useState(null);
  const [requestTypeId, setRequestTypeId] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [projectId, setProjectId] = useState(null);

  const history = useHistory();

  return (
    <Box sx={{ mt: '20px' }}>
      {/* <InputLabelHeader style={{ marginRight: '10px' }}>
        اطلاعات درخواست
      </InputLabelHeader>
      <CustomizedProgressBars percentage={20} /> */}

      <Formik
        initialValues={{
          Desktop: '',
          first_name: '',
          last_name: ''
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('نام اجباری می باشد'),
          last_name: Yup.string().required('نام خانوادگی اجباری می باشد'),
          mobile: Yup.string().required('شماره موبایل اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          httpService
            .post(
              `${API_BASE_URL}/api/project/warranty/update_certificate/
            `,
              {
                ref_num: data?.ref_num,
                mobile: values.mobile,
                first_name: values.first_name,
                last_name: values.last_name
              }
            )
            .then(res => {
              if (res.status === 200) {
                httpService
                  .post(
                    `${API_BASE_URL}/api/project/warranty/submit_certificate/`,
                    {
                      ref_num: data?.ref_num
                    }
                  )
                  .then(res => {
                    if (res.status === 200) {
                      history.push('/project/request');
                    }
                  });
                setSubmitting(false);
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
              height: '540px',
              gap: '20px',
              overflow: 'auto'
            }}
          >
            <Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>اطلاعات کارفرما را مشخص کنید</InputLabel>
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
  );
}

export default RequestInfoMobile;
