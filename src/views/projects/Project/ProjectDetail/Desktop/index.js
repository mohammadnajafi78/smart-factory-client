import { Box, Divider, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import Construction from 'src/assets/img/construction.png';
import Domain from 'src/assets/img/domain.png';
import ManageAccount from 'src/assets/img/manage_accounts.png';
import Package from 'src/assets/img/package.png';
import Location from 'src/assets/img/pin_drop.png';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import SwiperImg from './Swiper';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ProjectDetailDesktop(props) {
  const data = props.data;
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={8} item>
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
                overflow: 'auto'
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
                  {data?.status.name === 'INITIAL' && (
                    <ConfirmButton
                      style={{
                        width: '100px',
                        fontSize: '12px',
                        padding: '0px'
                      }}
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
                  {data?.project_type?.map(item => item.name + '/ ')}
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
          </Grid>
          <Grid
            xs={4}
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              mt: '20px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D', fontSize: '14px' }}>
              ضمائم
            </InputLabelHeader>
            {data.files.length > 0 &&
              data.files.filter(f => f.subject.name === 'IMAGES').length >
                0 && <SwiperImg data={data} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
