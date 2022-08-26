import React, { useState } from 'react';
import Drawer from './Drawer';
import makeStyles from '@mui/styles/makeStyles';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F2F7F7',
    height: '100vh',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    marginLeft: '290px'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    width: '40%',
    paddingLeft: '130px',
    justifyContent: 'center',
    height: '100vh',
    overflow: 'auto'
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white',
    paddingTop: 250
  },
  paper: {
    borderRadius: '20px 20px 0px 0px',
    position: 'fixed',
    bottom: 0
  }
}));

export default function ManagementDashboardLayoutDesktop(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <Drawer {...props} selected={selected} setSelected={setSelected} />
      <div className={classes.wrapper}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '20.25px 16px 18.5px 20px',
              gap: '32px',
              height: '60px',
              background: '#FFFFFF',
              borderBottom: '0.5px solid #CCD6E2',
              justifyContent: 'flex-start'
            }}
          >
            <InputLabelHeader
              style={{ color: '#00346D', fontWeight: 700, fontSize: '18px' }}
            >
              {selected?.title}
            </InputLabelHeader>
          </Box>
          <Box sx={{ p: '20px' }}>{props.children}</Box>
        </Box>
      </div>
    </div>
  );
}
