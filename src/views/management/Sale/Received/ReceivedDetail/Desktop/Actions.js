import React, { useState } from 'react';
import { Box, Divider, TextField, Button, ButtonGroup } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Desktop/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { ChevronLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import MomentFa from 'src/utils/MomentFa';
import ProductList from './ProductList';
import PaidImg from 'src/assets/img/paid.svg';
import LocalShipping from 'src/assets/img/local_shipping.svg';
import Person from 'src/assets/img/person.svg';
import Domain from 'src/assets/img/domain.svg';
import Close from 'src/assets/img/close.svg';
import Done from 'src/assets/img/done.svg';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import AcceptConfirm from './AcceptConfirm';
import AcceptPayment from './AcceptPayment';
import AddPayment from './AddPayment';
import DeliveryInfo from './DeliveryInfo';

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
  console.log('management props', props);
  const data = props.data;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [comment, setComment] = useState(null);
  const [acceptConfirm, setAcceptConfirm] = useState(false);
  const [payment, setPayment] = useState(false);
  const [addPayment, setAddPayment] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [selected, setSelected] = useState(null);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const sale_office_id = JSON.parse(localStorage.getItem('user'))
    .sale_office_id;

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            mb: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 15px',
              gap: '10px',
              width: '75px',
              height: '84px',
              background: '#F4F4F4',
              borderRadius: '8px'
            }}
          >
            <img
              src={data?.user_info?.user_profile_image}
              style={{
                width: '44px'
              }}
            />
          </Box>
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
                  color: '#00346D',
                  lineHeight: '17px'
                }}
              >
                {data?.user_info?.first_name + ' ' + data?.user_info?.last_name}
              </InputLabel>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3px 4px !important',
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
                color: '#335D8A',
                width: '100%',
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
                  color: '#335D8A',
                  width: '100%',
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
      </Box>
      {data.current_state.name === 'WAITING_FOR_PAYMENT_APPROVE' && (
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
          {payment === false && addPayment === false ? (
            <Box sx={{ width: '100%' }}>
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
                  {`سفارش دهنده مبلغ ${data.final_price}  را برای این سفارش پرداخت کرده است`}
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
                    setPayment(true);
                  }}
                >
                  <InputLabel style={{ color: 'white', padding: 0 }}>
                    تایید پرداخت
                  </InputLabel>
                  <ChevronLeft color="white" />
                </Button>
              </Box>
            </Box>
          ) : payment === true ? (
            <AcceptPayment
              data={data}
              setPayment={setPayment}
              setAddPayment={setAddPayment}
              setSelected={setSelected}
            />
          ) : (
            <AddPayment
              data={data}
              setPayment={setPayment}
              setAddPayment={setAddPayment}
              selected={selected}
            />
          )}
        </Box>
      )}
      {data.current_state.name === 'DELIVERING' &&
        data.supply_by === 'SALE_OFFICE' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 20px 14px',
              gap: '10px',
              background: '#E6EBF0',
              borderRadius: '8px'
            }}
          >
            {delivery === false ? (
              <div style={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'inline-flex'
                  }}
                >
                  <img
                    src={LocalShipping}
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
                    اطلاعات ارسال را وارد و بارنامه را ضمیمه کنید:
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
                      background: '#335D8A',
                      borderRadius: '4px',
                      '&:hover': {
                        background: '#00346D',
                        color: 'white'
                      }
                    }}
                    onClick={() => {
                      setDelivery(true);
                    }}
                  >
                    <InputLabel style={{ color: 'white', padding: 0 }}>
                      اطلاعات ارسال
                    </InputLabel>
                    <ChevronLeft color="white" />
                  </Button>
                </Box>
              </div>
            ) : (
              <DeliveryInfo
                order_num={data.order_num}
                state={data.current_state.name}
              />
            )}
          </Box>
        )}
      {data.current_state.name === 'PAYMENT_APPROVED' &&
        data.supply_by === 'SALE_OFFICE' && (
          <Box
            sx={{
              background: '#E6EBF0',
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {acceptConfirm === true ? (
              <AcceptConfirm
                data={data}
                setAcceptConfirm={setAcceptConfirm}
                PiTag="AGENT_PI"
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  padding: '20px 20px'
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    padding: '0px 10px'
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
                    {`وضعیت مالی سفارش را مشخص کنید:`}
                  </InputLabel>
                </Box>

                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    gap: 2
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    style={{
                      background: '#33BBC4',
                      color: 'white',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                      width: '120px'
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                    type={'button'}
                  >
                    <img src={Close} style={{ marginLeft: '5px' }} />
                    {'عدم تایید'}
                  </ConfirmButton>
                  <ConfirmButton
                    style={{
                      background: '#00346D',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                      width: '120px'
                    }}
                    onClick={() => {
                      setAcceptConfirm(true);
                    }}
                  >
                    <img src={Done} style={{ marginLeft: '5px' }} />
                    {'تایید سفارش'}
                  </ConfirmButton>
                </Box>
              </Box>
            )}
          </Box>
        )}
      {data.current_state.name === 'INCOMPLETE_DELIVERY' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 20px 14px',
            gap: '10px',
            background: '#E6EBF0',
            borderRadius: '8px'
          }}
        >
          {delivery === false ? (
            <div style={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'inline-flex'
                }}
              >
                <img
                  src={LocalShipping}
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
                    color: '#00346D',
                    marginBottom: 2
                  }}
                >
                  لیست ناقصی های سفارش در زیر آورده شده است، وضعیت سفارش را مشخص
                  کنید:
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
                    setOpen(true);
                  }}
                >
                  <img src={CancelImg} />
                  <InputLabel style={{ color: '#F14950', padding: 0 }}>
                    رد ناقصی
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
                    // setOpenPIApprove(true);
                    // history.push({
                    //   pathname: '/management/sale/received/delivery',
                    //   order_num: data.order_num,
                    //   state: data.current_state.name
                    // });
                    setDelivery(true);
                  }}
                >
                  <InputLabel style={{ color: 'white', padding: 0 }}>
                    تایید ناقصی
                  </InputLabel>
                  <ChevronLeft color="white" />
                </Button>
              </Box>
              <ProductList incomplete={true} data={data} />
            </div>
          ) : (
            <DeliveryInfo
              order_num={data.order_num}
              state={data.current_state.name}
            />
          )}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          justifyContent: 'space-between',
          height: 'inherit',
          backgroundColor: 'white'
        }}
      >
        {data.flow_info.state_user === sale_office_id &&
          data.current_state.name === 'SUBMIT' && (
            <Box
              sx={{
                background: '#E6EBF0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {acceptConfirm === true ? (
                <AcceptConfirm
                  data={data}
                  setAcceptConfirm={setAcceptConfirm}
                  PiTag="PI"
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    padding: '20px 20px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      padding: '0px 10px'
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
                      {`وضعیت سفارش را مشخص کنید:`}
                    </InputLabel>
                  </Box>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                      gap: 2
                    }}
                  >
                    <ConfirmButton
                      disabled={false}
                      variant="outlined"
                      style={{
                        background: '#33BBC4',
                        color: 'white',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '18px',
                        width: '120px'
                      }}
                      onClick={() => {
                        setOpen(true);
                      }}
                      type={'button'}
                    >
                      <img src={Close} style={{ marginLeft: '5px' }} />
                      {'عدم تایید'}
                    </ConfirmButton>
                    <ConfirmButton
                      style={{
                        background: '#00346D',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '18px',
                        width: '120px'
                      }}
                      onClick={() => {
                        setAcceptConfirm(true);
                      }}
                    >
                      <img src={Done} style={{ marginLeft: '5px' }} />
                      {'تایید سفارش'}
                    </ConfirmButton>
                  </Box>
                </Box>
              )}
            </Box>
          )}
      </Box>

      <CustomizedDialogs
        open={open}
        handleClose={() => setOpen(false)}
        title={'عدم تایید'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px',
              justifyContent: 'space-between',
              gap: '10px',
              borderRadius: '8px'
            }}
          >
            <Box>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <InputLabel style={{ fontSize: '14px' }}>
                  علت عدم تایید سفارش را وارد کنید:
                </InputLabel>

                <Box sx={{ mt: 1, width: '100%' }}>
                  <InputLabel style={{ color: '#A7A5A6' }}>توضیحات</InputLabel>
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
                        `${API_BASE_URL}/api/management/order/update_order_state/`,
                        {
                          order_num: data.order_num,
                          order_action:
                            data.current_state.name === 'SUBMIT'
                              ? 'Cancel'
                              : 'Reject',
                          comment: comment,
                          state:
                            data.current_state.name === 'INCOMPLETE_DELIVERY'
                              ? 'Reject_Incomplete'
                              : 'Cancel'
                        }
                      )
                      .then(res => {
                        setLoading(false);
                        if (res.status === 200) {
                          history.push('/management/sale/received');
                        }
                      })
                      .catch(ex => {
                        setLoading(false);
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

      <CustomizedDialogs
        anchor={'bottom'}
        open={openSupplier}
        handleClose={() => setOpenSupplier(false)}
        title={'ارسال سفارش'}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px 20px',
              justifyContent: 'space-between',
              gap: '10px',
              borderRadius: '8px'
            }}
          >
            <Box>
              <Box
                sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
              >
                <InputLabel style={{ fontSize: '14px' }}>
                  ارسال سفارش توسط
                </InputLabel>

                <ButtonGroup
                  fullWidth
                  orientation="vertical"
                  aria-label="vertical contained button group"
                  variant="contained"
                  sx={{ gap: 2, boxShadow: 'none' }}
                  id="input"
                >
                  <Button
                    sx={{
                      backgroundColor: '#E6EBF0',
                      border: '1px solid #99AEC5',
                      borderRadius: '4px !important',
                      padding: '12px',
                      height: '48px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#00346D',
                      fontFamily: 'IRANSans',

                      '&:hover': {
                        color: '#231F20 !important',
                        backgroundColor: '#DFF2F2 !important',
                        fontWeight: 600,
                        fontSize: '16px'
                      }
                    }}
                    onClick={() => {
                      setSelectedSupplier('SUPPLIER');
                    }}
                  >
                    <img src={Person} />
                    خودم
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: '#E6EBF0',
                      border: '1px solid #99AEC5',
                      borderRadius: '4px !important',
                      padding: '12px',
                      height: '48px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#00346D',
                      fontFamily: 'IRANSans',

                      '&:hover': {
                        color: '#231F20 !important',
                        backgroundColor: '#DFF2F2 !important',
                        fontWeight: 600,
                        fontSize: '16px'
                      }
                    }}
                    onClick={() => {
                      setSelectedSupplier('SALE_OFFICE');
                    }}
                  >
                    <img src={Domain} />
                    دفتر فروش
                  </Button>
                </ButtonGroup>
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
                    setOpenSupplier(false);
                  }}
                  type={'button'}
                >
                  {'لغو'}
                </ConfirmButton>
                <ConfirmButton
                  style={{ width: '150px' }}
                  disabled={selectedSupplier == null}
                  loading={isLoading}
                  onClick={() => {
                    setLoading(true);
                    httpService
                      .post(
                        `${API_BASE_URL}/api/management/order/set_supplier/`,
                        {
                          order_num: data.order_num,
                          supply_by: selectedSupplier
                        }
                      )
                      .then(res => {
                        setLoading(false);
                        if (res.status === 200) {
                          if (selectedSupplier === 'SUPPLIER') {
                            setDelivery(true);
                            setOpenSupplier(false);
                          } else history.push('/management/sale/received');
                        }
                      })
                      .catch(ex => {
                        setLoading(false);
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
