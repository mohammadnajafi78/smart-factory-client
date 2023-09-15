import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
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
import Upload from 'src/assets/img/icons/upload.svg';

function MapInfoDesktop(props) {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [statusList, setStatusList] = useState([]);
  const [file, setFile] = useState();
  const history = useHistory();
  let data = props.location.state;
  console.log('inja', data);

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
        بارگزاری نقشه
      </InputLabelHeader>
      <CustomizedProgressBars activeStep={2} steps={['', '', '', '', '']} />

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
            'ref_num',
            data ? data.ref_num : props.location.state1.ref_num
          );
          formData.append('RAW_PLAN', values.files);

          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/project/design/update_design/`, formData)
            .then(res => {
              if (res.status === 200) {
                if (data) {
                  history.push({
                    pathname: '/project/request/new/design/designerInfo',
                    state: data
                  });
                  setSubmitting(false);
                } else {
                  history.push({
                    pathname: '/project/request/new/design/designerInfo',
                    state1: state1
                  });
                  setSubmitting(false);
                }
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
                <InputLabel style={{ fontSize: '13px' }}>
                  نقشه Autocad پروژه را بارگذاری کنید:
                </InputLabel>
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 0px',
                    // gap: '30px',
                    // width: '480',
                    height: '150px',
                    border: '2px dashed #99DDE1',
                    borderRadius: '4px',
                    color: '#4F4C4D',
                    fontFamily: 'IRANSans',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                  component="label"
                  onChange={event => {
                    console.log('files', event.target.files);
                    setFieldValue('files', event.target.files);
                  }}
                >
                  <img src={Upload} with="33px" height="28px" />
                  <InputLabel style={{ color: '#00346D', fontSize: '14px' }}>
                    {'انتخاب فایل'}
                  </InputLabel>
                  <InputLabel style={{ color: '#00346D', fontSize: '12px' }}>
                    {'حداکثر حجم فایل 3M'}
                  </InputLabel>
                  <InputLabel style={{ color: '#00346D', fontSize: '10px' }}>
                    {'فرمت فایل ها:‌DWG, DGN, ACIS'}
                  </InputLabel>
                  <input type="file" hidden />
                </Button>
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
                    pathname: '/project/request/new/design/techInfo',
                    state: data
                  });
                }}
                type={'button'}
              >
                {'بارگشت'}
              </ConfirmButton>
              <ConfirmButton type="submit">{'بعدی'}</ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default MapInfoDesktop;
