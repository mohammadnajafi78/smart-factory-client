import React, { useState } from 'react';
// import BottomBar from './BottomBar';
import TopBar from './TopBar';
import makeStyles from '@mui/styles/makeStyles';
import NavBar from './NavBar';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    paddingTop: 70,
    backgroundColor: '#E5E5E5',
    height: '100vh',
    // marginTop: 100,
    overflow: 'hidden'
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#fff'
  },
  paper: {
    borderRadius: '20px 20px 0px 0px',
    // zIndex: 999,
    position: 'fixed',
    bottom: 0
  }
}));

export default function ClubDashboardLayoutBackNoBottomMobile({ children }) {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div style={{ backgroundColor: '#E5E5E5' }}>
        <TopBar
          onMobileNavOpen={event => {
            setMobileNavOpen(true);
            // handleClick(event);
          }}
        />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{children}</div>
          </div>
        </div>
        {/* <BottomBar /> */}
      </div>
    </>
  );
}
