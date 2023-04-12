import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Drawer,
  Divider,
  Autocomplete,
  Button
} from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight, Download } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterJalali from '@date-io/date-fns-jalali';
import { AttachFile } from '@mui/icons-material';
import MomentEn from 'src/utils/MomentEn';
import makeStyles from '@mui/styles/makeStyles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function DeliveryInfo(props) {
  const [file, setFile] = useState();
  const [payment, setPayment] = useState(null);
  const [deliveryTypes, setDeliveryTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const history = useHistory();
  const data = props.location.state;
  const classes = useStyles();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/orders/delivery/get_delivery_type/`)
      .then(res => {
        if (res.status === 200) {
          setDeliveryTypes(res.data);
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
          gap: '10px'
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
              comment: '',
              file: ''
            }}
            validationSchema={Yup.object().shape({
              // cityId: Yup.string().required('شهر نباید خالی باشد'),
              // provinceId: Yup.string().required('استان نباید خالی باشد')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              setSubmitting(true);
              const formData = new FormData();
              formData.append('order_num', props.location.order_num);
              formData.append('order_action', 'Approve');
              formData.append(
                'state',
                props.location.state === 'INCOMPLETE_DELIVERY'
                  ? 'Supply_Incomplete'
                  : 'Delivery'
              );
              formData.append('sender_date', MomentEn(values.date));
              formData.append('sender_description', values.comment);
              formData.append('sender_delivery_type', values.type);
              formData.append('BL', values.file);

              httpService
                .post(
                  `${API_BASE_URL}/api/orders/update_order_state/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    setSubmitting(false);
                    history.push('/sale/received');
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
                  padding: '0px',
                  //   gap: '4px',
                  // position: 'absolute',
                  width: '100%',
                  height: '100%'
                  // left: '20px',
                  // top: '57px'
                }}
              >
                <Box sx={{ mb: '60px' }}>
                  <InputLabel>اطلاعات ارسال را وارد کنید:</InputLabel>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      زمان ارسال
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DateTimePicker
                        mask="____/__/__"
                        value={values.date}
                        onChange={newValue => {
                          setFieldValue('date', newValue);
                        }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            sx={{
                              background: '#F2F2F2',
                              width: '100%'
                            }}
                            placeholder="زمان ارسال"
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      نحوه ی ارسال
                    </InputLabel>
                    {deliveryTypes.length > 0 && (
                      <Autocomplete
                        disablePortal
                        fullWidth
                        options={deliveryTypes}
                        value={
                          deliveryTypes.filter(f => f.name === values.type)[0]
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="نحوه ی ارسال"
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
                        sx={{
                          '.MuiOutlinedInput-root': {
                            padding: '5px'
                          }
                        }}
                        noOptionsText={'موردی یافت نشد'}
                      />
                    )}
                  </Box>

                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      توضیحات
                    </InputLabel>
                    <TextField
                      id="comment"
                      aria-describedby="my-helper-text"
                      fullWidth
                      placeholder="توضیحات"
                      sx={{
                        background: '#F2F2F2',
                        borderRadius: '4px',
                        margin: '3px 3px'
                      }}
                      value={values.comment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      multiline
                      rows={3}
                    />
                  </Box>

                  <Box sx={{ mt: 1, mb: 1 }}>
                    <InputLabel style={{ color: '#A7A5A6' }}>
                      بارنامه
                    </InputLabel>
                    {!values.file ? (
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
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          padding: '20px 10px 5px',
                          gap: '20px',
                          // width: '480px',
                          height: '320px',
                          border: '2px dashed #99DDE1',
                          borderRadius: '4px'
                        }}
                      >
                        <img
                          src={URL.createObjectURL(values.file)}
                          width="300px"
                          height="180px"
                          style={{ borderRadius: '8px' }}
                        />
                        <InputLabel
                          style={{ color: '#335D8A', fontSize: '11px' }}
                        >
                          {values.file.name}
                        </InputLabel>
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
                              fontSize: '12px',
                              fontWeight: 400
                            }}
                            onClick={() => {
                              // setFile(null);
                              setFieldValue('file', '');
                            }}
                          >
                            <img src={Delete} width="13px" height="13px" />
                            پاک کردن
                          </Button>
                          <Button
                            sx={{
                              fontFamily: 'IRANSans',
                              fontSize: '12px',
                              fontWeight: 400
                            }}
                            component="label"
                            onChange={e => {
                              // setFile(e.target.files[0]);
                              setFieldValue('file', event.target.files[0]);
                            }}
                          >
                            <img src={Attach} width="13px" height="20px" />
                            تغییر فایل
                            <input type="file" hidden multiple={false} />
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    width: '100%',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    background: 'white',
                    padding: '10px'
                    // mb: 4
                  }}
                >
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
