import { Box, Divider, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Download } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Article from 'src/assets/img/article.png';
import DesignServices from 'src/assets/img/design_services.png';
import Domain from 'src/assets/img/domain.png';
import Location from 'src/assets/img/pin_drop.png';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import SwiperImg from './Swiper';
import Tune from 'src/assets/img/tune.png';
import Engineering from 'src/assets/img/engineering.png';

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
  const data = props.location.state.data;
  const type = props.location.state.type;
  const typeName = props.location.state.typeName;
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
                height: '450px',
                overflow: 'auto',
                marginTop: '20px',
                // position: 'absolute',
                bottom: '0%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  gap: '3px'
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
                    style={{ color: '#00346D', fontSize: '12px' }}
                  >
                    {`درخواست ${typeName}`}
                  </InputLabelHeader>
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
                      alignItems: 'center'
                    }}
                  >
                    <img src={Domain} />
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        color: '#335D8A'
                      }}
                    >
                      {data?.project?.name}
                    </InputLabel>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                      padding: '0px',
                      gap: '4px',
                      backgroundColor: JSON.parse(data?.project?.status?.data)
                        .back,
                      color: JSON.parse(data?.project?.status?.data).text,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      width: 'fit-content'
                    }}
                  >
                    <InputLabel
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        color: JSON.parse(data?.project?.status?.data).text
                      }}
                    >
                      {data?.status?.label}
                    </InputLabel>
                  </Box>
                  <Box sx={{ display: 'inline-flex', mt: 1 }}>
                    <img src={Location} style={{ marginLeft: '2px' }} />
                    <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                      {data?.project?.location?.city_name +
                        ` (${data?.project?.location?.province_name})`}
                    </InputLabel>
                  </Box>

                  <InputLabel
                    style={{
                      color: '#335D8A',
                      fontSize: '12px',
                      marginRight: '22px'
                    }}
                  >
                    {data?.project?.project_type.map(item => item.name + '/ ')}
                  </InputLabel>
                </Box>
              </Box>

              {type === 'design' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // border: '1px solid #CCD6E2',
                    // borderRadius: '4px',
                    padding: '5px',
                    width: '100%'
                  }}
                >
                  <Box sx={{ display: 'inline-flex', mt: 1 }}>
                    <img src={DesignServices} style={{ marginLeft: '2px' }} />
                    <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                      نوع طراحی
                    </InputLabel>
                  </Box>
                  <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                    <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                      {data?.design_type.map(item => item.name + '/ ')}
                    </InputLabel>
                  </Box>

                  <Box sx={{ display: 'inline-flex', mt: 1 }}>
                    <img src={Tune} style={{ marginLeft: '2px' }} />
                    <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                      نوع سیستم کنترل
                    </InputLabel>
                  </Box>
                  <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                    <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                      {data?.control?.label}
                    </InputLabel>
                  </Box>

                  <Box sx={{ display: 'inline-flex', mt: 1 }}>
                    <img src={Engineering} style={{ marginLeft: '2px' }} />
                    <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                      {data?.project?.designer_type?.label}
                    </InputLabel>
                  </Box>
                  {/* <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                <InputLabel style={{ color: '#335D8A', fontSize: '12px' }}>
                  شرکت
                </InputLabel>
              </Box> */}
                </Box>
              )}

              {type === 'bom' && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '5px',
                    width: '100%'
                  }}
                >
                  <Box sx={{ display: 'inline-flex', mt: 1 }}>
                    <img src={DesignServices} style={{ marginLeft: '2px' }} />
                    <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                      نوع سیستم
                    </InputLabel>
                  </Box>
                  <Box sx={{ display: 'inline-flex', mt: 0, ml: 3 }}>
                    <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                      {data?.design_type.map(item => item.name + '/ ')}
                    </InputLabel>
                  </Box>

                  <Box sx={{ display: 'inline-flex', mt: 1 }}>
                    <img src={Tune} style={{ marginLeft: '2px' }} />
                    <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                      نوع سیستم کنترل
                    </InputLabel>
                  </Box>
                  <Box sx={{ display: 'inline-flex', ml: 3 }}>
                    <InputLabel style={{ color: '#335D8A', fontSize: '14px' }}>
                      {data?.control?.label}
                    </InputLabel>
                  </Box>
                </Box>
              )}
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
            {data?.project?.files.length > 0 &&
              data?.project?.files.filter(f => f.subject.name === 'IMAGES')
                .length > 0 && <SwiperImg data={data?.project} />}
            <>
              {data?.project?.files.filter(f => f.subject.name !== 'IMAGES')
                .length > 0 &&
                data?.project?.files
                  .filter(f => f.subject.name !== 'IMAGES')
                  .map(item => {
                    return (
                      <a
                        href={item.url}
                        download
                        target="_blank"
                        style={{ textDecoration: 'none', width: '100%' }}
                      >
                        <ConfirmButton
                          style={{
                            color: '#6685A7',
                            backgroundColor: '#E6EBF0',
                            position: 'relative',
                            bottom: 0,
                            marginTop: '10px',
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Box sx={{ display: 'inline-flex' }}>
                            <img src={Article} />
                            <InputLabel style={{ color: '#6685A7' }}>
                              {item.subject.label}
                            </InputLabel>
                          </Box>
                          <Box sx={{ display: 'inline-flex' }}>
                            <Download
                              style={{
                                color: '#00346D',
                                width: '20px',
                                height: '20px',
                                marginLeft: '3px'
                              }}
                            />
                            <InputLabel style={{ color: '#00346D' }}>
                              دانلود
                            </InputLabel>
                          </Box>
                        </ConfirmButton>
                      </a>
                    );
                  })}
            </>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
