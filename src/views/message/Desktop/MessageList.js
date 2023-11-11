import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import FilterButton from 'src/components/Desktop/Button/Filter';
import MessageItem from './Item';
import { useHistory } from 'react-router-dom';
import InputLabel from 'src/components/Desktop/InputLabel';
import EmptyMessage from 'src/assets/img/icons/emptyMessage.svg';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import { useSnackbar } from 'notistack';

export default function MessageListDesktop({ selected, setSelected }) {
  const history = useHistory();
  const [messages, setMessages] = useState(null);
  const [all, setAll] = useState(selected);
  const [filters, setFilters] = useState(null);
  const [filterSelected, setFilterSelected] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function getAll() {
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
  }

  useEffect(() => {
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

  useEffect(() => {
    getAll();
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
          padding: '12px 12px 0px',
          width: '100%',
          padding: '40px 30px 0px',
          paddingBottom: '40px'
        }}
      >
        {/* <InputLabelHeader style={{ color: '#00346D' }}>
          جوایز دریافتی
        </InputLabelHeader> */}

        {all?.length > 0 ? (
          <>
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
                        else
                          setMessages(all.filter(f => f?.type?.id == item.id));
                      }}
                      style={{
                        backgroundColor:
                          filterSelected === item.id &&
                          'rgba(0, 170, 181, 0.04)'
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
              {messages.map((item, index) => {
                return (
                  <MessageItem
                    data={item}
                    key={index}
                    selected={selected}
                    setSelected={setSelected}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setFilterSelected={setFilterSelected}
                  />
                );
              })}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: '550px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <img src={EmptyMessage} width="112px" height="167px" />
            <InputLabel style={{ color: '#00346D' }}>
              شما پیامی ندارید
            </InputLabel>
          </Box>
        )}
      </Box>
    </>
  );
}
