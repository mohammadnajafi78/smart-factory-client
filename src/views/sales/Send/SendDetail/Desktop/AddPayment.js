import { useEffect, useState } from 'react';
import { Box, TextField, Autocomplete, InputAdornment } from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import { AttachFile } from '@mui/icons-material';
import MomentEn from 'src/utils/MomentEn';

export default function AddPayment(props) {
  const [file, setFile] = useState();
  const [payment, setPayment] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const history = useHistory();
  const data = props.location.state.dataPayment
    ? props.location.state.dataPayment
    : props.location.state.data;
  const newData = props.location.state.new;

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/orders/payment/get_payment_type/`)
      .then(res => {
        if (res.status === 200) {
          setPaymentTypes(res.data);
        }
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px',
          justifyContent: 'space-between',
          height: 'inherit',
          gap: '10px',
          width: '100%'
        }}
      >
        <Box>
          <Box
            sx={{ display: 'inline-flex' }}
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowRight color="#335D8A" width={'15px'} />
            <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
              بازگشت
            </InputLabel>
          </Box>
          <Formik
            initialValues={{
              type: '',
              date: '',
              number: '',
              code: '',
              price: '',
              file: ''
            }}
            validationSchema={Yup.object().shape({})}
            onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
              setSubmitting(true);
              const formData = new FormData();
              formData.append('order_num', props.location.state.data.order_num);
              formData.append('payment_type', values.type);
              formData.append('payment_date', MomentEn(values.date));
              formData.append('bill_number', values.number);
              formData.append('track_number', values.code);
              formData.append('payment_amount', values.price);
              formData.append('file', values.file);

              httpService
                .post(
                  `${API_BASE_URL}/api/orders/payment/add_payment/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    // getData();
                    setSubmitting(false);
                    resetForm();
                    // props.setEditable(false);
                    // setOpen(false);
                    history.push({
                      pathname: '/sale/send/detail/payment',
                      state: { data: props.location.state.data }
                    });
                  } else {
                    setSubmitting(false);
                  }
                })
                .catch(err => {
                  setSubmitting(false);
                });
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
                  paddingLeft: '10px',
                  //   gap: '4px',
                  // position: 'absolute',
                  width: '100%',
                  height: '100%',
                  // height: '180px',
                  height: '30vh',
                  overflow: 'auto'
                  // left: '20px',
                  // top: '57px'
                }}
              >
                <Box sx={{ mb: '60px' }}>
                  <InputLabel>اطلاعات واریز خود را وارد کنید:</InputLabel>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gridColumnGap: '20px',
                      gridRowGap: '10px'
                    }}
                  >
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel
                        style={{ color: '#A7A5A6', marginBottom: '3px' }}
                      >
                        نحوه پرداخت
                      </InputLabel>
                      {paymentTypes.length > 0 && (
                        <Autocomplete
                          disablePortal
                          fullWidth
                          options={paymentTypes}
                          value={
                            paymentTypes.filter(f => f.name === values.type)[0]
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              placeholder="نحوه ی پرداخت"
                              fullWidth
                              id="type"
                              error={Boolean(touched.type && errors.type)}
                              helperText={touched.type && errors.type}
                            />
                          )}
                          getOptionLabel={option => option.label}
                          onChange={(event, newValue) => {
                            if (newValue) {
                              setFieldValue('type', newValue.name);
                              // setProvinceId(newValue.name);
                              // setCityId(null);
                            } else {
                              setFieldValue('type', '');
                            }
                          }}
                          // isOptionEqualToValue={(option, value) =>
                          //   option.label === value.label
                          // }
                          noOptionsText={'موردی یافت نشد'}
                        />
                      )}
                    </Box>

                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        تاریخ
                      </InputLabel>
                      <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                          id="date"
                          value={values.date}
                          onChange={newValue => {
                            setFieldValue('date', newValue);
                          }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                background: '#F2F2F2',
                                margin: '3px'
                              }}
                              fullWidth
                              error={Boolean(touched.date && errors.date)}
                              helperText={touched.date && errors.date}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        شماره سند/چک
                      </InputLabel>
                      <TextField
                        id="number"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="شماره سند/چک"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>
                        کد پیگیری
                      </InputLabel>
                      <TextField
                        id="code"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="کد پیگیری"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Box>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel style={{ color: '#A7A5A6' }}>مبلغ</InputLabel>
                      <TextField
                        id="price"
                        aria-describedby="my-helper-text"
                        fullWidth
                        placeholder="مبلغ"
                        sx={{
                          background: '#F2F2F2',
                          borderRadius: '4px',
                          margin: '3px 3px'
                        }}
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" tabIndex={-1}>
                              <InputLabel
                                style={{
                                  color: '#335D8A',
                                  fontSize: '16px',
                                  fontWeight: 400
                                }}
                              >
                                ریال
                              </InputLabel>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                    <Box sx={{ mt: 1, mb: 1 }}>
                      <InputLabel
                        style={{ color: '#A7A5A6', marginBottom: '4px' }}
                      >
                        تصویر فیش واریز/چک
                      </InputLabel>
                      <ConfirmButton
                        disabled={false}
                        variant="outlined"
                        component="label"
                        onChange={event => {
                          setFieldValue('file', event.target.files[0]);
                        }}
                      >
                        <AttachFile />
                        {'آپلود فایل'}
                        <input type="file" hidden />
                      </ConfirmButton>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    // display: 'inline-flex',
                    // justifyContent: 'space-between',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    width: '100%',
                    // position: 'fixed',
                    // bottom: 0,
                    // left: 0,
                    background: 'white',
                    padding: '10px'
                    // mb: 4
                  }}
                >
                  {data.payment_num ? (
                    <ConfirmButton
                      disabled={false}
                      variant="outlined"
                      //   type="submit"
                      onClick={() => {
                        httpService
                          .get(
                            `${API_BASE_URL}/api/orders/payment/remove_payment?payment_num=${data.payment_num}`
                          )
                          .then(res => {
                            if (res.status === 200) {
                              history.goBack();
                            }
                          });
                      }}
                    >
                      {'حذف'}
                    </ConfirmButton>
                  ) : (
                    <ConfirmButton
                      disabled={false}
                      variant="outlined"
                      //   type="submit"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      {'لغو'}
                    </ConfirmButton>
                  )}
                  <ConfirmButton
                    disabled={isSubmitting}
                    type="submit"
                    loading={isSubmitting}
                  >
                    {'ذخیره اطلاعات '}
                  </ConfirmButton>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
