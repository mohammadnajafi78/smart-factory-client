import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { ArrowRight } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Upload from 'src/assets/img/icons/upload.svg';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';
import { useSnackbar } from 'notistack';

export default function AcceptConfirm(props) {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState(null);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
              history.goBack();
            }}
            type={'button'}
          >
            {'لغو'}
          </ConfirmButton>
          <ConfirmButton
            loading={isLoading}
            onClick={() => {
              setLoading(true);
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
                  setLoading(false);
                  if (res.status === 200) {
                    history.push('/sale/received');
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
            {'ثبت پیش فاکتور'}
          </ConfirmButton>
        </Box>
      </Box>
    </>
  );
}
