import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Drawer,
  TextField,
  InputAdornment,
  ButtonGroup,
  Button
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import CancelImg from 'src/assets/img/cancel.svg';
import SaleCategory from 'src/assets/img/saleCategory.svg';
import SaleSubCategory from 'src/assets/img/SaleSubCategory.svg';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import LargeSize from 'src/assets/img/largeSize.svg';
import SmallSize from 'src/assets/img/smallSize.svg';
import Domain from 'src/assets/img/domain.png';
import Location from 'src/assets/img/pin_drop.png';
import SwiperImg from '../Desktop/Swiper';
import DesignServices from 'src/assets/img/design_services.png';
import Tune from 'src/assets/img/tune.png';
import Engineering from 'src/assets/img/engineering.png';
import Article from 'src/assets/img/article.png';
import { Download } from 'react-feather';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedDetailMobile(props) {
  const data = props.location.state.data;
  const type = props.location.state.type;
  const typeName = props.location.state.typeName;
  const classes = useStyles();

  console.log('Data', data);

  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '50px',
          backgroundColor: '#E5E5E5',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 0px 5px',
            backgroundColor: '#E5E5E5',
            width: '130px',
            height: '130px',
            borderRadius: '4px'
          }}
        >
          {data?.project?.files && <SwiperImg data={data?.project} />}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '20px',
            background: '#FFFFFF',
            borderRadius: '30px 30px 0px 0px',
            width: '100%',
            height: '450px',
            overflow: 'auto',
            marginTop: '20px',
            position: 'absolute',
            bottom: '0%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              gap: '3px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <InputLabelHeader style={{ color: '#00346D', fontSize: '12px' }}>
                {`درخواست ${typeName}`}
              </InputLabelHeader>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                padding: '2px',
                gap: '4px',
                backgroundColor: JSON.parse(data?.status?.data).back,
                color: JSON.parse(data?.status?.data).text,
                padding: '3px 6px',
                borderRadius: '4px'
              }}
            >
              <InputLabel
                style={{
                  fontWeight: 400,
                  fontSize: '12px',
                  color: JSON.parse(data?.status?.data).text
                }}
              >
                {data?.status?.label}
              </InputLabel>
            </Box>

            <Divider sx={{ color: '#D3D2D2' }} variant="middle" />

            <Box
              sx={{
                border: '1px solid #CCD6E2',
                borderRadius: '6px',
                padding: '10px',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                <img src={Domain} />
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#335D8A'
                  }}
                >
                  {data?.project?.name}
                </InputLabel>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '4px',
                  backgroundColor: JSON.parse(data?.project?.status?.data).back,
                  color: JSON.parse(data?.project?.status?.data).text,
                  padding: '3px 6px',
                  borderRadius: '4px',
                  width: 'fit-content'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: JSON.parse(data?.project?.status?.data).text
                  }}
                >
                  {data?.status?.label}
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Location} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  {data?.project?.location?.city_name +
                    ` (${data?.project?.location?.province_name})`}
                </InputLabel>
              </Box>

              <InputLabel
                style={{
                  color: '#335D8A',
                  fontSize: '12px',
                  marginRight: '22px'
                }}
              >
                {data?.project?.project_type.map(item => item.name + '/ ')}
              </InputLabel>
            </Box>
          </Box>

          {type === 'design' && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // border: '1px solid #CCD6E2',
                // borderRadius: '4px',
                padding: '5px',
                width: '100%'
              }}
            >
              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={DesignServices} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  نوع طراحی
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  {data?.design_type.map(item => item.name + '/ ')}
                </InputLabel>
              </Box>

              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Tune} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  نوع سیستم کنترل
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  {data?.control?.label}
                </InputLabel>
              </Box>

              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Engineering} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  {data?.project?.designer_type?.label}
                </InputLabel>
              </Box>
              <Divider sx={{ mt: 2 }} />
              {data?.project?.status?.name === 'DESIGNER_CONFIRM' ? (
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 1
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_design_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Reject',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'رد'}
                  </ConfirmButton>
                  <ConfirmButton
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_design_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Approve',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'تایید'}
                  </ConfirmButton>
                </Box>
              ) : data?.project?.status?.name === 'DESIGNING' ? (
                <ConfirmButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {'آپلود'}
                </ConfirmButton>
              ) : (
                <></>
              )}
            </Box>
          )}

          {type === 'bom' && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '5px',
                width: '100%'
              }}
            >
              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={DesignServices} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                  نوع سیستم
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                  {data?.design_type.map(item => item.name + '/ ')}
                </InputLabel>
              </Box>

              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Tune} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                  نوع سیستم کنترل
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex', ml: 3 }}>
                <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                  {data?.control?.label}
                </InputLabel>
              </Box>
              <Divider sx={{ mt: 2 }} />
              {data?.project?.status?.name === 'DESIGNER_CONFIRM' ? (
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 1
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_bom_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Reject',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'رد'}
                  </ConfirmButton>
                  <ConfirmButton
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_bom_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Approve',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'تایید'}
                  </ConfirmButton>
                </Box>
              ) : data?.project?.status?.name === 'DESIGNING' ? (
                <ConfirmButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {'آپلود'}
                </ConfirmButton>
              ) : (
                <></>
              )}
            </Box>
          )}

          {type === 'supervision' && (
            <>
              <Divider sx={{ mt: 2 }} />
              {data?.project?.status?.name === 'SUPERVISOR_CONFIRM' ? (
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 1
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_supervision_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Reject',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'رد'}
                  </ConfirmButton>
                  <ConfirmButton
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_supervision_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Approve',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'تایید'}
                  </ConfirmButton>
                </Box>
              ) : data?.project?.status?.name === 'PREPARING' ? (
                <ConfirmButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {'آپلود'}
                </ConfirmButton>
              ) : (
                <></>
              )}
            </>
          )}

          {type === 'supervision' && (
            <>
              <Divider sx={{ mt: 2 }} />
              {data?.project?.status?.name === 'SUPERVISOR_CONFIRM' ? (
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 1
                  }}
                >
                  <ConfirmButton
                    disabled={false}
                    variant="outlined"
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_supervision_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Reject',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'رد'}
                  </ConfirmButton>
                  <ConfirmButton
                    onClick={() => {
                      httpService
                        .post(
                          `${API_BASE_URL}/api/project/design/update_supervision_status/`,
                          {
                            ref_num: data?.ref_num,
                            action: 'Approve',
                            state: 'Designer'
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            console.log('ok');
                          }
                        });
                    }}
                  >
                    {'تایید'}
                  </ConfirmButton>
                </Box>
              ) : data?.project?.status?.name === 'PREPARING' ? (
                <ConfirmButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {'آپلود'}
                </ConfirmButton>
              ) : (
                <></>
              )}
            </>
          )}

          <>
            {data?.project?.files.filter(f => f.subject.name !== 'IMAGES')
              .length > 0 &&
              data?.project?.files
                .filter(f => f.subject.name !== 'IMAGES')
                .map(item => {
                  return (
                    <a
                      href={item.url}
                      download
                      target="_blank"
                      style={{ textDecoration: 'none', width: '100%' }}
                    >
                      <ConfirmButton
                        style={{
                          color: '#6685A7',
                          backgroundColor: '#E6EBF0',
                          position: 'relative',
                          bottom: 0,
                          marginTop: '10px',
                          border: 'none',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box sx={{ display: 'inline-flex' }}>
                          <img src={Article} />
                          <InputLabel style={{ color: '#6685A7' }}>
                            {item.subject.label}
                          </InputLabel>
                        </Box>
                        <Box sx={{ display: 'inline-flex' }}>
                          <Download
                            style={{
                              color: '#00346D',
                              width: '20px',
                              height: '20px',
                              marginLeft: '3px'
                            }}
                          />
                          <InputLabel style={{ color: '#00346D' }}>
                            دانلود
                          </InputLabel>
                        </Box>
                      </ConfirmButton>
                    </a>
                  );
                })}
          </>
        </Box>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        classes={{
          paper: classes.paper
        }}
      >
        <Formik
          initialValues={{
            files: data ? data.files : null
          }}
          validationSchema={Yup.object().shape({
            // province: Yup.string().required('استان اجباری می باشد'),
            // city: Yup.string().required('شهر اجباری می باشد')
          })}
          onSubmit={(values, { setErrors, setSubmitting }) => {
            if (type === 'design') {
              const formData = new FormData();
              formData.append('ref_num', data.ref_num);
              formData.append('action', 'Approve');
              formData.append('state', 'Designed');
              formData.append('DESIGNED_PLAN', values.files[0]);

              setSubmitting(true);
              httpService
                .post(
                  `${API_BASE_URL}/api/project/design/update_design_status/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    setOpen(false);
                  }
                });
            } else if (type === 'bom') {
              const formData = new FormData();
              formData.append('ref_num', data.ref_num);
              formData.append('action', 'Approve');
              formData.append('state', 'Designed');
              formData.append('BOM', values.files[0]);

              setSubmitting(true);
              httpService
                .post(
                  `${API_BASE_URL}/api/project/design/update_bom_status/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    setOpen(false);
                  }
                });
            } else if (type === 'supervision') {
              const formData = new FormData();
              formData.append('ref_num', data.ref_num);
              formData.append('action', 'Approve');
              formData.append('state', 'Supervised');
              formData.append('SUPERVISION', values.files[0]);

              setSubmitting(true);
              httpService
                .post(
                  `${API_BASE_URL}/api/project/design/update_supervision_status/`,
                  formData
                )
                .then(res => {
                  if (res.status === 200) {
                    setOpen(false);
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
            setFieldValue,
            isSubmitting,
            touched,
            values
          }) => (
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0px',
                width: '400px',
                // height: '540px',
                gap: '40px',
                overflow: 'auto'
              }}
            >
              <Box>
                <Box sx={{ mt: 2 }}>
                  <InputLabel style={{ fontSize: '13px' }}>
                    فایل را بارگزاری کنید:
                  </InputLabel>
                  <Button
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '40px 0px',
                      // gap: '30px',
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
                      console.log('files', event.target.files);
                      setFieldValue('files', event.target.files);
                    }}
                  >
                    <img src={Upload} with="33px" height="28px" />
                    <InputLabel style={{ color: '#00346D', fontSize: '14px' }}>
                      {'انتخاب فایل'}
                    </InputLabel>
                    <InputLabel style={{ color: '#00346D', fontSize: '12px' }}>
                      {'حداکثر حجم فایل 3M'}
                    </InputLabel>
                    <InputLabel style={{ color: '#00346D', fontSize: '10px' }}>
                      {'فرمت فایل ها:‌DWG, DGN, ACIS'}
                    </InputLabel>
                    <input type="file" hidden multiple />
                  </Button>
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
                    setOpen(false);
                  }}
                  type={'button'}
                >
                  {'لغو'}
                </ConfirmButton>
                <ConfirmButton type="submit">{'ثبت'}</ConfirmButton>
              </Box>
            </form>
          )}
        </Formik>
      </Drawer>
    </>
  );
}
