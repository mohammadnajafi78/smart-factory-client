import React, { useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  TextField,
  Autocomplete,
  Button
} from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AttachFile } from '@mui/icons-material';
import { API_BASE_URL } from 'src/utils/urls';
import httpService from 'src/utils/httpService';

export default function NewProductType({
  open,
  handleClose,
  data,
  title,
  type,
  ...props
}) {
  const [file, setFile] = useState(null);

  return (
    <>
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        title={title}
        content={
          <Formik
            initialValues={{
              name: type === 'edit' ? data.name : '',
              order: type === 'edit' ? data.order : '',
              active_in_catalogue:
                type === 'edit' ? data.active_in_catalogue : true,
              active_in_shop: type === 'edit' ? data.active_in_shop : false,
              active_in_order: type === 'edit' ? data.active_in_order : true,
              translate_en:
                type === 'edit' ? data?.translate_detail?.item_en : '',
              translate_fa:
                type === 'edit' ? data?.translate_detail?.item_fa : '',
              translate_ru:
                type === 'edit' ? data?.translate_detail?.item_ru : '',
              translate_ar:
                type === 'edit' ? data?.translate_detail?.item_ar : '',
              images: type === 'edit' ? data.images : ''
            }}
            validationSchema={Yup.object().shape({
              // province: Yup.string().required('استان اجباری می باشد'),
              // city: Yup.string().required('شهر اجباری می باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);

              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('order', values.order);
              formData.append(
                'active_in_catalogue',
                values.active_in_catalogue === true ? 'True' : 'False'
              );
              formData.append(
                'active_in_shop',
                values.active_in_shop === true ? 'True' : 'False'
              );
              formData.append('active_in_order', 'True');
              formData.append('translate_en', values.translate_en);
              formData.append('translate_fa', values.translate_fa);
              formData.append('translate_ru', values.translate_ru);
              formData.append('translate_ar', values.translate_ar);

              if (type === 'new') {
                let i = 0;
                for (i; i < values.images.length; i++)
                  formData.append(i, values.images[i]);

                httpService
                  .post(
                    `${API_BASE_URL}/api/management/product/category/add_category/`,
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
                    `${API_BASE_URL}/api/management/product/category/${data.id}/`,
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
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>دسته</InputLabel>
                    <TextField
                      id="name"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.name}
                      onChange={handleChange}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      ترجمه فارسی
                    </InputLabel>
                    <TextField
                      id="translate_fa"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.translate_fa}
                      onChange={handleChange}
                      error={Boolean(
                        touched.translate_fa && errors.translate_fa
                      )}
                      helperText={touched.translate_fa && errors.translate_fa}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      ترجمه انگلیسی
                    </InputLabel>
                    <TextField
                      id="translate_en"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.translate_en}
                      onChange={handleChange}
                      error={Boolean(
                        touched.translate_en && errors.translate_en
                      )}
                      helperText={touched.translate_en && errors.translate_en}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      ترجمه عربی
                    </InputLabel>
                    <TextField
                      id="translate_ar"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.translate_ar}
                      onChange={handleChange}
                      error={Boolean(
                        touched.translate_ar && errors.translate_ar
                      )}
                      helperText={touched.translate_ar && errors.translate_ar}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      ترجمه روسی
                    </InputLabel>
                    <TextField
                      id="translate_ru"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.translate_ru}
                      onChange={handleChange}
                      error={Boolean(
                        touched.translate_ru && errors.translate_ru
                      )}
                      helperText={touched.translate_ru && errors.translate_ru}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      ترتیب نمایش
                    </InputLabel>
                    <TextField
                      id="order"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.order}
                      onChange={handleChange}
                      error={Boolean(touched.order && errors.order)}
                      helperText={touched.order && errors.order}
                      type={'number'}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      در کاتالوگ
                    </InputLabel>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      options={[
                        { key: false, label: 'غیر فعال' },
                        { key: true, label: 'فعال' }
                      ]}
                      value={
                        [
                          { key: false, label: 'غیر فعال' },
                          { key: true, label: 'فعال' }
                        ].filter(f => f.key == values.active_in_catalogue)[0]
                      }
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="در کاتالوگ"
                          fullWidth
                          id="active_in_catalogue"
                          error={Boolean(
                            touched.active_in_catalogue &&
                              errors.active_in_catalogue
                          )}
                          helperText={
                            touched.active_in_catalogue &&
                            errors.active_in_catalogue
                          }
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue)
                          setFieldValue('active_in_catalogue', newValue.key);
                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          padding: '5px'
                        }
                      }}
                      noOptionsText={'موردی یافت نشد'}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      در فروشگاه
                    </InputLabel>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      options={[
                        { key: false, label: 'غیر فعال' },
                        { key: true, label: 'فعال' }
                      ]}
                      renderInput={params => (
                        <TextField
                          {...params}
                          placeholder="در فروشگاه"
                          fullWidth
                          id="active_in_shop"
                          error={Boolean(
                            touched.active_in_shop && errors.active_in_shop
                          )}
                          helperText={
                            touched.active_in_shop && errors.active_in_shop
                          }
                        />
                      )}
                      value={
                        [
                          { key: false, label: 'غیر فعال' },
                          { key: true, label: 'فعال' }
                        ].filter(f => f.key == values.active_in_shop)[0]
                      }
                      onChange={(event, newValue) => {
                        if (newValue)
                          setFieldValue('active_in_shop', newValue.key);
                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          padding: '5px'
                        }
                      }}
                      noOptionsText={'موردی یافت نشد'}
                    />
                  </Grid>
                  {type === 'new' && (
                    <Grid xs={6} item>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        عکس دسته
                      </InputLabel>
                      <ConfirmButton
                        disabled={false}
                        variant="outlined"
                        component="label"
                        onChange={event => {
                          setFieldValue('images', event.target.files);
                        }}
                      >
                        <AttachFile />
                        {'آپلود فایل'}
                        <input type="file" hidden multiple />
                      </ConfirmButton>
                    </Grid>
                  )}
                  {values.images.length > 0 && type === 'edit' && (
                    <Grid xs={12} item>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        عکس دسته
                      </InputLabel>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)'
                        }}
                      >
                        {values.images.map((item, key) => {
                          return (
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px 0px 5px',
                                gap: '20px',
                                // width: '480px',
                                // height: '320px',
                                border: '2px dashed #99DDE1',
                                borderRadius: '4px',
                                margin: '20px'
                              }}
                            >
                              <img
                                src={
                                  file !== null
                                    ? URL.createObjectURL(file)
                                    : item.url
                                }
                                width="120px"
                                // height="150px"
                                style={{ borderRadius: '8px', margin: '10px' }}
                              />

                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                  width: '100%'
                                }}
                              >
                                <Button
                                  sx={{
                                    fontFamily: 'IRANSans',
                                    fontSize: '16px',
                                    fontWeight: 400
                                  }}
                                  onClick={() => {
                                    httpService
                                      .delete(
                                        `${API_BASE_URL}/api/management/product/image/${item.id}/`
                                      )
                                      .then(res => {
                                        if (res.status === 200) {
                                          setFieldValue('images', res.data);
                                          props.setImages(res.data);
                                        }
                                      });
                                  }}
                                >
                                  <img
                                    src={Delete}
                                    width="13px"
                                    height="13px"
                                  />
                                  پاک کردن
                                </Button>
                                <Button
                                  sx={{
                                    fontFamily: 'IRANSans',
                                    fontSize: '16px',
                                    fontWeight: 400
                                  }}
                                  component="label"
                                  onChange={e => {
                                    const formData = new FormData();
                                    setFile(e.target.files[0]);
                                    formData.append('image', e.target.files[0]);
                                    httpService
                                      .patch(
                                        `${API_BASE_URL}/api/management/product/image/${item.id}/`,
                                        formData
                                      )
                                      .then(res => {
                                        if (res.status === 200) {
                                          setFieldValue('images', res.data);
                                          props.setImages(res.data);
                                        }
                                      });
                                  }}
                                >
                                  <img
                                    src={Attach}
                                    width="13px"
                                    height="20px"
                                  />
                                  تغییر فایل
                                  <input type="file" hidden multiple={false} />
                                </Button>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Grid>
                  )}
                </Grid>

                <Divider sx={{ m: 2 }} />
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    gap: 2,
                    padding: '0px',
                    margin: 0,
                    width: '100%'
                  }}
                >
                  <ConfirmButton
                    // disabled={true}
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                    }}
                    type={'button'}
                    style={{ width: '150px' }}
                  >
                    {'لغو'}
                  </ConfirmButton>
                  <ConfirmButton
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    style={{ width: '150px' }}
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
