import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import httpService from 'src/utils/httpService';
import { API_BASE_URL } from 'src/utils/urls';
import InputLabelHeader from 'src/components/Mobile/InputLabel/InputLabelHeader';
import InputLabel from 'src/components/Mobile/InputLabel';
import ConfirmButton from 'src/components/Mobile/Button/Confirm';
import { useHistory } from 'react-router-dom';
import Domain from 'src/assets/img/domain.png';
import Location from 'src/assets/img/pin_drop.png';
import Construction from 'src/assets/img/construction.png';
import Package from 'src/assets/img/package.png';
import ManageAccount from 'src/assets/img/manage_accounts.png';
import useSaleOrder from 'src/hooks/useSaleOrder';
import SwiperImg from '../Desktop/Swiper';
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
export default function ProductDetailMobile(props) {
  // const data = props.location.state;
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [units, setUnits] = useState(null);
  const [count, setCount] = useState(0);
  const [unitSelected, setUnitSelected] = useState('SINGULAR');
  const { order, setOrder, getOrder } = useSaleOrder();
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  useEffect(() => {
    httpService
      .get(
        `${API_BASE_URL}/api/project/get_project?project_num=${props.location.state.project_num}`
      )
      .then(res => {
        setData(res.data);
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
    <>
      {data && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '50px',
            backgroundColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px 0px 5px',
              backgroundColor: '#E5E5E5',
              width: '130px',
              height: '130px',
              borderRadius: '4px'
            }}
          >
            {data.files && <SwiperImg data={data} />}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '20px',
              background: '#FFFFFF',
              borderRadius: '30px 30px 0px 0px',
              width: '100%',
              height: '450px',
              overflow: 'auto',
              marginTop: '20px',
              position: 'absolute',
              bottom: '0%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <InputLabelHeader
                  style={{ color: '#00346D', fontSize: '14px' }}
                >
                  {data?.name}
                </InputLabelHeader>
                {data.status.name === 'INITIAL' && (
                  <ConfirmButton
                    style={{ width: '100px', fontSize: '12px', padding: '0px' }}
                    onClick={() => {
                      history.push({
                        pathname: '/project/project/new/1',
                        state: data
                      });
                    }}
                  >
                    ویرایش پروژه
                  </ConfirmButton>
                )}
              </Box>
              <Box
                style={{
                  backgroundColor: '#DDF5F6',
                  padding: '4px',
                  borderRadius: '4px'
                }}
              >
                <InputLabel
                  style={{
                    fontWeight: 400,
                    fontSize: '10px',
                    color: '#335D8A'
                  }}
                >
                  {data?.status?.label}
                </InputLabel>
              </Box>
              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Location} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  {data?.location?.city_name +
                    ` (${data?.location?.province_name})`}
                </InputLabel>
              </Box>
              <InputLabel
                style={{
                  color: '#335D8A',
                  fontSize: '12px',
                  marginRight: '22px'
                }}
              >
                {data?.location?.address}
              </InputLabel>

              <Divider sx={{ color: '#D3D2D2' }} variant="middle" />

              <Box
                sx={{
                  border: '1px solid #CCD6E2',
                  borderRadius: '6px',
                  padding: '10px',
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    <img src={Domain} />
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#335D8A'
                      }}
                    >
                      {data?.building_type?.label}
                    </InputLabel>
                    <Box
                      style={{
                        backgroundColor: '#E6EBF0',
                        padding: '4px',
                        borderRadius: '4px'
                      }}
                    >
                      <InputLabel
                        style={{
                          fontWeight: 400,
                          fontSize: '10px',
                          color: '#335D8A'
                        }}
                      >{`${data?.area} متر مربع`}</InputLabel>
                    </Box>
                  </Box>
                  <Box
                    style={{
                      backgroundColor: '#DDF5F6',
                      padding: '4px',
                      borderRadius: '4px'
                    }}
                  >
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '10px',
                        color: '#335D8A'
                      }}
                    >{`${data?.project_state?.label}`}</InputLabel>
                  </Box>
                </Box>
                <InputLabel
                  style={{ color: '#335D8A', fontSize: '14px' }}
                >{`${data?.floor_count} طبقه - ${data?.unit_count} واحد`}</InputLabel>
              </Box>

              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Construction} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  نوع پروژه
                </InputLabel>
              </Box>
              <InputLabel
                style={{
                  color: '#335D8A',
                  fontSize: '12px',
                  marginRight: '22px'
                }}
              >
                {data?.project_type.map(item => item.name + '/ ')}
              </InputLabel>

              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={Package} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  محصولات
                </InputLabel>
              </Box>
              <InputLabel
                style={{
                  color: '#335D8A',
                  fontSize: '12px',
                  marginRight: '22px'
                }}
              >
                {data?.material_brand}
              </InputLabel>

              <Box sx={{ display: 'inline-flex', mt: 1 }}>
                <img src={ManageAccount} style={{ marginLeft: '2px' }} />
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  تامین کننده
                </InputLabel>
              </Box>
              <InputLabel
                style={{
                  color: '#335D8A',
                  fontSize: '12px',
                  marginRight: '22px'
                }}
              >
                {data?.supplier?.first_name + ' ' + data?.supplier?.last_name}
              </InputLabel>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
