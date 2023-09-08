import { Box } from '@mui/material';
import { ChevronLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';
import ProjectImage from 'src/assets/img/projectImage.png';
import InputLabel from 'src/components/Mobile/InputLabel';
import useSaleSearch from 'src/hooks/useSaleSearch';
import MomentFa from 'src/utils/MomentFa';

export default function ReceivedItem({
  data,
  selected,
  setSelected,
  type,
  typeName
}) {
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
        background:
          selected && data.ref_num === selected.ref_num ? '#CCEEF0' : '#FFFFFF',
        boxShadow: '0px 0px 8px rgba(146, 146, 146, 0.25)',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
      onClick={() => {
        setSelected(data);
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
            // gap: '2px',

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
                {data?.project?.name}
              </InputLabel>
              <InputLabel
                style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  color: '#6685A7'
                  // lineHeight: '17px'
                }}
              >
                {data?.ref_num}
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
        </Box>
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
          {`ثبت درخواست: ${MomentFa(data?.create_date)}`}
        </InputLabel>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
          // onClick={() => {
          //   history.push({
          //     pathname: '/project/received/detail',
          //     state: {
          //       data,
          //       type,
          //       typeName
          //     }
          //   });
          // }}
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
