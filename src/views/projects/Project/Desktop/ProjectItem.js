import { Box } from '@mui/material';
import React from 'react';
import { ChevronLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Mobile/InputLabel';
import useSaleSearch from 'src/hooks/useSaleSearch';
import MomentFa from 'src/utils/MomentFa';
import ProjectImage from 'src/assets/img/projectImage.png';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

export default function ProjectItem({ data, selected, setSelected }) {
  const { searched } = useSaleSearch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        gap: '10px',
        width: '100%',
        // height: '114px',
        background:
          selected && data.project_num === selected.project_num
            ? '#CCEEF0'
            : '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
      onClick={() => {
        httpService
          .get(
            `${API_BASE_URL}/api/project/get_project?project_num=${data.project_num}`
          )
          .then(res => {
            if (res.status === 200) {
              console.log('inja', res.data);
              setSelected(res.data);
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
        <img src={ProjectImage} style={{ width: '44px', height: '44px' }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '2px',

            width: '100%',
            height: '50px'
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
            </Box>
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
                  fontSize: '12px',
                  color: '#6685A7'
                  // lineHeight: '17px'
                }}
              >
                {data?.project_num}
              </InputLabel>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
              padding: '2px',
              gap: '4px',
              color: '#6685A7',
              padding: '3px 6px',
              borderRadius: '4px'
            }}
          >
            <InputLabel
              style={{
                fontWeight: 400,
                fontSize: '12px',
                color: '#335D8A'
              }}
            >
              {data?.project_state?.label}
            </InputLabel>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
          padding: '0px',
          gap: '4px',
          // backgroundColor: '#DDF5F6',
          // color: '#335D8A',
          color: JSON.parse(data?.status?.data).text,
          background: JSON.parse(data?.status?.data).back,
          // width: '100%',
          // height: '25px',
          padding: '3px 6px',
          borderRadius: '4px'
        }}
      >
        <InputLabel
          style={{
            fontWeight: 400,
            fontSize: '12px'
            // color: '#335D8A',

            //
          }}
        >
          {data?.status?.label}
        </InputLabel>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '8px 10px',
          gap: '4px',
          height: '36px',
          width: '100%',

          background: '#E6EBF0',
          borderRadius: '4px'
        }}
      >
        <InputLabel
          style={{
            fontWeight: 400,
            fontSize: '14px',
            color: '#00346D',
            lineHeight: '17px'
          }}
        >
          {`ثبت پروژه: ${MomentFa(data?.create_date)}`}
        </InputLabel>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
          //   onClick={() => {
          //     history.push({
          //       pathname: '/project/project/detail',
          //       state: data
          //     });
          //   }}
        >
          <InputLabel
            style={{
              fontWeight: 500,
              fontSize: '14px',
              color: '#00346D',
              paddingLeft: '0px'
              // lineHeight: '17px'
            }}
          >
            مشاهده
          </InputLabel>
          <ChevronLeft color="#00346D" height={'20px'} />
        </Box>
      </Box>
    </Box>
  );
}
