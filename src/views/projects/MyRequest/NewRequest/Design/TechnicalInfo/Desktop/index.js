import { Box, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import CustomizedProgressBars from 'src/components/Desktop/ProgressBar';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

function TechnicalInfoDesktop(props) {
  let data = props.location.state;
  const [questions, setQuestions] = useState(null);

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
      });
  }, []);

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
        اطلاعات فنی طراحی
      </InputLabelHeader>
      <CustomizedProgressBars activeStep={1} steps={['', '', '', '', '']} />

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
          let temp = [];
          for (const [key, value] of Object.entries(values)) {
            temp.push({
              id: key, // question id
              type: questions.filter(f => f.id == key)[0].question_type,
              answer: value // selected items id
            });
          }
          httpService
            .post(`${API_BASE_URL}/api/project/design/add_question_response/`, {
              ref_num: data?.ref_num,
              questions: temp
            })
            .then(res => {
              if (res.status === 200) {
                history.push({
                  pathname: '/project/request/new/design/mapInfo',
                  state: data
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
                <InputLabel>فرم های اطلاعات فنی طراحی را پر کنید</InputLabel>
              </Box>
              {questions && (
                <Box sx={{ mt: 2 }}>
                  {questions.map(item => {
                    return (
                      <>
                        {item.question_type === 'TEXT' && (
                          <Box sx={{ mt: 2 }}>
                            <InputLabel>{item.question}</InputLabel>
                            <TextField
                              placeholder="مساحت زیربنا"
                              fullWidth
                              id={item.id}
                              value={values[item.id]}
                              onChange={handleChange}
                              error={Boolean(
                                touched[item.id] && errors[item.id]
                              )}
                              helperText={touched[item.id] && errors[item.id]}
                            />
                          </Box>
                        )}
                        {item.question_type === 'SINGLE_CHOICE' && (
                          <Box sx={{ mt: 2 }}>
                            <FormControl>
                              <FormLabel
                                sx={{ color: 'black', fontWeight: 400 }}
                              >
                                {item.question}
                              </FormLabel>
                              <RadioGroup
                                defaultValue="female"
                                name={item.id}
                                id={item.id}
                                onChange={event => {
                                  setFieldValue(item.id, event.target.value);
                                }}
                                value={values[item.id]}
                              >
                                {item.items.map(sub => {
                                  return (
                                    <FormControlLabel
                                      value={sub.id}
                                      control={<Radio />}
                                      label={sub.text}
                                    />
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        )}
                        {item.question_type === 'MULTI_CHOICE' && (
                          <Box sx={{ mt: 2 }}>
                            <FormLabel sx={{ color: 'black', fontWeight: 400 }}>
                              {item.question}
                            </FormLabel>
                            <FormGroup>
                              {item.items.map(sub => {
                                return (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        id={item.id}
                                        name={sub.id}
                                        onChange={event => {
                                          if (values[item.id])
                                            setFieldValue(item.id, [
                                              ...values[item.id],
                                              sub.id
                                            ]);
                                          else {
                                            let temp = [];
                                            temp.push(sub.id);
                                            setFieldValue(item.id, temp);
                                          }
                                        }}
                                        // name={}
                                      />
                                    }
                                    label={sub.text}
                                  />
                                );
                              })}
                            </FormGroup>
                          </Box>
                        )}
                      </>
                    );
                  })}
                </Box>
              )}
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
                    pathname: '/project/request/new/design/reqInfo',
                    state: data
                  });
                }}
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

export default TechnicalInfoDesktop;
