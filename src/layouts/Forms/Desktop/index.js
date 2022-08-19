import React, { useState } from 'react';
import { Box } from '@mui/material';
import Drawer from './Drawer';
import makeStyles from '@mui/styles/makeStyles';
import TopBar from './TopBar';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    // flex: '1 1 auto',
    flexDirection: 'row',
    // marginRight: '120px',
    backgroundColor: '#F4F4F4',
    height: '100vh',
    overflow: 'hidden',
    justifyContent: 'center'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    // overflow: 'hidden'
    width: '40%',
    paddingLeft: '130px',
    justifyContent: 'center',
    height: '100vh',
    overflow: 'auto'
    // backgroundColor: '#F4F4F4'

    // alignItems: 'center'
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
    // overflow: 'auto'
  },
  paper: {
    borderRadius: '20px 20px 0px 0px',
    // zIndex: 999,
    position: 'fixed',
    bottom: 0
  }
  // leftContent: {
  //   backgroundColor: 'white',
  //   width: '100%',
  //   height: '100vh',
  //   paddingTop: 70
  // }
}));

export default function FormsDashboardLayoutDesktop(props) {
  const classes = useStyles();
  const history = useHistory();
  let path = history.location.pathname.split('/')[1];
  const [selected, setSelected] = useState(
    ['home', 'profile', 'message'].includes(path) ? +path : 'home'
  );
  return (
    <div>
      <Drawer selected={selected} setSelected={setSelected} {...props} />
      <div className={classes.wrapper}>
        <TopBar selected={selected} />
        {props.children}
      </div>
    </div>
  );
}
