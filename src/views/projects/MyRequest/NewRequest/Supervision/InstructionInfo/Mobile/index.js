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
import { Download } from 'react-feather';
import Article from 'src/assets/img/article.png';

function InstructionInfoMobile(props) {
  let data = props.location.state;
  const [files, setFiles] = useState(null);

  const history = useHistory();
  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/project/supervision/get_file?ref_num=${data?.ref_num}`
      )
      .then(res => {
        if (res.status === 200) {
          setFiles(res.data);
        }
      });
  }, []);

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>
        دریافت دستورالعمل
      </InputLabelHeader>
      <CustomizedProgressBars percentage={66.66} />

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
            .post(
              `${API_BASE_URL}/api/project/supervision/submit_supervision/`,
              {
                ref_num: data?.ref_num
              }
            )
            .then(res => {
              if (res.status === 200) {
                history.push({
                  pathname: '/project/request'
                  // state: res.data
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
                <InputLabel>
                  در این قسمت میتوانید دستورالعمل را دریافت کنید
                </InputLabel>
                {/* <ProjectTreeView url="/api/project/get_project_type" /> */}
              </Box>
              {files &&
                files.map(item => {
                  return (
                    <a
                      href={''}
                      download
                      target="_blank"
                      style={{ textDecoration: 'none', width: '100%' }}
                    >
                      <ConfirmButton
                        style={{
                          color: '#6685A7',
                          backgroundColor: '#E6EBF0',
                          position: 'relative',
                          bottom: 0,
                          marginTop: '30px',
                          border: 'none',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box sx={{ display: 'inline-flex' }}>
                          <img src={Article} />
                          <InputLabel style={{ color: '#6685A7' }}>
                            دستورالعمل
                          </InputLabel>
                        </Box>
                        <Box sx={{ display: 'inline-flex' }}>
                          <Download
                            style={{
                              color: '#00346D',
                              width: '20px',
                              height: '20px',
                              marginLeft: '3px'
                            }}
                          />
                          <InputLabel style={{ color: '#00346D' }}>
                            دانلود
                          </InputLabel>
                        </Box>
                      </ConfirmButton>
                    </a>
                  );
                })}
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
              <ConfirmButton type="submit">{'ثبت'}</ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default InstructionInfoMobile;