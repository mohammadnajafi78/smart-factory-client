import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import FilterButton from 'src/components/Desktop/Button/Filter';
import ReceivedItem from './Item';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import Scan from 'src/assets/img/icons/scan-qr.svg';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import CustomizedDialogs from 'src/components/Desktop/Dialog';
import { QrReader } from 'react-qr-reader';

export default function ReceivedListDesktop({ selected, setSelected }) {
  const history = useHistory();
  const [received, setReceived] = useState(null);
  const [openScan, setOpenScan] = useState(null);
  const [scan, setScan] = useState(null);

  useEffect(() => {
    httpService.get(`${API_BASE_URL}/api/club/user_gifts/`).then(res => {
      if (res.status === 200) {
        setReceived(res.data);
      }
    });
  }, []);
  function handleScan(data) {
    setScan(data);
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          padding: '12px 12px 0px',
          gap: '20px',
          width: '100%',
          padding: '40px 30px 0px',
          paddingBottom: '40px'
        }}
      >
        <InputLabelHeader style={{ color: '#00346D' }}>
          جوایز دریافتی
        </InputLabelHeader>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0px 60px',
            gap: '14px',
            // height: '1000px',
            overflowY: 'auto'
          }}
        >
          {received &&
            received.map((item, index) => {
              return (
                <ReceivedItem
                  data={item}
                  key={index}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0%',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          height: '79px',
          // padding: '10px',
          gap: '10px',
          padding: '0px 30px 0px'
        }}
      >
        <ConfirmButton
          style={{
            margin: '0px 10px',
            backgroundColor: '#00346D',
            width: '70%'
          }}
          onClick={() => setOpenScan(true)}
        >
          <img src={Scan} style={{ marginLeft: '3px' }} />
          دریافت جایزه
        </ConfirmButton>
      </Box>

      <CustomizedDialogs
        open={openScan}
        handleClose={() => setOpenScan(false)}
        title={'بارکد'}
        content={
          <Box sx={{ width: '300px', height: '300px' }}>
            <QrReader
              delay={100}
              //style={previewStyle}
              onError={handleError}
              onScan={handleScan}
              onResult={(result, error) => {
                if (result) {
                  if (result) {
                    if (result.text) {
                      setScan(result.text);
                      setOpenScan(false);
                      httpService
                        .post(
                          `${API_BASE_URL}/api/club/user_gifts/transfer_gift/`,
                          {
                            qr_code: result.text
                          }
                        )
                        .then(res => {
                          if (res.status === 200) {
                            alert('انتقال انجام شد');
                          }
                        });
                    }
                  }
                  console.log('result scan', result);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              constraints={{
                facingMode: 'environment'
              }}
            />
            <p>{scan}</p>
          </Box>
        }
      />
    </>
  );
}
