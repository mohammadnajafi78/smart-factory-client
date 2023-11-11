import React, { useEffect, useState } from 'react';
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
import { useSnackbar } from 'notistack';

export default function NewProductType({
  open,
  handleClose,
  data,
  title,
  type,
  ...props
}) {
  const [file, setFile] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/management/product/subcategory/subcategory_title_list/`
      )
      .then(res => {
        if (res.status === 200) {
          setSubCategory(res.data);
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
  }, []);

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
              subcategory: type === 'edit' ? data.subcategory_detail.id : '',
              order: type === 'edit' ? data.order : '',
              active_in_catalogue:
                type === 'edit' ? data.active_in_catalogue : true,
              active_in_shop: type === 'edit' ? data.active_in_shop : false,
              active_in_order: type === 'edit' ? data.active_in_order : true,
              translate_en:
                type === 'edit' ? data?.name_translate?.item_en : '',
              translate_fa:
                type === 'edit' ? data?.name_translate?.item_fa : '',
              translate_ru:
                type === 'edit' ? data?.name_translate?.item_ru : '',
              translate_ar:
                type === 'edit' ? data?.name_translate?.item_ar : '',
              images: type === 'edit' ? data.images : '',
              size: type === 'edit' ? data.size : '',
              detail_fa: type === 'edit' ? data.detail_translate.item_fa : '',
              detail_en: type === 'edit' ? data.detail_translate.item_en : '',
              detail_ar: type === 'edit' ? data.detail_translate.item_ar : '',
              detail_su: type === 'edit' ? data.detail_translate.item_ru : ''
            }}
            validationSchema={Yup.object().shape({
              // province: Yup.string().required('استان اجباری می باشد'),
              // city: Yup.string().required('شهر اجباری می باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);

              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('subcategory', values.subcategory);
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
              formData.append('detail_fa', values.detail_fa);
              formData.append('detail_en', values.detail_en);
              formData.append('detail_ar', values.detail_ar);
              formData.append('detail_ru', values.detail_ru);

              if (type === 'new') {
                let i = 0;
                for (i; i < values.images.length; i++)
                  formData.append(i, values.images[i]);

                httpService
                  .post(
                    `${API_BASE_URL}/api/management/product/type/add_type/`,
                    formData
                  )
                  .then(res => {
                    if (res.status === 201) {
                      handleClose();
                      props.reloadData();
                      setSubmitting(false);
                    }
                  })
                  .catch(ex => {
                    if (ex.response.status === 417) {
                      enqueueSnackbar(ex.response.data.error, {
                        variant: 'error'
                      });
                    } else {
                      enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                        variant: 'error'
                      });
                    }
                  });
              } else {
                httpService
                  .patch(
                    `${API_BASE_URL}/api/management/product/type/${data.id}/`,
                    formData
                  )
                  .then(res => {
                    if (res.status === 200) {
                      handleClose();
                      props.setData(res.data);
                      setSubmitting(false);
                    }
                  })
                  .catch(ex => {
                    if (ex.response.status === 417) {
                      enqueueSnackbar(ex.response.data.error, {
                        variant: 'error'
                      });
                    } else {
                      enqueueSnackbar('مشکلی پیش آمده! لطفا دوباره سعی کنید', {
                        variant: 'error'
                      });
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
                    <InputLabel style={{ color: '#A7A5A6' }}>نوع</InputLabel>
                    <TextField
                      id="name"
                      aria-describedby="my-helper-text"
                      fullWidth
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
                    <InputLabel
                      style={{ color: '#A7A5A6', marginBottom: '6px' }}
                    >
                      زیر دسته
                    </InputLabel>
                    {subCategory.length > 0 && (
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={subCategory}
                        value={
                          subCategory.filter(
                            f => f.id === values.subcategory
                          )[0]
                        }
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="زیر دسته"
                            fullWidth
                            id="subCategory"
                            error={Boolean(
                              touched.subCategory && errors.subCategory
                            )}
                            helperText={
                              touched.subCategory && errors.subCategory
                            }
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue)
                            setFieldValue('subcategory', newValue.id);
                        }}
                        sx={{
                          '.MuiOutlinedInput-root': {
                            padding: '5px'
                          }
                        }}
                        noOptionsText={'موردی یافت نشد'}
                      />
                    )}
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
                    <InputLabel style={{ color: '#A7A5A6' }}>سایز</InputLabel>
                    <TextField
                      id="size"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.size}
                      onChange={handleChange}
                      error={Boolean(touched.size && errors.size)}
                      helperText={touched.size && errors.size}
                      // type={'number'}
                    />
                  </Grid>
                  <Divider sx={{ marginBottom: '20px' }} />
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      توضیحات
                    </InputLabel>
                    <TextField
                      id="detail_fa"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.detail_fa}
                      onChange={handleChange}
                      error={Boolean(touched.detail_fa && errors.detail_fa)}
                      helperText={touched.detail_fa && errors.detail_fa}
                    />
                  </Grid>

                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      توضیحات انگلیسی
                    </InputLabel>
                    <TextField
                      id="detail_en"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.detail_en}
                      onChange={handleChange}
                      error={Boolean(touched.detail_en && errors.detail_en)}
                      helperText={touched.detail_en && errors.detail_en}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      توضیحات عربی
                    </InputLabel>
                    <TextField
                      id="detail_ar"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.detail_ar}
                      onChange={handleChange}
                      error={Boolean(touched.detail_ar && errors.detail_ar)}
                      helperText={touched.detail_ar && errors.detail_ar}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      توضیحات روسی
                    </InputLabel>
                    <TextField
                      id="detail_ru"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.detail_ru}
                      onChange={handleChange}
                      error={Boolean(touched.detail_ru && errors.detail_ru)}
                      helperText={touched.detail_ru && errors.detail_ru}
                    />
                  </Grid>
                  <Divider sx={{ marginBottom: '20px' }} />
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
                                      })
                                      .catch(ex => {
                                        if (ex.response.status === 417) {
                                          enqueueSnackbar(
                                            ex.response.data.error,
                                            { variant: 'error' }
                                          );
                                        } else {
                                          enqueueSnackbar(
                                            'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                                            {
                                              variant: 'error'
                                            }
                                          );
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
                                      })
                                      .catch(ex => {
                                        if (ex.response.status === 417) {
                                          enqueueSnackbar(
                                            ex.response.data.error,
                                            { variant: 'error' }
                                          );
                                        } else {
                                          enqueueSnackbar(
                                            'مشکلی پیش آمده! لطفا دوباره سعی کنید',
                                            {
                                              variant: 'error'
                                            }
                                          );
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
