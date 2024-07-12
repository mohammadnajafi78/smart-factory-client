import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Smart from 'src/assets/img/smart.png';
import Smart2 from 'src/assets/img/smart2.png';
import Smart3 from 'src/assets/img/smart3.png';
import Smart4 from 'src/assets/img/smart4.svg';
import ThreeD from 'src/assets/img/3d_rotation.png';
import ShowChart from 'src/assets/img/show_chart.png';
import Logo from 'src/assets/img/Logo-Insertec-sin-fondo.png';
import Logo2 from 'src/assets/img/L-X-Logo.png';
import ViewIn from 'src/assets/img/view_in.png';
import Schema from 'src/assets/img/schema.png';
import Background from 'src/assets/img/Background-Pattern.jpg';
import { ArrowBack, History, PanToolAlt, Share } from '@mui/icons-material';
import { Clock, MoreHorizontal, Plus } from 'react-feather';
import UserBarChart from './UserBarChart';
import UserLineChart from './UserLineChart';
import ThreeDModel from './3D';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import UserPieChart from './UserPieChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Index() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('10');
  const [select, setSelect] = useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log('select', select);
  }, [select]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 40px'
        }}
      >
        <Box>
          <img src={Logo2} height={'60px'} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: '25px' }}>
            Smart Furnace Platform
          </Typography>
          <Typography sx={{ fontWeight: 400, fontSize: '16px' }}>
            Beta Version
          </Typography>
        </Box>

        <Box>
          <img src={Logo} height={'90px'} />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundSize: '15px',
          backgroundRepeat: 'repeat',
          padding: '30px 40px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '10px 20px'
          }}
        >
          <Box sx={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ArrowBack sx={{ fontSize: '20px' }} />
            </Box>
            {/* <Typography sx={{ fontWeight: 900, fontSize: '20px' }}>
              Equipment Title
            </Typography> */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ fontSize: '14px', fontWeight: 400 }}
              >
                Equipment Title
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Equipment Title"
                onChange={handleChange}
                defaultValue="10"
                sx={{
                  '&.MuiOutlinedInput-input': {
                    fontSize: '16px'
                  }
                }}
              >
                <MenuItem value={10} sx={{ fontSize: '16px' }}>
                  TMT Furance
                </MenuItem>
                <MenuItem value={20} disabled>
                  THD Furance
                </MenuItem>
                <MenuItem value={30} disabled>
                  CMD Furance
                </MenuItem>
                <MenuItem value={40} disabled>
                  IDEX
                </MenuItem>
                <MenuItem value={50} disabled>
                  Charging Machine
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#0d3579',
                color: 'white',
                padding: '8px 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Plus sx={{ fontSize: '20px' }} />
              Add data
            </Box>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Share sx={{ fontSize: '20px' }} />
              Share
            </Box>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <History sx={{ fontSize: '24px' }} />
            </Box>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <MoreHorizontal sx={{ fontSize: '20px' }} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
            mt: 2
          }}
        >
          <Box sx={{ display: 'inline-flex', gap: 1, alignItems: 'center' }}>
            <Typography
              sx={{ color: '#0d3579', fontWeight: 800, fontSize: '18px' }}
            >
              Real-time Data Monitoring{' '}
            </Typography>
            <Typography
              sx={{ color: '#676767', fontWeight: 500, fontSize: '16px' }}
            >
              |{' '}
            </Typography>
            <Typography
              sx={{ color: '#676767', fontWeight: 500, fontSize: '16px' }}
            >
              Energy Analyzer |{' '}
            </Typography>{' '}
            <Typography
              sx={{ color: '#676767', fontWeight: 500, fontSize: '16px' }}
            >
              Furance Camera Vision |{' '}
            </Typography>{' '}
            <Typography
              sx={{ color: '#676767', fontWeight: 500, fontSize: '16px' }}
            >
              Metal Efficiency |{' '}
            </Typography>{' '}
            <Typography
              sx={{ color: '#676767', fontWeight: 500, fontSize: '16px' }}
            >
              Predictive Maintenance |{' '}
            </Typography>{' '}
            <Typography
              sx={{ color: '#676767', fontWeight: 500, fontSize: '16px' }}
            >
              AI Tools{' '}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2, ml: '30px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  background: 'white',
                  pl: '10px',
                  borderRadius: '8px',
                  position: 'relative',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '40px',
                  left: '-30px',
                  border: '1px solid #eee'
                }}
              >
                <img src={ThreeD} width={'40px'} />
              </Box>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  px: 3,
                  height: '500px'
                }}
              >
                {/* <img src={Smart3} width={'500px'} /> */}
                <ThreeDModel />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={'0px'}>
            <Grid item xs={12}>
              <Box
                sx={{
                  background: 'white',
                  p: '10px',
                  borderRadius: '8px',
                  position: 'relative',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '40px',
                  left: '-30px',
                  border: '1px solid #eee'
                  // cursor: 'pointer'
                }}
                // onClick={handleClickOpen}
              >
                <img
                  src={Schema}
                  width={'40px'}
                  // style={{ cursor: 'pointer' }}
                  // onClick={handleClickOpen}
                />
              </Box>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  px: 3,
                  // cursor: 'pointer',
                  flexDirection: 'column'
                }}
                // onClick={handleClickOpen}
              >
                <img src={Smart2} width={'1100px'} />
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '20px',
                    mt: 2,
                    color: '#0d3579'
                  }}
                >
                  P&ID
                </Typography>
                <PanToolAlt
                  style={{
                    color: select.includes(0) ? 'red' : '#0d3579',
                    position: 'relative',
                    top: '-500px',
                    right: '0px',
                    fontSize: '50px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (select.includes(0)) {
                      const index = select.indexOf(0);
                      if (index > -1) {
                        if (select.indexOf(1) > -1) setSelect([1]);
                        else setSelect([]);
                      }
                    } else setSelect((prevState) => [...prevState, 0]);
                  }}
                />
                <PanToolAlt
                  style={{
                    color: select.includes(1) ? 'red' : 'blue',
                    position: 'relative',
                    top: '-150px',
                    right: '100px',
                    fontSize: '50px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (select.includes(1)) {
                      const index = select.indexOf(1);
                      if (index > -1) {
                        if (select.indexOf(0) > -1) setSelect([0]);
                        else setSelect([]);
                      }
                    } else setSelect((prevState) => [...prevState, 1]);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6} mt={'0px'}>
            <Grid item xs={6}>
              <Box
                sx={{
                  background: 'white',
                  px: '10px',
                  borderRadius: '8px',
                  position: 'relative',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '40px',
                  left: '-30px',
                  border: '1px solid #eee'
                }}
              >
                <img src={ShowChart} width={'40px'} />
              </Box>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  flexDirection: 'column',
                  px: 3
                }}
              >
                <UserLineChart select={select} />
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '20px',
                    mt: 2,
                    color: '#0d3579'
                  }}
                >
                  Furnace Operation Times
                </Typography>
                {/* <img src={Smart2} width={'500px'} /> */}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  background: 'white',
                  px: '10px',
                  borderRadius: '8px',
                  position: 'relative',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '40px',
                  left: '-30px',
                  border: '1px solid #eee'
                }}
              >
                <img src={ShowChart} width={'40px'} />
              </Box>
              <Box
                sx={{
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  flexDirection: 'column',
                  px: 3
                }}
              >
                {/* <UserBarChart /> */}
                <UserPieChart />
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '20px',
                    mt: 2,
                    color: '#0d3579'
                  }}
                >
                  Burners Information
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={'lg'}
      >
        <DialogTitle>{'P&ID'}</DialogTitle>
        <DialogContent>
          <img src={Smart2} width={'1000px'} height={'400px'} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
