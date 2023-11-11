import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Formik } from 'formik';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Mobile/ProgressBar';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import ProjectTreeView from '../../../Menu';
import { useSnackbar } from 'notistack';

function RegisterNewRequestMobile(props) {
  const [designType, setDesignType] = useState([]);
  const [control, setControl] = useState('MANUAL');
  const { enqueueSnackbar } = useSnackbar();

  const state = props.location.state;

  const history = useHistory();

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>
        اطلاعات درخواست
      </InputLabelHeader>
      <CustomizedProgressBars percentage={33.33} />

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
            .post(`${API_BASE_URL}/api/project/design/update_design/`, {
              ref_num: state.data.ref_num,
              design_type: designType,
              control: control
            })
            .then(res => {
              if (res.status === 200) {
                history.push({
                  pathname: '/project/request/new/design/techInfo',
                  state: res.data
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
                <InputLabel>
                  اطلاعات زیر را جهت ثبت درخواست وارد کنید
                </InputLabel>
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabelHeader
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#00346D'
                  }}
                >
                  نوع طراحی
                </InputLabelHeader>
                <ProjectTreeView
                  url="/api/project/get_project_type"
                  designType={designType}
                  setDesignType={setDesignType}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <InputLabelHeader
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#00346D'
                  }}
                >
                  نوع سیستم کنترل
                </InputLabelHeader>
                <FormControl sx={{ width: '95%' }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={control}
                    onChange={event => {
                      setControl(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="THERMOSTATIC"
                      control={<Radio sx={{ padding: '4px' }} />}
                      label="ترموستاتیک"
                      sx={{
                        backgroundColor: '#E6EBF0',
                        padding: '4px',
                        margin: '4px 0px',
                        borderRadius: '4px',
                        '.MuiTypography-root': {
                          color: '#00346D',
                          fontSize: '14px',
                          fontWeight: 500
                        }
                      }}
                    />
                    <FormControlLabel
                      value="MANUAL"
                      control={<Radio sx={{ padding: '4px' }} />}
                      label="دستی"
                      sx={{
                        backgroundColor: '#E6EBF0',
                        padding: '4px',
                        margin: '4px 0px',
                        borderRadius: '4px',
                        '.MuiTypography-root': {
                          color: '#00346D',
                          fontSize: '14px',
                          fontWeight: 500
                        }
                      }}
                    />
                  </RadioGroup>
                </FormControl>
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

export default RegisterNewRequestMobile;
