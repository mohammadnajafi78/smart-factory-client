import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, Drawer, TextField, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Upload from 'src/assets/img/icons/upload.svg';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';

export default function AcceptConfirm(props) {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState(null);
  const history = useHistory();
  console.log('order_num', props);

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
          <Box>
            <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
              <InputLabel style={{ fontSize: '14px' }}>
                پیش‌فاکتور سفارش دریافتی خود را بارگذاری کنید:
              </InputLabel>

              {!file ? (
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 0px',
                    gap: '30px',
                    // width: '480',
                    height: '150px',
                    border: '2px dashed #99DDE1',
                    borderRadius: '4px',
                    color: '#4F4C4D',
                    fontFamily: 'IRANSans',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                  component="label"
                  onChange={event => {
                    // console.log('fileeeeee', event.target.files);
                    setFile(Array.from(event.target.files));
                  }}
                >
                  <img src={Upload} with="33px" height="28px" />
                  {'انتخاب فایل'}
                  <input type="file" hidden multiple={true} />
                </Button>
              ) : (
                <>
                  {file.map((item, index) => {
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          padding: '20px 0px 5px',
                          gap: '20px',
                          // width: '480px',
                          height: '320px',
                          border: '2px dashed #99DDE1',
                          borderRadius: '4px'
                        }}
                      >
                        <img
                          src={URL.createObjectURL(item)}
                          width="300px"
                          height="180px"
                          style={{ borderRadius: '8px' }}
                        />
                        <InputLabel style={{ color: '#335D8A' }}>
                          {item.name}
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
                              fontSize: '16px',
                              fontWeight: 400
                            }}
                            onClick={() => {
                              if (
                                file.filter(f => f.name !== item.name).length >
                                0
                              )
                                setFile(file.filter(f => f.name !== item.name));
                              else setFile(null);
                            }}
                          >
                            <img src={Delete} width="13px" height="13px" />
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
                              setFile(e.target.files);
                            }}
                          >
                            <img src={Attach} width="13px" height="20px" />
                            تغییر فایل
                            <input type="file" hidden multiple={true} />
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}
                </>
              )}
              <Box sx={{ mt: 1, width: '100%' }}>
                <InputLabel style={{ color: '#A7A5A6' }}>توضیحات</InputLabel>
                <TextField
                  id="name"
                  aria-describedby="my-helper-text"
                  fullWidth
                  placeholder="...بنویسید"
                  rows={5}
                  multiline
                  sx={{
                    background: '#F2F2F2',
                    borderRadius: '4px',
                    margin: '3px 3px'
                  }}
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                />
              </Box>
            </Box>
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
              //   history.push('/sale/products/order/1');
              history.goBack();
            }}
            type={'button'}
          >
            {'لغو'}
          </ConfirmButton>
          <ConfirmButton
            onClick={() => {
              const formData = new FormData();
              formData.append('order_num', props.location.state.order_num);
              formData.append('order_action', 'Approve');
              formData.append('state', 'PI');
              formData.append('comment', comment);
              for (let i = 0; i < file.length; i++) {
                formData.append('INVOICE' + i, file[i]);
              }

              httpService
                .post(
                  `${API_BASE_URL}/api/orders/update_order_state/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    history.push('/sale/received');
                  }
                });
            }}
          >
            {'ثبت پیش فاکتور'}
          </ConfirmButton>
        </Box>
      </Box>
    </>
  );
}
