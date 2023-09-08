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

function BuildingInfoMobile(props) {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState(null);
  const [cities, setCities] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [buildingTypeList, setBuildingTypeList] = useState(null);
  const [buildingTypeId, setBuildingTypeId] = useState(null);
  const [projectTypeList, setProjectTypeList] = useState(null);
  const [projectTypeId, setProjectTypeId] = useState(null);
  const history = useHistory();
  let data = props.location.state;
  console.log('dataa', data);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_type`)
      .then(res => {
        if (res.status === 200) {
          let temp = [];
          res.data.map(item =>
            item.child.map(sub =>
              temp.push({
                label: item.name + '/' + sub.name,
                id: sub.id
              })
            )
          );
          setProjectTypeList(temp);
        }
      });
  }, []);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_building_type`)
      .then(res => {
        if (res.status === 200) {
          setBuildingTypeList(res.data);
        }
      });
  }, []);

  return (
    <Box sx={{ mt: '20px' }}>
      <InputLabelHeader style={{ marginRight: '10px' }}>
        اطلاعات ساختمان
      </InputLabelHeader>
      <CustomizedProgressBars percentage={66.66} />

      <Formik
        initialValues={{
          buildingTypeName: data ? data.building_type.label : '',
          area: data ? data.area : '',
          floor_count: data ? data.floor_count : '',
          unit_count: data ? data.unit_count : '',
          pipe_length: data ? data.pipe_length : '',
          projectTypeName: data ? data.project_type.label : ''
        }}
        validationSchema={Yup.object().shape({
          // province: Yup.string().required('استان اجباری می باشد'),
          // city: Yup.string().required('شهر اجباری می باشد')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          setSubmitting(true);
          httpService
            .post(`${API_BASE_URL}/api/project/update_project/`, {
              project_num: data
                ? data.project_num
                : props.location.state1.project_num,
              building_type: buildingTypeId,
              area: values.area,
              floor_count: values.count,
              unit_count: values.unit_count,
              pipe_length: values.pipe_length,
              project_type: projectTypeId
            })
            .then(res => {
              if (res.status === 200) {
                if (data) {
                  history.push({
                    pathname: '/project/project/new/3',
                    state: res.data
                  });
                  setSubmitting(false);
                } else {
                  history.push({
                    pathname: '/project/project/new/3',
                    state1: res.data
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
              gap: '0px',
              position: 'absolute',
              width: '90%',
              height: '88%',
              left: '20px',
              top: '67px'
            }}
          >
            <Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>نوع ساختمان</InputLabel>
                {buildingTypeList && (
                  <Autocomplete
                    disablePortal
                    fullWidth
                    value={values.buildingTypeName}
                    options={buildingTypeList}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="وضعیت"
                        fullWidth
                        id="status"
                        // error={Boolean(touched.status && errors.status)}
                        // helperText={touched.status && errors.status}
                      />
                    )}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setFieldValue('buildingTypeName', newValue.label);
                        setBuildingTypeId(newValue.name);
                      } else {
                        setFieldValue('buildingTypeName', '');
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
                <InputLabel>مساحت زیربنا</InputLabel>
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
              <Box sx={{ mt: 2 }}>
                <InputLabel>تعداد طبقات</InputLabel>
                <TextField
                  // {...params}
                  placeholder="تعداد طبقات"
                  fullWidth
                  id="floor_count"
                  error={Boolean(touched.floor_count && errors.floor_count)}
                  helperText={touched.floor_count && errors.floor_count}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>تعداد واحد</InputLabel>
                <TextField
                  // {...params}
                  placeholder="تعداد واحد"
                  fullWidth
                  id="unit_count"
                  value={values.unit_count}
                  onChange={handleChange}
                  error={Boolean(touched.unit_count && errors.unit_count)}
                  helperText={touched.unit_count && errors.unit_count}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>طول لوله مصرفی</InputLabel>
                <TextField
                  // {...params}
                  placeholder="طول لوله مصرفی"
                  fullWidth
                  id="pipe_length"
                  value={values.pipe_length}
                  onChange={handleChange}
                  error={Boolean(touched.pipe_length && errors.pipe_length)}
                  helperText={touched.pipe_length && errors.pipe_length}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <InputLabel>نوع پروژه</InputLabel>
                {projectTypeList && (
                  <Autocomplete
                    disablePortal
                    fullWidth
                    options={projectTypeList}
                    // value={
                    //   values.projectTypeName
                    //     ? values.projectTypeName.map(item => item.label)
                    //     : values.projectTypeName
                    // }
                    // value={values.projectTypeName}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="نوع پروژه"
                        fullWidth
                        id="projectTypeName"
                        // error={Boolean(touched.status && errors.status)}
                        // helperText={touched.status && errors.status}
                      />
                    )}
                    multiple
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setFieldValue(
                          'projectTypeName',
                          newValue.map(item => item.label)
                        );
                        setProjectTypeId(newValue.map(item => item.id));
                      } else {
                        setFieldValue('projectTypeName', '');
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    // getOptionLabel={option => option.name}
                    noOptionsText={'موردی یافت نشد'}
                    sx={{
                      '.MuiOutlinedInput-root': {
                        padding: '5px'
                      }
                    }}
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
                onClick={() => {
                  history.push({
                    pathname: '/project/project/new/1',
                    state: data
                  });
                }}
                type={'button'}
              >
                {'بارگشت'}
              </ConfirmButton>
              <ConfirmButton type="submit">{'ادامه'}</ConfirmButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default BuildingInfoMobile;
