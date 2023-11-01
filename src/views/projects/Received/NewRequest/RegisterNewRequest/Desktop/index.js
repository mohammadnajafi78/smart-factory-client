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

function RegisterNewRequestMobile(props) {
  // let data = props.location.state;
  const [requestTypeList, setRequestTypeList] = useState(null);
  const [requestTypeId, setRequestTypeId] = useState(null);
  const [projectList, setProjectList] = useState(null);
  const [projectId, setProjectId] = useState(null);

  const history = useHistory();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_actions`)
      .then(res => {
        if (res.status === 200) {
          setRequestTypeList(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (requestTypeId) {
      httpService
        .post(
          `${API_BASE_URL}/api/project/get_project_list/?action=${requestTypeId.toLowerCase()}`
        )
        .then(res => {
          if (res.status === 200) {
            setProjectList(res.data);
          }
        });
    }
  }, [requestTypeId]);

  return (
    <Box
      sx={{
        mt: '80px',
        ml: '120px',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <InputLabelHeader style={{ margin: '10px', color: '#335D8A' }}>
        ثبت درخواست جدید
      </InputLabelHeader>

      <Box
        sx={{
          background: 'white',
          padding: '20px',
          height: '380px',
          borderRadius: '8px',
          width: '400px'
        }}
      >
        {/* <CustomizedProgressBars percentage={33.33} /> */}

        <Formik
          initialValues={{
            requestTypeName: '',
            project: ''
          }}
          validationSchema={Yup.object().shape({
            // requestTypeName: Yup.string().required('نوع پروژه اجباری می باشد'),
            // project: Yup.string().required('پروژه مورد نظر اجباری می باشد')
          })}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            setSubmitting(true);
            httpService
              .post(`${API_BASE_URL}/api/project/add_request/`, {
                project_num: projectId,
                request_type: requestTypeId
              })
              .then(res => {
                if (res.status === 201) {
                  if (requestTypeId.toLowerCase() === 'design')
                    history.push({
                      pathname: '/project/request/new/design/reqInfo',
                      state: {
                        project_num: projectId,
                        request_type: requestTypeId
                      }
                    });
                  else if (requestTypeId.toLowerCase() === 'bom')
                    history.push({
                      pathname: '/project/request/new/bom/reqInfo',
                      state: {
                        project_num: projectId,
                        request_type: requestTypeId
                      }
                    });
                  else if (requestTypeId.toLowerCase() === 'supervision')
                    history.push({
                      pathname:
                        '/project/request/new/supervision/supervisorInfo',
                      state: {
                        project_num: projectId,
                        request_type: requestTypeId
                      }
                    });
                  else if (requestTypeId.toLowerCase() === 'warranty')
                    history.push({
                      pathname: '/project/request/new/warranty/reqInfo',
                      state: {
                        project_num: projectId,
                        request_type: requestTypeId
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
                height: '300px'
              }}
            >
              <Box>
                <Box sx={{ mt: 2 }}>
                  <InputLabel>نوع درخواست</InputLabel>
                  {requestTypeList && (
                    <Autocomplete
                      disablePortal
                      fullWidth
                      options={requestTypeList}
                      // value={values.status_name}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="نوع درخواست"
                          fullWidth
                          id="requestType"
                          // error={Boolean(touched.status_name && errors.status_name)}
                          // helperText={touched.status_name && errors.status_name}
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setFieldValue('requestTypeName', newValue.label);
                          setRequestTypeId(newValue.name);
                        } else {
                          setFieldValue('requestTypeName', '');
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
                <Box sx={{ mt: 2 }}>
                  <InputLabel>پروژه مورد نظر</InputLabel>
                  {projectList && (
                    <Autocomplete
                      disablePortal
                      id="projectList"
                      options={projectList}
                      renderInput={params => (
                        <TextField {...params} placeholder="پروژه مورد نظر" />
                      )}
                      // value={values.province_name}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setFieldValue('projectName', newValue.name);
                          setProjectId(newValue.project_num);
                        } else {
                          setFieldValue('projectName', '');
                        }
                      }}
                      getOptionLabel={option => option.name}
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
                  {'لغو'}
                </ConfirmButton>
                <ConfirmButton type="submit">{'ثبت درخواست'}</ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default RegisterNewRequestMobile;
