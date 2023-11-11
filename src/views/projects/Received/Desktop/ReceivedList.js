import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FilterButton from 'src/components/Desktop/Button/Filter';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import ReceivedItem from './ReceivedItem';
import { useSnackbar } from 'notistack';

export default function ReceivedListDesktop({
  selected,
  setSelected,
  type,
  typeName,
  setType,
  setTypeName
}) {
  const [received, setReceived] = useState();
  const [filters, setFilters] = useState([{ name: 'DESIGN', label: 'طراحی' }]);
  const [filterSelected, setFilterSelected] = useState('DESIGN');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setType(filterSelected.toLowerCase());
    setTypeName(filters.filter(f => f.name === filterSelected)[0].label);
    setSelected(null);
    httpService
      .get(
        `${API_BASE_URL}/api/project/get_sent_request/?type=${filterSelected}`
      )
      .then(res => {
        if (res.status === 200) {
          setReceived(res.data);
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
  }, [filterSelected]);

  useEffect(() => {
    httpService
      .get(`${API_BASE_URL}/api/project/get_project_actions`)
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

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'sticky',
          top: '25px',
          zIndex: 999,
          gap: '5px',
          padding: '10px 20px',
          background: '#eee'
        }}
      >
        <InputLabelHeader style={{ color: '#00346D' }}>
          دریافتی ها
        </InputLabelHeader>
        {/* <ConfirmButton
            style={{
              margin: '0px 10px',
              backgroundColor: '#00346D',
              width: '170px',
              fontSize: '13px'
            }}
            onClick={() => history.push('/project/Received/new')}
          >
            <img src={DomainAdd} style={{ marginLeft: '3px' }} />
            ثبت درخواست جدید
          </ConfirmButton> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2px',
            // position: 'sticky',
            // top: '55px',
            width: '100%',
            // height: '57px',
            zIndex: 100,
            overflow: 'auto'
          }}
        >
          {filters &&
            filters.map((item, index) => {
              return (
                <FilterButton
                  key={index}
                  onClick={() => {
                    setFilterSelected(item.name);
                  }}
                  style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    minWidth: 'auto'
                  }}
                >
                  {item.label}
                </FilterButton>
              );
            })}
        </Box>
      </Box>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0px 60px',
            gap: '14px',
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
                  type={type}
                  typeName={typeName}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
