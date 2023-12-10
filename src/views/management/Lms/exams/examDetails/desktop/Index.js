import React from 'react';
import { Box } from '@mui/system';
import { Divider, Grid } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import { ChevronRight } from 'react-feather';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import {
  AttachFileOutlined,
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  CategoryOutlined,
  ContentCopyOutlined,
  EditNote,
  InfoOutlined,
  PersonOutlineOutlined,
  TimerOutlined
} from '@mui/icons-material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';

import { useEffect } from 'react';
import { useState } from 'react';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import ExamsPersonsTable from './Table';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import NewExam from './NewExam';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ExamDetails(props) {
  const [ref_num, setRefNum] = useState();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.location.state) {
      httpService
        .get(
          `${API_BASE_URL}/api/management/lms/exam/get_exam_info/?ref_num=${props?.location?.state?.data}`
        )
        .then(res => {
          if (res.status === 200) {
            setData(res.data);
          }
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      return <>error</>;
    }
  }, [props.location.state]);
  const history = useHistory();
  return (
    <Box sx={{ width: '100%' }}>
      <Grid sx={{ paddingBottom: '12px' }}>
        <div
          style={{
            display: 'inline-flex',
            color: '#335D8A',
            cursor: 'pointer'
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
            alignItems: 'flex-start',
            padding: '16px',
            gap: '50px',
            background: '#FFFFFF',
            borderRadius: '8px',
            width: '100%'
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <InputLabelHeader
                  sx={{
                    color: '#00346D',
                    fontWeight: 700,
                    fontSize: '20px'
                  }}
                >
                  {data?.name}
                </InputLabelHeader>
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
                      data?.status?.data && JSON.parse(data?.status?.data)?.text
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
              </Box>
              <ConfirmButton
                variant="outlined"
                style={{
                  marginLeft: '8px',
                  width: '160px',
                  height: '3rem',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                onClick={() => {
                  console.log('new exam');
                }}
              >
                <AttachFileOutlined style={{ fontSize: '22px' }} />
                فایل سوالات
              </ConfirmButton>
              <ConfirmButton
                style={{
                  width: '160px',
                  height: '3rem',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <EditNote style={{ fontSize: '22px' }} />
                ویرایش آزمون
              </ConfirmButton>
            </Box>
          </Box>
          <Divider sx={{ margin: '16px 0' }} />
          <Box>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 16
                  }}
                >
                  <CategoryOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />
                  <InputLabel style={{ color: '#00AAB5' }}>
                    روز برگزاری:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {MomentFa(data?.date)}
                  </InputLabel>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 16
                  }}
                >
                  <TimerOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />
                  <InputLabel style={{ color: '#00AAB5' }}>
                    ساعت برگزاری:{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.start_time}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 16
                  }}
                >
                  <CalendarMonthOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />
                  <InputLabel style={{ color: '#00AAB5' }}>
                    تعداد سوالات:{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.question_count}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 16
                  }}
                >
                  <PersonOutlineOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />
                  <InputLabel style={{ color: '#00AAB5' }}>
                    نمره قبولی:{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>{}</InputLabel>
                </div>
              </Grid>
            </Grid>
          </Box>
          <Divider style={{ marginBottom: '16px' }} />
          <Box>
            <div
              style={{
                display: 'inline-flex',
                width: '100%',
                marginBottom: 16
              }}
            >
              <InfoOutlined style={{ color: '#00AAB5', fontSize: '22px' }} />
              <InputLabel style={{ color: '#00AAB5' }}>شرح دوره: </InputLabel>
              <p>{data?.description}</p>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'flex-start',
            padding: '16px',
            gap: '50px',
            background: '#FFFFFF',
            borderRadius: '8px',
            width: '100%',
            marginTop: '1rem'
          }}
        >
          <ExamsPersonsTable ref_num={props?.location?.state?.data} />
        </Box>
      </Grid>
      <NewExam
        open={open}
        handleClose={() => setOpen(false)}
        title="ویرایش محصول "
        data={data}
        type="edit"
        setData={setData}
      />
    </Box>
  );
}
