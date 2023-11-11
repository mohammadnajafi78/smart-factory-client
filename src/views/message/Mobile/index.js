import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Mobile/Button/Filter';
import ReceivedItem from './Item';
import { useHistory } from 'react-router-dom';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import makeStyles from '@mui/styles/makeStyles';
import EmptyMessage from 'src/assets/img/icons/emptyMessage.svg';
import InputLabel from 'src/components/Mobile/InputLabel';
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
export default function MessageMobile() {
  const history = useHistory();
  const [messages, setMessages] = useState(null);
  const [openScan, setOpenScan] = useState(null);
  const [scan, setScan] = useState(null);
  const [all, setAll] = useState(null);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/message/`)
      .then(res => {
        if (res.status === 200) {
          setMessages(res.data);
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

    httpService
      .get(`${API_BASE_URL}/api/message/type/`)
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
    <>
      {all?.length > 0 ? (
        <>
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
              zIndex: 100
            }}
          >
            {filters &&
              filters.map((item, index) => {
                return (
                  <FilterButton
                    key={index}
                    onClick={() => {
                      setFilterSelected(item.id);
                      if (item.id == 1) setMessages(all);
                      else setMessages(all.filter(f => f?.type?.id == item.id));
                    }}
                    style={{
                      fontWeight: 300,
                      fontSize: '12px',
                      backgroundColor:
                        filterSelected === item.id && 'rgba(0, 170, 181, 0.04)'
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
            {messages &&
              messages.map((item, index) => {
                return <ReceivedItem data={item} key={index} />;
              })}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <img src={EmptyMessage} width="112px" height="167px" />
          <InputLabel style={{ color: '#00346D' }}>شما پیامی ندارید</InputLabel>
        </Box>
      )}

      {/* <Box
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
      </Drawer> */}
    </>
  );
}
