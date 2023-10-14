import React, { useEffect, useState } from 'react';
// import Products from './Products';
// import Location from './Location';
// import Delivery from './Deleivery';
// import Message from './Message';
import { Box } from '@mui/system';
import { Button, Divider, Grid, TextField } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import { ChevronRight } from 'react-feather';
import Upload from 'src/assets/img/icons/upload.svg';

import { useHistory } from 'react-router-dom';
import {
  BusinessOutlined,
  ChevronLeft,
  Close,
  CollectionsBookmarkOutlined,
  ConstructionOutlined,
  DesignServicesOutlined,
  Done,
  EngineeringOutlined,
  LiveHelpOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  PaidOutlined,
  ScaleOutlined,
  TuneOutlined
} from '@mui/icons-material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
// import ProductList from './ProductList';
// import Actions from './Actions';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';

import moment from 'jalali-moment';
import RejectRequest from '../../../ReceivedDetails/Desktop/RejectRequest';
import AcceptRequest from '../../../ReceivedDetails/Desktop/AcceptRequest';

export default function BomDetails(props) {
  const [path, setPath] = useState('');
  const [data, setData] = useState('');
  const [cancel, setCancel] = useState();
  const [accept, setAccept] = useState();

  const history = useHistory();

  useEffect(() => {
    if (props.location.state) {
      setData(props?.location?.state?.data[0]);
    } else {
      history.push({
        pathname: '/management/project/received/certificate/'
      });
    }
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div
            style={{
              display: 'inline-flex',
              cursor: 'pointer',
              color: '#335D8A'
            }}
            onClick={() => {
              history.goBack();
            }}
          >
            <ChevronRight color="#335D8A" width={'15px'} />
            بازگشت
          </div>
          <Box
            sx={{
              //   display: 'flex',
              //   flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px',
              gap: '50px',
              background: '#FFFFFF',
              borderRadius: '8px',
              width: '100%'
              //   height: '290px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <InputLabelHeader
                sx={{
                  color: '#00346D',
                  fontWeight: 700,
                  fontSize: '20px',
                  marginBottom: '16px'
                }}
              >
                {data?.project?.name}
              </InputLabelHeader>
            </Box>

            <Box sx={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%'
                  }}
                >
                  <LocationOnOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />{' '}
                  <InputLabel style={{ color: '#00AAB5' }}> آدرس: </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.project?.location?.country_name}{' '}
                    {data?.project?.location?.city_name}{' '}
                    {data?.project?.location?.address}
                  </InputLabel>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                <BusinessOutlined
                  style={{ color: '#00AAB5', fontSize: '22px' }}
                />{' '}
                <InputLabel style={{ color: '#00AAB5' }}>
                  نوع ساختمان:{' '}
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.project?.building_type}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                <ScaleOutlined style={{ color: '#00AAB5', fontSize: '22px' }} />{' '}
                <InputLabel style={{ color: '#00AAB5' }}>
                  طول لوله مصرفی:{' '}
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.project?.pipe_length}
                </InputLabel>
              </div>

              <Divider sx={{ marginBottom: '20px' }} />
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                <ConstructionOutlined
                  style={{ color: '#00AAB5', fontSize: '22px' }}
                />{' '}
                <InputLabel style={{ color: '#00AAB5' }}>نوع پروژه:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.project?.project_type &&
                    data?.project?.project_type[0]?.name}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                {' '}
                <CollectionsBookmarkOutlined
                  style={{ color: '#00AAB5', fontSize: '22px' }}
                />{' '}
                <InputLabel style={{ color: '#00AAB5' }}>محصولات:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {/* {data?.detail_translate.item_fa} */}
                </InputLabel>
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              //   display: 'flex',
              //   flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px',
              gap: '50px',
              background: '#FFFFFF',
              marginTop: '24px',

              borderRadius: '8px',
              width: '100%'
              //   height: '290px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <InputLabelHeader
                sx={{
                  color: '#00346D',
                  fontWeight: 700,
                  fontSize: '20px',
                  marginBottom: '16px'
                }}
              >
                جزئیات درخواست{' '}
                <p style={{ display: 'inline' }}>
                  {data?.project?.project_num}
                </p>
              </InputLabelHeader>
            </Box>

            <Box
              sx={{
                width: '100%',
                backgroundColor: '#ffff'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      width: '100%'
                    }}
                  >
                    <CalendarMonthIcon
                      style={{ color: '#00AAB5', fontSize: '22px' }}
                    />{' '}
                    <InputLabel style={{ color: '#00AAB5' }}>
                      {' '}
                      زمان ثبت:{' '}
                    </InputLabel>
                    <InputLabel style={{ color: '#335D8A' }}>
                      {moment(data?.create_date, 'YYYY/MM/DD HH:mm:ss', 'fa')
                        .format('YYYY/MM/DD')
                        .toLocaleLowerCase('fa')}
                    </InputLabel>
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      width: '100%'
                    }}
                  >
                    <InputLabel style={{ color: '#00AAB5' }}>
                      {' '}
                      وضعیت:
                    </InputLabel>
                    {
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '3px 6px !important',
                          background:
                            data?.status?.data &&
                            JSON.parse(data?.status?.data)?.back,
                          borderRadius: '4px',
                          color:
                            data?.status?.data &&
                            JSON.parse(data?.status?.data)?.text
                        }}
                      >
                        <InputLabel
                          style={{
                            fontSize: '1rem',
                            color:
                              data?.status?.data &&
                              JSON.parse(data?.status?.data)?.text,
                            paddingLeft: 0
                          }}
                        >
                          {data?.status?.label}
                        </InputLabel>
                      </Box>
                    }
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                {/* <BusinessOutlined
                  style={{ color: '#00AAB5', fontSize: '22px' }}
                />{' '} */}
                <InputLabel style={{ color: '#00AAB5' }}>
                  سفارش دهنده:{' '}
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {/* {data?.} */}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                {/* <ScaleOutlined style={{ color: '#00AAB5', fontSize: '22px' }} />{' '} */}
                <InputLabel style={{ color: '#00AAB5' }}>
                  تامین کننده:{' '}
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.project?.supplier?.first_name}{' '}
                  {data?.project?.supplier?.last_name}
                </InputLabel>
              </div>
              <Divider sx={{ marginBottom: '20px' }} />

              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 16
                  }}
                >
                  <TuneOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />{' '}
                  <InputLabel style={{ color: '#00AAB5' }}>
                    نوع سیستم :{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {/* {data?.designer_type} */}
                  </InputLabel>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 16
                }}
              >
                <PaidOutlined style={{ color: '#00AAB5', fontSize: '22px' }} />{' '}
                <InputLabel style={{ color: '#00AAB5' }}>
                  هزینه تخمینی:{' '}
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {/* {data?.designer} */}
                </InputLabel>
              </div>
              <Box>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    padding: '12px',
                    gap: '17px',
                    width: '100%',
                    // height: '100px',
                    backgroundColor: '#E6EBF0',
                    borderRadius: '4px',
                    color: '#00346D',
                    fontFamily: 'IRANSans',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  {!cancel && !accept ? (
                    <>
                      <div
                        style={{
                          display: 'flex'
                        }}
                      >
                        <LiveHelpOutlined
                          style={{ color: '#00AAB5', fontSize: '22px' }}
                        />
                        وضعیت درخواست را مشخص کنید :
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignSelf: 'end'
                        }}
                      >
                        <ConfirmButton
                          style={{
                            width: '90px',
                            height: '32px',
                            fontSize: '13px',
                            padding: '0'
                          }}
                          disabled={false}
                          onClick={() => {
                            setCancel(true);
                          }}
                        >
                          <Close
                            style={{
                              color: '',
                              fontSize: '18px',
                              padding: '0'
                            }}
                          />
                          عدم تایید
                        </ConfirmButton>
                        <ConfirmButton
                          style={{
                            background: '#00346D',
                            width: '125px',
                            height: '32px',
                            fontSize: '13px',
                            padding: '0'
                          }}
                          disabled={false}
                          type={'submit'}
                          onClick={() => {
                            setAccept(true);
                          }}
                        >
                          <Done
                            style={{
                              color: '',
                              fontSize: '18px',
                              padding: '0'
                            }}
                          />{' '}
                          تایید درخواست
                        </ConfirmButton>
                      </div>
                    </>
                  ) : cancel ? (
                    <>
                      <RejectRequest
                        api={
                          '/api/management/project/certificate/update_certificate_status/'
                        }
                        postInfo={{
                          ref_num: data?.ref_num,
                          action: 'Reject',
                          state: 'Certification'
                        }}
                        cancel={() => setCancel(false)}
                      />
                    </>
                  ) : (
                    ''
                  )}
                  {accept ? (
                    <AcceptRequest
                      api={
                        '/api/management/project/certificate/update_certificate_status/'
                      }
                      postInfo={{
                        ref_num: data?.ref_num,
                        action: 'Approve',
                        state: 'Certificated'
                      }}
                      accept={() => setAccept(false)}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ height: 'auto' }} item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '16px 10px',
              gap: '13.26px',
              borderRadius: '8px',
              backgroundColor: 'white',
              width: '100%',
              height: '100%'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D' }}>
              ضمائم
            </InputLabelHeader>
            {/* <InputLabel style={{ color: '#00346D' }}>تصاویر پروژه:</InputLabel> */}
            <Box sx={{ width: '100%' }}>
              {data?.instruction_files?.index > 0 ? (
                <>{data?.instruction_files}</>
              ) : (
                <>فایلی موجود نیست</>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

{
  /* <Box sx={{ mt: 3 }}>
                  <Button
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '30px 0px',
                      gap: '30px',
                      width: '100%',
                      height: '150px',
                      border: '2px dashed #99DDE1',
                      borderRadius: '4px',
                      color: '#4F4C4D',
                      fontFamily: 'IRANSans',
                      fontWeight: 400,
                      fontSize: '16px'
                    }}
                    component="label"
                    // onChange={event => {
                    //   setFile(event.target.files[0]);
                    // }}
                  >
                    <img src={Upload} with="33px" height="28px" />
                    {'انتخاب فایل'}
                    <input type="file" hidden />
                  </Button>
                </Box> */
}
