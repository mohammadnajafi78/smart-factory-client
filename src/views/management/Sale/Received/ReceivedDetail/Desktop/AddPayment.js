import { useEffect, useState } from 'react';
import { Box, TextField, Divider } from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Desktop/InputLabel';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { ArrowRight, Download } from 'react-feather';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import makeStyles from '@mui/styles/makeStyles';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function AddPayment(props) {
  const [file, setFile] = useState();
  const [payment, setPayment] = useState(null);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const data = props.selected;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/management/order/payment/get_payment_type/`)
      .then(res => {
        if (res.status === 200) {
          setPaymentTypes(res.data);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // padding: '16px 20px',
          justifyContent: 'space-between',
          // height: 'inherit',
          height: '45vh',
          overflow: 'auto',
          gap: '10px',
          width: '100%'
        }}
      >
        <Box>
          <Box
            sx={{ display: 'inline-flex' }}
            onClick={() => {
              // history.goBack();
              props.setPayment(true);
              props.setAddPayment(false);
            }}
          >
            <ArrowRight color="#335D8A" width={'15px'} />
            <InputLabel
              style={{ color: '#335D8A', fontSize: '12px', cursor: 'pointer' }}
            >
              بازگشت
            </InputLabel>
          </Box>
          <Box>
            {data.payment_state.name === 'INITIAL' && (
              <InputLabel>
                آیا اطلاعات واریزی زیر مورد تایید می باشد؟
              </InputLabel>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px 12px',
                gap: '12px',
                mt: '30px'
              }}
            >
              <Box sx={{ display: 'inline-flex' }}>
                <InputLabel
                  style={{
                    color: '#00346D',
                    fontWeight: 500,
                    fontSize: '16px'
                  }}
                >
                  {data.payment_amount}
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontWeight: 400,
                    fontSize: '10px'
                  }}
                ></InputLabel>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  padding: '0px',
                  gap: '11px',
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '6px',
                    width: '100%'
                  }}
                >
                  <InputLabel
                    style={{
                      color: '#6685A7',
                      fontWeight: 400,
                      fontSize: '12px'
                    }}
                  >
                    نحوه پرداخت
                  </InputLabel>
                  <InputLabel
                    style={{
                      color: '#6685A7',
                      fontWeight: 400,
                      fontSize: '12px'
                    }}
                  >
                    {data.payment_type.label}
                  </InputLabel>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '6px',
                    width: '100%'
                  }}
                >
                  <InputLabel
                    style={{
                      color: '#6685A7',
                      fontWeight: 400,
                      fontSize: '12px'
                    }}
                  >
                    زمان پرداخت
                  </InputLabel>
                  <InputLabel
                    style={{
                      color: '#6685A7',
                      fontWeight: 400,
                      fontSize: '12px'
                    }}
                  >
                    {MomentFa(data.payment_date)}
                  </InputLabel>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '6px',
                  width: '100%'
                }}
              >
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}
                >
                  شماره سند/چک
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}
                >
                  {data.bill_number}
                </InputLabel>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '6px',
                  width: '100%'
                }}
              >
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}
                >
                  کد پیگیری
                </InputLabel>
                <InputLabel
                  style={{
                    color: '#6685A7',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}
                >
                  {data.track_number}
                </InputLabel>
              </Box>
              {data.file && (
                <a
                  href={data?.file?.url}
                  download
                  style={{ textDecoration: 'none', width: '100%' }}
                >
                  <ConfirmButton
                    variant="contained"
                    style={{
                      background: '#DDF5F6',
                      border: '1px solid #00AAB5',
                      color: '#00AAB5',
                      width: '100%'
                    }}
                  >
                    <Download style={{ marginLeft: '3px' }} />
                    {'دانلود فیش واریزی'}
                  </ConfirmButton>
                </a>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'flex-end',
              gap: 2,
              width: '100%',
              // position: 'fixed',
              // bottom: 0,
              // left: 0,
              // background: 'white',
              padding: '10px',
              mt: 2
            }}
          >
            <ConfirmButton
              disabled={false}
              variant="outlined"
              //   type="submit"
              onClick={() => {
                setOpen(true);
              }}
              style={{ width: '150px' }}
            >
              {'عدم تایید'}
            </ConfirmButton>

            <ConfirmButton
              // disabled={isSubmitting}
              // type="submit"
              style={{ width: '150px' }}
              loading={isLoading}
              onClick={() => {
                setLoading(true);
                httpService
                  .post(
                    `${API_BASE_URL}/api/management/order/payment/update_payment_status/`,
                    {
                      payment_num: data.payment_num,
                      action: 'APPROVED'
                    }
                  )
                  .then(res => {
                    setLoading(false);
                    if (res.status === 200) {
                      // history.goBack();
                      props.setPayment(true);
                      props.setAddPayment(false);
                    }
                  })
                  .catch(ex => {
                    setLoading(false);
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
              }}
            >
              {'تایید'}
            </ConfirmButton>
          </Box>
        </Box>
      </Box>
      <CustomizedDialogs
        open={open}
        handleClose={() => setOpen(false)}
        title="عدم تایید"
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px',
              justifyContent: 'space-between',
              // height: 'inherit',
              gap: '10px',
              // margin: '20px 0px',
              borderRadius: '8px'
            }}
          >
            <Box>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <InputLabel style={{ fontSize: '12px' }}>
                  علت عدم تایید واریز را وارد کنید:
                </InputLabel>

                <Box sx={{ mt: 1, width: '100%' }}>
                  <InputLabel style={{ color: '#A7A5A6', width: '105px' }}>
                    توضیحات
                  </InputLabel>
                  <TextField
                    id="name"
                    aria-describedby="my-helper-text"
                    fullWidth
                    placeholder="...بنویسید"
                    rows={4}
                    multiline
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      margin: '3px 3px'
                    }}
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end'
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'flex-end',
                  gap: 2
                }}
              >
                <ConfirmButton
                  disabled={false}
                  variant="outlined"
                  style={{ width: '150px' }}
                  onClick={() => {
                    setOpen(false);
                  }}
                  type={'button'}
                >
                  {'لغو'}
                </ConfirmButton>
                <ConfirmButton
                  style={{ width: '150px' }}
                  disabled={comment == null}
                  loading={isLoading}
                  onClick={() => {
                    setLoading(true);
                    httpService
                      .post(
                        `${API_BASE_URL}/api/management/order/payment/update_payment_status/`,
                        {
                          payment_num: data.payment_num,
                          action: 'REJECTED',
                          comment: comment
                        }
                      )
                      .then(res => {
                        setLoading(false);
                        if (res.status === 200) {
                          props.setPayment(true);
                          props.setAddPayment(false);
                        }
                      })
                      .catch(ex => {
                        setLoading(false);
                        if (ex.response.status === 417) {
                          enqueueSnackbar(ex.response.data.error, {
                            variant: 'error'
                          });
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
                  {'ثبت'}
                </ConfirmButton>
              </Box>
            </Box>
          </Box>
        }
      />
    </>
  );
}
