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
import { useSnackbar } from 'notistack';

export default function ReceivedListDesktop({
  selected,
  setSelected,
  refresh,
  setRefresh
}) {
  const history = useHistory();
  const [received, setReceived] = useState(null);
  const [openScan, setOpenScan] = useState(null);
  const [all, setAll] = useState(null);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const [scan, setScan] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  function getData() {
    httpService
      .get(`${API_BASE_URL}/api/club/user_gifts/`)
      .then(res => {
        if (res.status === 200) {
          setReceived(res.data);
          setAll(res.data);
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
    httpService
      .get(`${API_BASE_URL}/api/club/gift_type/`)
      .then(res => {
        if (res.status === 200) {
          setFilters(res.data);
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

  useEffect(() => {
    getData();
  }, [refresh]);

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
          gap: '10px',
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
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '14px 15px 6px',
            gap: '10px',
            width: '100%',
            height: '57px',
            zIndex: 100,
            overflow: 'auto',
            minHeight: '70px'
          }}
        >
          {filters &&
            filters.map((item, index) => {
              return (
                <FilterButton
                  key={index}
                  onClick={() => {
                    setFilterSelected(item.id);
                    if (item.id == 1) setReceived(all);
                    else if (item.id != 4 && item.id != 1)
                      setReceived(
                        all.filter(f => f?.gift_data?.gift_type == item.id)
                      );
                    else setReceived(all.filter(f => !f?.gift_data?.gift_type));
                  }}
                  style={{
                    backgroundColor:
                      filterSelected === item.id && 'rgba(0, 170, 181, 0.04)',
                    minWidth: 'auto'
                  }}
                >
                  {item.translate}
                </FilterButton>
              );
            })}
        </Box>

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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0px 0px',
          gap: '14px',
          // height: '640px',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '0%',
            width: '35.6%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: '60px',
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
                            // alert('انتقال انجام شد');
                            getData();
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
