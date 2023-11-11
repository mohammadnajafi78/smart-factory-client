import { Box, Divider, Drawer } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Download } from 'react-feather';
import { useHistory } from 'react-router';
import Frame from 'src/assets/img/Frame.png';
import FormatList from 'src/assets/img/format_list_numbered.png';
import Info from 'src/assets/img/info.png';
import LibraryAdd from 'src/assets/img/library_add.png';
import Timer from 'src/assets/img/timer.png';
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
export default function ExamDetailMobile(props) {
  const [examDetail, setExamDetail] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  function getData() {
    httpService
      .get(
        `${API_BASE_URL}/api/lms/exam/get_exam_info/?exam_num=${props.location.state.exam}`
      )
      .then(res => {
        if (res.status === 200) {
          setExamDetail(res.data[0]);
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
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '60px',
          backgroundColor: '#E5E5E5',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingBottom: '100px'
        }}
      >
        {examDetail && (
          <>
            <Box
              sx={{
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <img src={examDetail?.image?.url} />
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 0
                  }}
                >
                  <InputLabel style={{ color: '#00346D' }}>
                    {examDetail?.name}
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
                    {`${examDetail?.duration} ساعت - ${examDetail?.question_count} سوال`}
                  </InputLabel>
                </Box>
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
                    {`برگزرای: ${MomentFa(examDetail?.date)} -  ${
                      examDetail?.start_time
                    }`}
                  </InputLabel>
                </Box>
              </Box>
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
                  {'شرح آزمون'}
                </InputLabel>
                <Divider sx={{ my: 1 }} />
                <InputLabel
                  style={{
                    color: '#335D8A',
                    fontSize: '12px',
                    marginTop: '10px'
                  }}
                >
                  {examDetail?.description}
                </InputLabel>
              </Box>
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
                  {'راهنمای آزمون'}
                </InputLabel>
                <Divider sx={{ my: 1 }} />
                <InputLabel
                  style={{
                    color: '#335D8A',
                    fontSize: '12px',
                    marginTop: '10px'
                  }}
                >
                  {
                    'جهت شرکت در آزمون، سوالات آزمون را دریافت کنید و پس از باز کردن فایل سوالات، بر روی دکمه ی پایین صفحه بزنید و وارد آزمون شوید'
                  }
                </InputLabel>
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
                    {`مدت زمان آزمون:  ${examDetail?.duration}`}
                  </InputLabel>
                </Box>

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
                  <img src={FormatList} />
                  <InputLabel
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      color: '#00346D',
                      minHeight: 'auto',
                      lineHeight: 'unset'
                    }}
                  >
                    {`تعداد سوالات:  ${examDetail?.question_count}`}
                  </InputLabel>
                </Box>
                <Divider />
                <Box sx={{ display: 'inline-flex' }}>
                  <img src={Info} width="20px" height="20px" />
                  <InputLabel style={{ color: '#00346D', fontSize: '14px' }}>
                    {
                      'توجه داشته باشید که شما در صورت لزوم میتوانید از آزمون انصراف دهید.'
                    }
                  </InputLabel>
                </Box>
                <a
                  href={examDetail?.question_file}
                  download
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: '5px'
                  }}
                >
                  <ConfirmButton>
                    <Download />
                    دریافت سوالات
                  </ConfirmButton>
                </a>
              </Box>
            </Box>

            <Box
              sx={{
                position: 'fixed',
                bottom: '0%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                height: '70px',
                padding: '10px'
              }}
            >
              <ConfirmButton
                style={{ margin: '0px 10px', backgroundColor: '#00346D' }}
                onClick={() => {
                  if (examDetail.question_file === false) {
                    setOpen(true);
                  } else {
                    history.push({
                      pathname: '/lms/exam/questions',
                      state: {
                        exam: examDetail
                      }
                    });
                  }
                }}
              >
                <img src={LibraryAdd} style={{ marginLeft: '3px' }} />
                شروع آزمون
              </ConfirmButton>
            </Box>
          </>
        )}
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
            // justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px',
            gap: '20px',
            height: '185px',
            background: '#FFFFFF'
          }}
        >
          <InputLabel style={{ color: '#335D8A' }}>
            {'شما در این آزمون ثبت نام نکرده اید.'}
          </InputLabel>
          <Box sx={{ display: 'inline-flex' }}>
            <img src={Info} width="20px" height="20px" />
            <InputLabel style={{ color: '#00346D', fontSize: '14px' }}>
              {
                'پس از ثبت نام، شما میتوانید به این آزمون در بخش پروفایل دسترسی داشته باشید.'
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
                .post(`${API_BASE_URL}/api/lms/exam/register/`, {
                  ref_num: examDetail.ref_num
                })
                .then(res => {
                  if (res.status === 200) {
                    setExamDetail(res.data);
                    setOpen(false);
                  }
                })
                .catch(ex => {
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
            {'ثبت نام'}
          </ConfirmButton>
        </Box>
      </Drawer>
    </>
  );
}
