import React from 'react';
import { Box } from '@mui/system';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import { ChevronDown, ChevronRight, Download, User } from 'react-feather';
import InputLabelHeader from 'src/components/Desktop/InputLabel';
import {
  CalendarMonthOutlined,
  CalendarTodayOutlined,
  Category,
  CategoryOutlined,
  ContentCopyOutlined,
  EditNote,
  InfoOutlined,
  LocalLibraryOutlined,
  PersonOutlineOutlined,
  PlayArrow,
  PlayArrowRounded,
  PlayCircleOutlineOutlined,
  TimerOutlined
} from '@mui/icons-material';

import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import MomentFa from 'src/utils/MomentFa';
const AboutCourse = ({ data }, ...props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log(data);
  return (
    <>
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
                style={{
                  width: '160px',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                onClick={() => {
                  console.log('new exam');
                }}
              >
                <EditNote />
                ویرایش دوره
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
                    دسته بندی:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.category?.name}
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
                  <InputLabel style={{ color: '#00AAB5' }}>مدرس: </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.teacher?.first_name} {data?.teacher?.last_name}
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
                  <ContentCopyOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />
                  <InputLabel style={{ color: '#00AAB5' }}>
                    تعداد جلسات:{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.session_count}
                  </InputLabel>
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 16
                  }}
                >
                  <CalendarTodayOutlined
                    style={{ color: '#00AAB5', fontSize: '22px' }}
                  />
                  <InputLabel style={{ color: '#00AAB5' }}>
                    روزهای برگزاری:{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {/* {data?.week_day?.map(x => {
                        x.label;
                      })} */}
                    {data?.week_day?.map(x => {
                      return <span key={x.label}>{x.label} </span>;
                    })}
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
                    تاریخ دوره:{' '}
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {MomentFa(data?.start_date)} تا {MomentFa(data?.end_date)}{' '}
                  </InputLabel>
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
      </Grid>
      <Box display={'flex'} gap={'12px'}>
        <Box width="50%" display={'flex'} flexDirection={'column'} gap={'12px'}>
          <Grid>
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
                    مدرس دوره
                  </InputLabelHeader>
                </Box>
                <Button
                  style={{
                    width: '160px',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  onClick={() => {
                    console.log('new exam');
                  }}
                >
                  <EditNote />
                  ویرایش
                </Button>
              </Box>
              <Divider style={{ margin: '16px 0' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flexGrow: 2 }}>
                  <div style={{ display: 'flex' }}>
                    <LocalLibraryOutlined
                      style={{
                        display: 'inline',
                        color: '#00AAB5',
                        fontSize: '22px'
                      }}
                    />{' '}
                    <InputLabel style={{ color: '#00AAB5' }}>
                      {' '}
                      {data?.teacher.first_name} {data?.teacher?.last_name}
                    </InputLabel>
                  </div>
                  <p>{data?.teacher_description}</p>
                </div>
                <div>
                  <img src={data?.image?.file} />
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid>
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
              <Accordion
                elevation={0}
                sx={{
                  borderBottom: `1px solid ${
                    expanded === false ? 'rgba(0, 0, 0, 0.12)' : 'none'
                  } `
                }}
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <InputLabelHeader
                    sx={{
                      color: '#00346D',
                      fontWeight: 700,
                      fontSize: '20px'
                    }}
                  >
                    سرفصل‌ها
                  </InputLabelHeader>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  {data?.sessions?.map((x, index) => {
                    return (
                      <div>
                        <InputLabelHeader
                          sx={{
                            color: '#00346D',
                            fontWeight: 400,
                            fontSize: '16px',
                            marginBottom: '4px'
                          }}
                        >
                          {`فصل ${index + 1} :`} {x.name}
                        </InputLabelHeader>
                        <p
                          style={{
                            fontSize: '12px',
                            fontWeight: '400',
                            color: '#00346d'
                          }}
                        >
                          {x.description}
                        </p>
                      </div>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Box>

        <Grid sx={{ width: '50%' }}>
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
                  جلسات
                </InputLabelHeader>
              </Box>
            </Box>
            <Divider style={{ margin: '16px 0' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {data?.sessions?.map(x => {
                return (
                  <Card sx={{ width: '100%' }} className={'sessioncard'}>
                    <a
                      target="_blank"
                      style={{
                        textDecoration: 'none',
                        cursor: 'pointer',
                        color: 'initial'
                      }}
                      href={x.link}
                    >
                      <Box
                        padding={'12px'}
                        display={'flex'}
                        justifyContent={'space-between'}
                      >
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <PlayArrow
                            sx={{
                              borderRadius: '100%',
                              border: '1px solid #00346d'
                            }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'start',
                              gap: '8px'
                            }}
                          >
                            <InputLabelHeader
                              sx={{
                                color: '#00346D',
                                fontWeight: 400,
                                fontSize: '16px'
                              }}
                            >
                              {x?.name}
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
                                  data?.status?.data &&
                                  JSON.parse(data?.status?.data)?.text
                              }}
                            >
                              <InputLabel
                                style={{
                                  fontSize: '10px',
                                  color:
                                    x?.status?.data &&
                                    JSON.parse(x?.status?.data)?.text,
                                  paddingLeft: 0
                                }}
                              >
                                {x?.status?.label}
                              </InputLabel>
                            </Box>
                          </div>
                        </div>
                        <div style={{ fontSize: '14px' }}>{x.start_time}</div>
                      </Box>
                      <Divider />
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'end'}
                        padding={'12px'}
                      >
                        <a>
                          <InputLabelHeader
                            sx={{
                              display: 'flex',
                              color: '#00346D',
                              fontWeight: 500,
                              fontSize: '14px'
                            }}
                          >
                            <Download /> دریافت جزوه
                          </InputLabelHeader>
                        </a>
                      </Box>
                    </a>
                  </Card>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default AboutCourse;
