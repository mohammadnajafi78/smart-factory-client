import React, {  } from 'react';
import {
  Box,
  Grid,
  TextField,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AttachFile } from '@mui/icons-material';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';

export default function NewPrice({
  open,
  handleClose,
  data,
  title,
  type,
  ...props
}) {
  console.log('data', type);
  return (
    <>
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        title={title}
        content={
          <Formik
            initialValues={{
              list_name: type === 'edit' ? data.list_name : '',
              is_active: type === 'edit' ? data.is_active : '',
              excel: type === 'edit' ? data.excel : ''
            }}
            validationSchema={Yup.object().shape({
              // province: Yup.string().required('استان اجباری می باشد'),
              // city: Yup.string().required('شهر اجباری می باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);

              const formData = new FormData();

              formData.append('price_list', values.list_name);
              formData.append(
                'is_active',
                values.is_active === true ? 'True' : 'False'
              );
              formData.append('excel', values.excel);

              if (type === 'new') {
                httpService
                  .post(
                    `${API_BASE_URL}/api/management/product/price/import_prices/`,
                    formData
                  )
                  .then(res => {
                    if (res.status === 201) {
                      handleClose();
                      props.reloadData();
                      setSubmitting(false);
                    }
                  });
              } else {
                httpService
                  .patch(
                    `${API_BASE_URL}/api/management/product/list_name/${data.id}/`,
                    formData
                  )
                  .then(res => {
                    if (res.status === 200) {
                      handleClose();
                      props.setData(res.data);
                      setSubmitting(false);
                    }
                  });
              }
              setSubmitting(false);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              touched,
              values
            }) => (
              <form
                // noValidate
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: '100%'
                }}
              >
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      عنوان لیست
                    </InputLabel>
                    <TextField
                      id="list_name"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.list_name}
                      onChange={handleChange}
                      error={Boolean(touched.list_name && errors.list_name)}
                      helperText={touched.list_name && errors.list_name}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>وضعیت</InputLabel>
                    <ToggleButtonGroup
                      color="primary"
                      id="is_active"
                      value={values.is_active}
                      exclusive
                      onChange={(event, newValue) => {
                        setFieldValue('is_active', newValue);
                      }}
                      sx={{
                        marginTop: '5px',
                        direction: 'ltr',
                        justifyContent: 'flex-end'
                      }}
                    >
                      <ToggleButton
                        value="true"
                        sx={{
                          fontFamily: 'IRANSans'
                        }}
                      >
                        فعال
                      </ToggleButton>
                      <ToggleButton
                        value="false"
                        sx={{
                          fontFamily: 'IRANSans'
                          // borderLeft: '1px solid rgba(0,0,0, 0.12) !important'
                        }}
                      >
                        غیر فعال
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid xs={12} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      آپلود فایل اکسل
                    </InputLabel>
                    <ConfirmButton
                      disabled={false}
                      variant="outlined"
                      component="label"
                      onChange={event => {
                        setFieldValue('excel', event.target.files[0]);
                      }}
                    >
                      <AttachFile />
                      {'آپلود فایل'}
                      <input type="file" hidden />
                    </ConfirmButton>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    padding: '0px',
                    margin: 0,
                    width: '100%',
                    mt: 5
                  }}
                >
                  <ConfirmButton
                    // disabled={true}
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                    }}
                    type={'button'}
                    style={{ width: '130px' }}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    style={{ width: '130px' }}
                  >
                    {'ذخیره اطلاعات'}
                  </ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        }
      />
    </>
  );
}
