import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Drawer, TextField, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import DescriptionImg from 'src/assets/img/description.svg';
import PaidImg from 'src/assets/img/paid.svg';
import Info from 'src/assets/img/info.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ChevronLeft, Download, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import ProductList from './ProductList';
import { da } from 'date-fns/locale';
import AddPayment from './AddPayment';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function Actions(props) {
  const data = props.data;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPIApprove, setOpenPIApprove] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);
  const [comment, setComment] = useState(null);
  const history = useHistory();
  const user_id = JSON.parse(localStorage.getItem('user')).user_id;

  return (
    <>
      {data.current_state.name === 'WAITING_FOR_PI_APPROVE' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 20px 14px',
            gap: '10px',
            background: '#E6EBF0'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex'
            }}
          >
            <img
              src={DescriptionImg}
              style={{
                marginBottom: '20px',
                marginLeft: '5px'
              }}
            />
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#00346D'
              }}
            >
              پیش‌فاکتور صادر شده توسط تامین‌کننده را مشاهده و تایید کنید:
            </InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              gap: '6px'
            }}
          >
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '6px 8px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #F14950'
              }}
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              <img src={CancelImg} />
              <InputLabel style={{ color: '#F14950', padding: 0 }}>
                لغو درخواست
              </InputLabel>
              {/* <ChevronLeft color="white" /> */}
            </Button>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '6px 8px',
                // gap: '6px',
                height: '32px',
                background: '#335D8A',
                borderRadius: '4px',
                '&:hover': {
                  background: '#00346D',
                  color: 'white'
                }
              }}
              onClick={() => {
                setOpenPIApprove(true);
              }}
            >
              <InputLabel style={{ color: 'white', padding: 0 }}>
                مشاهده و تایید
              </InputLabel>
              <ChevronLeft color="white" />
            </Button>
          </Box>
        </Box>
      )}
      {data.current_state.name === 'WAITING_FOR_PAYMENT' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 20px 14px',
            gap: '10px',
            background: '#E6EBF0'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex'
            }}
          >
            <img
              src={PaidImg}
              style={{
                marginBottom: '20px',
                marginLeft: '5px'
              }}
            />
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#00346D'
              }}
            >
              {`هزینه سفارش شما معادل ${data.final_price}  می باشد. جهت وارد کردن اطلاعات واریز کلیک کنید:`}
            </InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              gap: '6px'
            }}
          >
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '6px 8px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #F14950'
              }}
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              <img src={CancelImg} />
              <InputLabel style={{ color: '#F14950', padding: 0 }}>
                لغو درخواست
              </InputLabel>
              {/* <ChevronLeft color="white" /> */}
            </Button>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '6px 8px',
                // gap: '6px',
                height: '32px',
                background: '#335D8A',
                borderRadius: '4px',
                '&:hover': {
                  background: '#00346D',
                  color: 'white'
                }
              }}
              onClick={() =>
                history.push({
                  pathname: '/sale/send/payment',
                  state: data
                })
              }
            >
              <InputLabel style={{ color: 'white', padding: 0 }}>
                پرداخت
              </InputLabel>
              <ChevronLeft color="white" />
            </Button>
          </Box>
        </Box>
      )}
      {data.current_state.name === 'PAYMENT_REJECTED' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 20px 14px',
            gap: '10px',
            background: '#E6EBF0'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex'
            }}
          >
            <img
              src={PaidImg}
              style={{
                marginBottom: '20px',
                marginLeft: '5px'
              }}
            />
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#00346D'
              }}
            >
              {`هزینه سفارش شما معادل ${data.final_price}  می باشد. جهت وارد کردن اطلاعات واریز کلیک کنید:`}
            </InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              gap: '6px'
            }}
          >
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '6px 8px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #F14950'
              }}
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              <img src={CancelImg} />
              <InputLabel style={{ color: '#F14950', padding: 0 }}>
                لغو درخواست
              </InputLabel>
              {/* <ChevronLeft color="white" /> */}
            </Button>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '6px 8px',
                // gap: '6px',
                height: '32px',
                background: '#335D8A',
                borderRadius: '4px',
                '&:hover': {
                  background: '#00346D',
                  color: 'white'
                }
              }}
              onClick={() =>
                history.push({
                  pathname: '/sale/send/payment/edit',
                  state: data
                })
              }
            >
              <InputLabel style={{ color: 'white', padding: 0 }}>
                پرداخت
              </InputLabel>
              <ChevronLeft color="white" />
            </Button>
          </Box>
        </Box>
      )}
      {(data.current_state.name === 'WAITING_FOR_DELIVERY_APPROVE' ||
        data.current_state.name === 'SUPPLY_INCOMPLETE' ||
        data.current_state.name === 'REJECT_INCOMPLETE') && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 20px 14px',
            gap: '10px',
            background: '#E6EBF0'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex'
            }}
          >
            <img
              src={PaidImg}
              style={{
                marginBottom: '20px',
                marginLeft: '5px'
              }}
            />
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#00346D'
              }}
            >
              سفارش شما در حال ارسال است
            </InputLabel>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              gap: '6px'
            }}
          >
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // padding: '6px 8px',
                // gap: '6px',
                height: '40px',
                background: '#335D8A',
                borderRadius: '4px',
                '&:hover': {
                  background: '#00346D',
                  color: 'white'
                }
              }}
              onClick={() => {
                setOpenDeliveryInfo(true);
              }}
            >
              {/* <img src={CancelImg} /> */}
              <InputLabel style={{ color: 'white', padding: 0 }}>
                اطلاعات تحویل
              </InputLabel>
              <ChevronLeft color="white" />
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                history.push({
                  pathname: '/sale/send/delivery',
                  state: data
                });
              }}
            >
              <InputLabel style={{ color: 'white', padding: 0 }}>
                تایید تحویل
              </InputLabel>
              <ChevronLeft color="white" />
            </Button>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 20px 20px 20px',
          // justifyContent: 'space-between',
          height: 'inherit',
          backgroundColor: 'white'
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '12px',

                width: '100%',
                height: '70px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '8px',

                  width: '100%',
                  height: '25px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#00346D'
                    // lineHeight: '17px'
                  }}
                >
                  {data?.order_num}
                </InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3px 6px !important',
                    background: '#CCEEF0',
                    borderRadius: '4px',
                    color: '#00AAB5'
                  }}
                >
                  <InputLabel
                    style={{
                      color: '#00AAB5',
                      fontSize: '12px',
                      textAlign: 'center'
                    }}
                  >
                    {data?.current_state?.label}
                  </InputLabel>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  // backgroundColor: '#DDF5F6',
                  color: '#335D8A',
                  width: '100%',
                  // height: '25px',
                  padding: '0px 6px',
                  borderRadius: '4px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#335D8A',
                    lineHeight: '16px'
                  }}
                >
                  {`ثبت: ${MomentFa(data?.create_date)}`}
                </InputLabel>
              </Box>
              {data.current_state.name === 'CANCELED' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    // backgroundColor: '#DDF5F6',
                    color: '#335D8A',
                    width: '100%',
                    // height: '25px',
                    padding: '3px 6px',
                    borderRadius: '4px'
                  }}
                >
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#335D8A',
                      lineHeight: '16px'
                    }}
                  >
                    {`علت عدم تایید: ${data?.flow_action.comment}`}
                  </InputLabel>
                </Box>
              )}
            </Box>
          </Box>
          <Divider sx={{ m: 2 }} />

          <ProductList data={data} />
        </Box>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            justifyContent: 'space-between',
            // height: 'inherit',
            gap: '10px',
            margin: '20px 0px',
            borderRadius: '8px'
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <InputLabel style={{ fontSize: '14px' }}>
                علت عدم تایید سفارش را وارد کنید:
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
            sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
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
                onClick={() => {
                  httpService
                    .post(`${API_BASE_URL}/api/orders/update_order_state/`, {
                      order_num: data.order_num,
                      order_action: 'Reject',
                      comment: comment,
                      state: 'Invoice'
                    })
                    .then(res => {
                      if (res.status === 200) {
                        history.push('/sale/received');
                      }
                    });
                }}
              >
                {'ثبت'}
              </ConfirmButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={openPIApprove}
        onClose={() => setOpenPIApprove(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            justifyContent: 'space-between',
            // height: 'inherit',
            gap: '10px',
            margin: '20px 0px',
            borderRadius: '8px'
          }}
        >
          <Box sx={{ width: '100%', minHeight: '250px' }}>
            <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <InputLabel style={{ fontSize: '14px' }}>
                پیش فاکتور ثبت‌شده را دانلود کنید:
              </InputLabel>

              <Box sx={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#6685A7' }}>زمان صدور:</InputLabel>
                <InputLabel style={{ color: '#6685A7' }}>
                  {MomentFa(data?.flow_action?.create_date)}
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex' }}>
                <InputLabel style={{ color: '#6685A7' }}>توضیحات:</InputLabel>
                <InputLabel style={{ color: '#6685A7' }}>
                  {data.flow_action.comment}
                </InputLabel>
              </Box>
              <a
                href={data?.files.filter(f => f.subject === 'INVOICE')[0]?.url}
                download
                target="_blank"
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <ConfirmButton
                  variant="contained"
                  style={{
                    background: '#DDF5F6',
                    border: '1px solid #00AAB5',
                    color: '#00AAB5'
                  }}
                  // onClick={() => history.push('/sale/products/order/2')}
                >
                  <Download style={{ marginLeft: '3px' }} />
                  {'دانلود پیش فاکتور'}
                </ConfirmButton>
              </a>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
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
                  setOpenPIApprove(false);
                  setOpen(true);
                }}
                type={'button'}
              >
                {'عدم تایید'}
              </ConfirmButton>
              <ConfirmButton
                style={{ width: '150px' }}
                // disabled={comment == null}
                onClick={() => {
                  httpService
                    .post(`${API_BASE_URL}/api/orders/update_order_state/`, {
                      order_num: data.order_num,
                      order_action: 'Approve',
                      state: 'Invoice'
                    })
                    .then(res => {
                      if (res.status === 200) {
                        history.push('/sale/send');
                      }
                    });
                }}
              >
                {'تایید'}
              </ConfirmButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Drawer
        anchor={'bottom'}
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        classes={{
          paper: classes.paper
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            justifyContent: 'space-between',
            // height: 'inherit',
            gap: '10px',
            margin: '20px 0px',
            borderRadius: '8px'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <InputLabel style={{ fontSize: '14px' }}>
                آیا از لغو درخواست مطمئن هستید؟
              </InputLabel>
            </Box>
          </Box>
          {/* <Divider /> */}
          <Box
            sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
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
                  setOpenConfirm(false);
                }}
                type={'button'}
              >
                {'خیر'}
              </ConfirmButton>
              <ConfirmButton
                style={{ width: '150px' }}
                // disabled={comment == null}
                onClick={() => {
                  httpService
                    .post(`${API_BASE_URL}/api/orders/cancel_order/`, {
                      order_num: data.order_num
                    })
                    .then(res => {
                      if (res.status === 200) {
                        setOpenConfirm(false);
                      }
                    });
                }}
              >
                {'بله'}
              </ConfirmButton>
            </Box>
          </Box>
        </Box>
      </Drawer>
      {openDeliveryInfo && (
        <Drawer
          anchor={'bottom'}
          open={openDeliveryInfo}
          onClose={() => setOpenDeliveryInfo(false)}
          classes={{
            paper: classes.paper
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px',
              justifyContent: 'space-between',
              // height: 'inherit',
              gap: '10px',
              margin: '20px 0px',
              borderRadius: '8px'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <InputLabel style={{ fontSize: '14px' }}>
                  اطلاعات تحویل سفارش شما به شرح زیر می‌باشد:
                </InputLabel>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '10px',
                    width: '100%'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '6px',
                      width: '100%'
                    }}
                  >
                    <InputLabel
                      style={{
                        color: '#6685A7',
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    >
                      زمان ارسال
                    </InputLabel>
                    <InputLabel
                      style={{
                        color: '#335D8A',
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    >
                      {MomentFa(data?.delivery_detail?.sender_date)}
                    </InputLabel>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0px',
                      gap: '6px',
                      width: '100%'
                    }}
                  >
                    <InputLabel
                      style={{
                        color: '#6685A7',
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    >
                      نحوه ارسال
                    </InputLabel>
                    <InputLabel
                      style={{
                        color: '#335D8A',
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    >
                      {data.delivery_detail.delivery_type_detail.label}
                    </InputLabel>
                  </Box>
                  <Divider color="#CCD6E2" />
                  <Box sx={{ display: 'inline-flex' }}>
                    <img src={Info} />
                    <InputLabel
                      style={{
                        color: '#6685A7',
                        fontSize: '16px',
                        fontWeight: 400
                      }}
                    >
                      {data.delivery_detail.sender_description}
                    </InputLabel>
                  </Box>
                  {data.files &&
                    data.files.length > 0 &&
                    data?.files.filter(f => f.subject === 'BL').length > 0 && (
                      <a
                        href={
                          data?.files.filter(f => f.subject === 'BL')[0].url
                        }
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
                          {'دانلود بارنامه'}
                        </ConfirmButton>
                      </a>
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
}
