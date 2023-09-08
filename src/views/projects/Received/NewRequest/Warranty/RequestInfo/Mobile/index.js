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
          mobile: '',
          first_name: '',
          last_name: '',
          description: ''
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('نام اجباری می باشد'),
          last_name: Yup.string().required('نام خانوادگی اجباری می باشد'),
          mobile: Yup.string().required('شماره موبایل اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/project/design/add_designer/`, {
              type: 'OTHER',
              mobile: values.mobile,
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
              gap: '80px',
              position: 'absolute',
              width: '90%',
              left: '20px'
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
                  id="user_id"
                  value={values.user_id}
                  onChange={handleChange}
                  error={Boolean(touched.user_id && errors.user_id)}
                  helperText={touched.user_id && errors.user_id}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>توضیحات</InputLabel>
                <TextField
                  // {...params}
                  placeholder="توضیحات"
                  multiline
                  rows={3}
                  fullWidth
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
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
