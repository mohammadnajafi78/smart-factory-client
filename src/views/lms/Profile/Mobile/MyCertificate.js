import { Box, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Download } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Frame from 'src/assets/img/Frame.png';
import InputLabel from 'src/components/Mobile/InputLabel';
import MomentFa from 'src/utils/MomentFa';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';

export default function MyCertificate(props) {
  const [certificates, setCertificates] = useState();
  const history = useHistory();

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/lms/certificate/`).then(res => {
      if (res.status === 200) {
        setCertificates(res.data);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 3px',
        gap: '14px',
        overflowX: 'auto'
      }}
    >
      {certificates &&
        certificates.length > 0 &&
        certificates.map((data, index) => {
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
                    width: '200px'
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
                      {`صدور: ${MomentFa(data?.create_date)}`}
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
                  gap: '4px',
                  height: '36px',
                  width: '100%',

                  background: 'white',
                  borderRadius: '4px'
                }}
              >
                <a
                  href={certificates?.file}
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
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#E6EBF0',
                      width: '120px',
                      borderRadius: '4px',
                      padding: '20px '
                    }}
                  >
                    <Download
                      style={{
                        color: '#00346D',
                        width: '15px',
                        height: '15px',
                        marginLeft: '3px'
                      }}
                    />
                    <InputLabel style={{ color: '#00346D' }}>دانلود</InputLabel>
                  </Box>
                </a>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
