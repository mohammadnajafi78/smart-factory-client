import { Box, Divider } from '@mui/material';
import React from 'react';
import { ChevronLeft, Star } from 'react-feather';
import { NavLink, useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import useSaleSearch from 'src/hooks/useSaleSearch';
import MomentFa from 'src/utils/MomentFa';
import LocalLibrary from 'src/assets/img/local_library.png';
import Frame from 'src/assets/img/Frame.png';
import CalendarToday from 'src/assets/img/calendar_today.png';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function ExamItem({ data, type, typeName }) {
  const { searched } = useSaleSearch();
  const history = useHistory();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '10px',
        width: '100%',
        // height: '114px',
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
        <img src={data?.image?.url} style={{ width: '44px', height: '44px' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            // gap: '2px',

            width: '100%'
            // height: '50px'
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
                {data?.name}
              </InputLabel>
              {/* <InputLabel
                style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  color: '#335D8A',
                  backgroundColor: '#CCEEF0',
                  padding: '3px 6px',
                  borderRadius: '4px'

                  // lineHeight: '17px'
                }}
              >
                {`${data?.session_count} جلسه`}
              </InputLabel> */}
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
              // padding: '3px 0px'
              // borderRadius: '4px'
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
              {`برگزاری: ${MomentFa(data?.date)} - ساعت: ${data?.start_time}`}
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
              {`${data?.duration} ساعت - ${data?.question_count} سوال`}
            </InputLabel>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          // padding: '8px 10px',
          gap: '4px',
          height: '36px',
          width: '100%',

          background: 'white',
          borderRadius: '4px'
        }}
      >
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
                exam: data?.ref_num,
                type,
                typeName
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
}
