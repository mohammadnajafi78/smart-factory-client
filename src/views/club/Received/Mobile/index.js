import React, { useState, useEffect } from 'react';
import { Box, Drawer } from '@mui/material';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import FilterButton from 'src/components/Mobile/Button/Filter';
import ReceivedItem from './Item';
import { useHistory } from 'react-router-dom';
import Scan from 'src/assets/img/icons/scan-qr.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { QrReader } from 'react-qr-reader';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedMobile() {
  const history = useHistory();
  const [received, setReceived] = useState(null);
  const [openScan, setOpenScan] = useState(null);
  const [scan, setScan] = useState(null);
  const [all, setAll] = useState(null);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const classes = useStyles();
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
    getData();
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

  function handleScan(data) {
    setScan(data);
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '14px 15px 6px',
          gap: '2px',
          position: 'sticky',
          top: '58px',
          // width: '385px',
          width: '100%',
          height: '57px',
          backgroundColor: '#E5E5E5',
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
                style={{ fontWeight: 300, fontSize: '12px', minWidth: 'auto' }}
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
            return <ReceivedItem data={item} key={index} />;
          })}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '9%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'white',
          height: '78px',
          padding: '10px'
        }}
      >
        <ConfirmButton
          style={{ margin: '0px 10px', backgroundColor: '#00346D' }}
          onClick={() => setOpenScan(true)}
        >
          <img src={Scan} style={{ marginLeft: '3px' }} />
          دریافت جایزه
        </ConfirmButton>
      </Box>
      <Drawer
        anchor={'bottom'}
        open={openScan}
        onClose={() => setOpenScan(false)}
        classes={{
          paper: classes.paper
        }}
      >
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
      </Drawer>
    </div>
  );
}
