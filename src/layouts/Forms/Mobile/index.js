import React, { useState } from 'react';
// import BottomBar from './BottomBar';
import TopBar from './TopBar';
import makeStyles from '@mui/styles/makeStyles';
import NavBar from './NavBar';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  wrapper: {
    flex: '1 1 auto',
    paddingTop: 49,
    backgroundColor: '#E5E5E5'
  },
  contentContainer: {
    flex: '1 1 auto'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    // paddingBottom: '100px',
    width: '100%'
  },
  paper: {
    borderRadius: '20px 20px 0px 0px',
    position: 'fixed',
    bottom: 0
  }
}));

export default function FormsDashboardLayoutMobile(props) {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  let path1 = props.children.props.location.pathname.split('/')[1];
  let path2 = props.children.props.location.pathname.split('/')[2];

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div
        style={{
          backgroundColor:
            path1 === 'message' && path2 === undefined ? '#E5E5E5' : '#FFF',
          width: '100%',
          height: '100%'
        }}
      >
        <TopBar
          onMobileNavOpen={event => {
            setMobileNavOpen(true);
          }}
          openMobile={isMobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
          {...props}
        />
        {/* <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        /> */}
        <div
          className={classes.wrapper}
          style={{
            backgroundColor:
              path1 === 'message' && path2 === undefined ? '#E5E5E5' : '#FFF'
          }}
        >
          <div className={classes.contentContainer}>
            <div className={classes.content}>{props.children}</div>
          </div>
        </div>
        {/* <BottomBar /> */}
      </div>
    </>
  );
}
