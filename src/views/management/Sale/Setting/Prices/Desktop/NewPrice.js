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
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus, Star } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import EditNote from 'src/assets/img/icons/edit_note.svg';
import MomentFa from 'src/utils/MomentFa';
import Upload from 'src/assets/img/icons/upload.svg';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';
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
  return (
    <>
      <CustomizedDialogs
        open={open}
        handleClose={handleClose}
        title={title}
        content={
          <Formik
            initialValues={{
              type_id: type === 'edit' ? data.type_detail.id : '',
              code: type === 'edit' ? data.code : ''
            }}
            validationSchema={Yup.object().shape({
              // province: Yup.string().required('استان اجباری می باشد'),
              // city: Yup.string().required('شهر اجباری می باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);

              const formData = new FormData();

              formData.append('type_id', values.type_id);
              formData.append('code', values.code);

              if (type === 'new') {
                httpService
                  .post(
                    `${API_BASE_URL}/api/management/product/product/add_product/`,
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
                    `${API_BASE_URL}/api/management/product/product/${data.id}/`,
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
                    <InputLabel
                      style={{ color: '#A7A5A6', marginBottom: '6px' }}
                    >
                      نوع
                    </InputLabel>
                    {types.length > 0 && (
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={types}
                        value={types.filter(f => f.id === values.type_id)[0]}
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="نوع"
                            fullWidth
                            id="type"
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) setFieldValue('type_id', newValue.id);
                        }}
                        noOptionsText={'موردی یافت نشد'}
                      />
                    )}
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
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>کد</InputLabel>
                    <TextField
                      id="code"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.code}
                      onChange={handleChange}
                      error={Boolean(touched.code && errors.code)}
                      helperText={touched.code && errors.code}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>کد ERP</InputLabel>
                    <TextField
                      id="erp_code"
                      aria-describedby="my-helper-text"
                      fullWidth
                      // placeholder="رمز عبور"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.erp_code}
                      onChange={handleChange}
                      error={Boolean(touched.erp_code && errors.erp_code)}
                      helperText={touched.erp_code && errors.erp_code}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel
                      style={{ color: '#A7A5A6', marginBottom: '6px' }}
                    >
                      واحد منفرد
                    </InputLabel>
                    {singulars.length > 0 && (
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={singulars}
                        value={
                          singulars.filter(
                            f => f.id === values.singular_package_id
                          )[0]
                        }
                        getOptionLabel={option =>
                          option.translate_detail.item_fa
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="واحد منفرد"
                            fullWidth
                            id="singular_package_id"
                            error={Boolean(
                              touched.singular_package_id &&
                                errors.singular_package_id
                            )}
                            helperText={
                              touched.singular_package_id &&
                              errors.singular_package_id
                            }
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue)
                            setFieldValue('singular_package_id', newValue.id);
                        }}
                        // isOptionEqualToValue={(option, value) =>
                        //   option.id === value.id
                        // }
                        noOptionsText={'موردی یافت نشد'}
                      />
                    )}
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

                  <Divider sx={{ marginBottom: '20px' }} />
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      بسته بندی کوچک
                    </InputLabel>
                    {plural.length > 0 && (
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={plural}
                        value={
                          plural.filter(
                            f => f.id === values.small_plural_package_id
                          )[0]
                        }
                        getOptionLabel={option =>
                          option.translate_detail.item_fa
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="بسته بندی کوچک"
                            fullWidth
                            id="small_plural_package_id"
                            error={Boolean(
                              touched.small_plural_package_id &&
                                errors.small_plural_package_id
                            )}
                            helperText={
                              touched.small_plural_package_id &&
                              errors.small_plural_package_id
                            }
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue)
                            setFieldValue(
                              'small_plural_package_id',
                              newValue.id
                            );
                        }}
                        // isOptionEqualToValue={(option, value) =>
                        //   option.id === value.id
                        // }
                        noOptionsText={'موردی یافت نشد'}
                      />
                    )}
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      تعداد در بسته بندی کوچک
                    </InputLabel>
                    <TextField
                      id="small_plural_package_qty"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.small_plural_package_qty}
                      onChange={handleChange}
                      error={Boolean(
                        touched.small_plural_package_qty &&
                          errors.small_plural_package_qty
                      )}
                      helperText={
                        touched.small_plural_package_qty &&
                        errors.small_plural_package_qty
                      }
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      بسته بندی بزرگ
                    </InputLabel>
                    {plural.length > 0 && (
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={plural}
                        value={
                          plural.filter(
                            f => f.id === values.large_plural_package_id
                          )[0]
                        }
                        getOptionLabel={option =>
                          option.translate_detail.item_fa
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="بسته بندی بزرگ"
                            fullWidth
                            id="large_plural_package_id"
                            error={Boolean(
                              touched.large_plural_package_id &&
                                errors.large_plural_package_id
                            )}
                            helperText={
                              touched.large_plural_package_id &&
                              errors.large_plural_package_id
                            }
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue)
                            setFieldValue(
                              'large_plural_package_id',
                              newValue.id
                            );
                        }}
                        // isOptionEqualToValue={(option, value) =>
                        //   option.id === value.id
                        // }
                        noOptionsText={'موردی یافت نشد'}
                      />
                    )}
                  </Grid>
                  <Grid xs={6} item>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      تعداد در بسته بندی بزرگ
                    </InputLabel>
                    <TextField
                      id="large_plural_package_qty"
                      aria-describedby="my-helper-text"
                      fullWidth
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '6px 3px'
                      }}
                      value={values.large_plural_package_qty}
                      onChange={handleChange}
                      error={Boolean(
                        touched.large_plural_package_qty &&
                          errors.large_plural_package_qty
                      )}
                      helperText={
                        touched.large_plural_package_qty &&
                        errors.large_plural_package_qty
                      }
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
                      // isOptionEqualToValue={(option, value) =>
                      //   option.label === value.label
                      // }
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
                      // isOptionEqualToValue={(option, value) =>
                      //   option.label === value.label
                      // }
                      noOptionsText={'موردی یافت نشد'}
                    />
                  </Grid>
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
