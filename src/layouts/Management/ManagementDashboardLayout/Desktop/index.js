import React from 'react';
import Drawer from './Drawer';
import makeStyles from '@mui/styles/makeStyles';

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

  return (
    <div>
      <Drawer {...props} />
      <div className={classes.wrapper}>{props.children}</div>
    </div>
  );
}
