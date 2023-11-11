import { Box, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Frame from 'src/assets/img/Frame.png';
import CalendarToday from 'src/assets/img/calendar_today.png';
import InputLabel from 'src/components/Mobile/InputLabel';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function MyExam(props) {
  const [exams, setExams] = useState();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/lms/exam/get_user_exam/`)
      .then(res => {
        if (res.status === 200) {
          setExams(res.data);
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 3px',
        gap: '14px',
        overflowY: 'auto'
      }}
    >
      {exams &&
        exams.length > 0 &&
        exams.map((data, index) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                gap: '10px',
                width: '100%',
                background: '#FFFFFF',
                boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
                borderRadius: '8px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <img
                  src={data?.exam?.image?.url}
                  style={{ width: '44px', height: '44px' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    width: '100%'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                      padding: '0px',
                      gap: '3px',

                      width: '100%',
                      height: '25px'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                    >
                      <InputLabel
                        style={{
                          fontWeight: 500,
                          fontSize: '15px',
                          color: '#00346D'
                          // lineHeight: '17px'
                        }}
                      >
                        {data?.exam?.name}
                      </InputLabel>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
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
                      {`برگزاری: ${MomentFa(data?.exam?.date)} - ساعت: ${
                        data?.exam?.start_time
                      }`}
                    </InputLabel>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '2px',
                      gap: '4px'
                      // padding: '3px 0px'
                    }}
                  >
                    <img src={CalendarToday} />
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#00346D',
                        minHeight: 'auto',
                        lineHeight: 'unset'
                      }}
                    >
                      {`${data?.exam?.duration} ساعت - ${data?.exam?.question_count} سوال`}
                    </InputLabel>
                  </Box>
                </Box>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: '4px',
                  height: '36px',
                  width: '100%',

                  background: 'white',
                  borderRadius: '4px'
                }}
              >
                <InputLabel
                  style={{
                    backgroundColor: JSON.parse(data?.status?.data).back,
                    color: JSON.parse(data?.status?.data).text,
                    fontSize: '12px',
                    padding: '3px 6px',
                    width: 'fit-content',
                    borderRadius: '4px'
                  }}
                >
                  {data?.status?.label}
                </InputLabel>
                <Box
                  sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                  onClick={() => {
                    history.push({
                      pathname: '/lms/exam/detail',
                      state: {
                        exam: data?.exam?.ref_num
                        // type,
                        // typeName
                      }
                    });
                  }}
                >
                  <InputLabel
                    style={{
                      fontWeight: 500,
                      fontSize: '14px',
                      color: '#00AAB5',
                      paddingLeft: '0px'
                      // lineHeight: '17px'
                    }}
                  >
                    مشاهده آزمون
                  </InputLabel>
                  <ChevronLeft color="#00AAB5" height={'20px'} />
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
