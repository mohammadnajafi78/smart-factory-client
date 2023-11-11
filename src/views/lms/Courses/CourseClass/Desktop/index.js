import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, Drawer, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Download } from 'react-feather';
import { useHistory } from 'react-router';
import Frame from 'src/assets/img/Frame.png';
import Info from 'src/assets/img/info.png';
import LibraryAdd from 'src/assets/img/library_add.png';
import PlayCircle from 'src/assets/img/play_circle.png';
import Timer from 'src/assets/img/timer.png';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import InputLabel from 'src/components/Mobile/InputLabel';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function CourseDetailDesktop(props) {
  const [courseDetail, setCourseDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .post(
        `${API_BASE_URL}/api/lms/course/get_course_info/?course_num=${props.location.state.course_num}`
      )
      .then(res => {
        if (res.status === 200) {
          console.log('detail', res.data);
          setCourseDetail(res.data[0]);
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: '60px',
          padding: '0px 20px',
          marginRight: '140px',
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingBottom: '100px'
          }}
        >
          {courseDetail && (
            <Box
              sx={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                position: 'relative'
              }}
            >
              <img src={courseDetail?.image?.url} height="350px" />
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                  mt: 2,
                  position: 'absolute',
                  top: '2%',
                  left: '2%',
                  minWidth: '400px'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 0
                  }}
                >
                  <InputLabel style={{ color: '#00346D' }}>
                    {courseDetail?.name}
                  </InputLabel>
                  <InputLabel
                    style={{
                      fontWeight: 500,
                      fontSize: '12px',
                      color: '#335D8A',
                      backgroundColor: '#CCEEF0',
                      padding: '3px 6px',
                      borderRadius: '8px'

                      // lineHeight: '17px'
                    }}
                  >
                    {`${courseDetail?.session_count} جلسه`}
                  </InputLabel>
                </Box>
                <InputLabel style={{ color: '#6685A7', fontSize: '12px' }}>
                  {props.location.state.typeName}
                </InputLabel>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '2px',
                    gap: '4px'
                  }}
                >
                  <img src={Frame} />
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#00346D',
                      minHeight: 'auto',
                      lineHeight: 'unset'
                    }}
                  >
                    {`شروع: ${MomentFa(courseDetail?.start_date)}`}
                  </InputLabel>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '2px',
                    gap: '4px',
                    mt: 1
                  }}
                >
                  <img src={Timer} />
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#00346D',
                      minHeight: 'auto',
                      lineHeight: 'unset'
                    }}
                  >
                    {courseDetail?.week_day.map(f => f.label + '، ')}
                  </InputLabel>
                </Box>
                <InputLabel
                  style={{
                    color: '#335D8A',
                    fontSize: '12px',
                    marginTop: '10px'
                  }}
                >
                  {courseDetail?.description}
                </InputLabel>
                {!courseDetail?.registered && (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      padding: '0px 10px'
                    }}
                  >
                    <ConfirmButton
                      style={{ margin: '0px 10px' }}
                      onClick={() => setOpen(true)}
                    >
                      <img src={LibraryAdd} style={{ marginLeft: '3px' }} />
                      ثبت نام در دوره
                    </ConfirmButton>
                  </Box>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item md={8}>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '10px',
                      mt: 2
                    }}
                  >
                    <InputLabel style={{ color: '#00346D' }}>
                      {'مدرس دوره'}
                    </InputLabel>
                    <Divider sx={{ my: 1 }} />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '60%'
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '2px',
                            gap: '4px',
                            mt: 1
                          }}
                        >
                          <img src={Frame} />
                          <InputLabel
                            style={{
                              fontWeight: 400,
                              fontSize: '14px',
                              color: '#00346D',
                              minHeight: 'auto',
                              lineHeight: 'unset'
                            }}
                          >
                            {courseDetail?.teacher?.first_name +
                              ' ' +
                              courseDetail?.teacher?.last_name}
                          </InputLabel>
                        </Box>
                        <InputLabel
                          style={{ color: '#335D8A', fontSize: '12px' }}
                        >
                          {courseDetail?.teacher_description}
                        </InputLabel>
                      </Box>
                      <img
                        src={courseDetail?.teacher?.user_profile_image}
                        width="120px"
                        height="120px"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <InputLabel style={{ color: '#00346D' }}>
                          {'سرفصل ها'}
                        </InputLabel>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider />
                        {courseDetail?.subject.map(item => {
                          return (
                            <Box sx={{ mt: 1, mr: 1 }}>
                              <InputLabel style={{ color: '#00346D' }}>
                                {item.title}
                              </InputLabel>
                              <InputLabel
                                style={{ color: '#00346D', fontSize: '10px' }}
                              >
                                {item.text}
                              </InputLabel>
                            </Box>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box sx={{ mt: 2 }}>
                    <Accordion expanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <InputLabel style={{ color: '#00346D' }}>
                          {'جلسات'}
                        </InputLabel>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Divider />
                        {courseDetail?.sessions.map(item => {
                          return (
                            <Box
                              sx={{
                                mt: 2,
                                border: '1px solid #D3D2D2',
                                borderRadius: '4px',
                                padding: '5px'
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <Box
                                  sx={{ display: 'flex', flexDirection: 'row' }}
                                >
                                  <img
                                    src={PlayCircle}
                                    width="40px"
                                    height={'40px'}
                                  />
                                  <Box>
                                    <InputLabel
                                      style={{
                                        color: '#00346D',
                                        fontSize: '13px'
                                      }}
                                    >
                                      {item?.name}
                                    </InputLabel>
                                    <InputLabel
                                      style={{
                                        backgroundColor: JSON.parse(
                                          item?.status?.data
                                        ).back,
                                        color: JSON.parse(item?.status?.data)
                                          .text,
                                        fontSize: '12px',
                                        padding: '3px 6px',
                                        width: 'fit-content',
                                        borderRadius: '4px'
                                      }}
                                    >
                                      {item?.status?.label}
                                    </InputLabel>
                                  </Box>
                                </Box>
                                <InputLabel
                                  style={{ color: '#00346D', fontSize: '16px' }}
                                >
                                  {item?.start_time}
                                </InputLabel>
                              </Box>
                              {item?.note?.url && (
                                <>
                                  <Divider sx={{ my: 1 }} />
                                  <Box
                                    sx={{
                                      display: 'flex'
                                    }}
                                  >
                                    <a
                                      href={item?.note?.url}
                                      download
                                      target="_blank"
                                      style={{
                                        textDecoration: 'none',
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end'
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: 'inline-flex'
                                        }}
                                      >
                                        <Download
                                          style={{
                                            color: '#00346D',
                                            width: '20px',
                                            height: '20px',
                                            marginLeft: '3px'
                                          }}
                                        />
                                        <InputLabel
                                          style={{ color: '#00346D' }}
                                        >
                                          دانلود جزوه
                                        </InputLabel>
                                      </Box>
                                    </a>
                                  </Box>
                                </>
                              )}
                            </Box>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>

        <CustomizedDialogs
          title={'ثبت نام'}
          open={open}
          handleClose={() => setOpen(false)}
          content={
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  // justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '20px',
                  gap: '20px',
                  height: '185px',
                  background: '#FFFFFF'
                }}
              >
                <InputLabel style={{ color: '#335D8A' }}>
                  {'آیا از شرکت در این دوره مطمئن هستید؟'}
                </InputLabel>
                <Box sx={{ display: 'inline-flex' }}>
                  <img src={Info} width="20px" height="20px" />
                  <InputLabel style={{ color: '#00346D', fontSize: '14px' }}>
                    {
                      'پس از ثبت نام، شما میتوانید به این دوره در بخش پروفایل دسترسی داشته باشید.'
                    }
                  </InputLabel>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  width: '100%',
                  borderTop: '0.5px solid #D3D2D2',
                  padding: '12px 16px'
                }}
              >
                <ConfirmButton
                  disabled={false}
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {'بستن'}
                </ConfirmButton>
                <ConfirmButton
                  disabled={false}
                  onClick={() => {
                    httpService
                      .post(
                        `${API_BASE_URL}/api/lms/course/register/?course_num=${props?.location?.state?.course}`
                      )
                      .then(res => {
                        if (res.status === 200) {
                          setOpen(false);
                        }
                      })
                      .catch(ex => {
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
                  {'ثبت نام'}
                </ConfirmButton>
              </Box>
            </>
          }
        />
      </div>
    </>
  );
}
