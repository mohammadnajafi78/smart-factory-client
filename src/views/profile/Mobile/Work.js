import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  ListItemIcon,
  TextField
} from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from 'src/utils/urls';
import axios from 'src/utils/axios';
import httpService from 'src/utils/httpService';
import Autocomplete from '@mui/material/Autocomplete';

function WorkMobile(props) {
  const history = useHistory();
  const [works, setWorks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const data = props.location.state.data;

  useEffect(() => {
    if (provinceId !== null) {
      httpService
        .get(`${API_BASE_URL}/api/utils/cities/?province__id=${provinceId}`)
        .then(res => {
          if (res.status === 200) {
            setCities(res.data);
          }
        });
    }
  }, [provinceId]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/users/user_type/activity_list`)
      .then(res => {
        if (res.status === 200) {
          setWorks(res.data);
        }
      });
  }, []);

  return (
    <Formik
      initialValues={{
        field: data?.user_type_list,
        company: data?.company?.name,
        address: data?.company?.location_info?.address
      }}
      validate={values => {
        const errors = {};
        if (!values.input) {
          errors.username = 'نام کاربری اجباری می باشد';
        }
        return errors;
      }}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        // httpsService
        //   .post(`${API_BASE_URL}/api/users/add_user_type/`, {
        //     user_type: selected
        //   })
        //   .then(res => {
        //     if (res.status === 200) {
        //       history.push('/home');
        //     }
        //   });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        setFieldValue
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '0px',
            // gap: '159px',
            position: 'absolute',
            width: '90%',
            height: '90%',
            left: '20px',
            top: '57px'
          }}
        >
          <Box>
            <InputLabelHeader>اطلاعات شغلی</InputLabelHeader>
            <InputLabel>مشخصات شما شامل موارد زیر می باشد:</InputLabel>
            <Box sx={{ mt: 2 }}>
              <InputLabel>زمینه فعالیت</InputLabel>
              <Autocomplete
                multiple
                fullWidth
                disablePortal
                id="field"
                limitTags={1}
                options={works}
                getOptionLabel={option => option.translate}
                defaultValue={values.field}
                renderInput={params => <TextField {...params} />}
                onChange={(event, values) => {
                  setFieldValue('field', values);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.translate === value.translate
                }
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel>شرکت</InputLabel>
              <TextField
                id="company"
                aria-describedby="my-helper-text"
                fullWidth
                // placeholder="رمز عبور"
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '6px 3px'
                }}
                value={values.company}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel>آدرس محل کار</InputLabel>
              <TextField
                id="address"
                aria-describedby="my-helper-text"
                fullWidth
                multiline
                rows={3}
                sx={{
                  background: '#F2F2F2',
                  borderRadius: '4px',
                  margin: '6px 3px'
                }}
                value={values.address}
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              onClick={() =>
                history.push({
                  pathname: '/profile/detail',
                  state: {
                    data: data
                  }
                })
              }
            >
              {'لغو'}
            </ConfirmButton>
            <ConfirmButton disabled={false} onClick={handleSubmit}>
              {'ویرایش'}
            </ConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default WorkMobile;
