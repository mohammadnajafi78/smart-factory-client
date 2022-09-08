import React, { useState } from 'react';
import BottomBar from './BottomBar';
import TopBar from './TopBar';
import makeStyles from '@mui/styles/makeStyles';
import NavBar from './NavBar';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // display: 'flex',
    flex: '1 1 auto',
    // paddingTop: 49,
    backgroundColor: '#E5E5E5'
    // overflow: 'hidden'
  },
  contentContainer: {
    // display: 'flex',
    flex: '1 1 auto',
    marginTop: '16px'
    // overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    // paddingBottom: '100px',
    width: '100%'
    // overflow: 'auto'
  },
  paper: {
    borderRadius: '20px 20px 0px 0px',
    // zIndex: 999,
    position: 'fixed',
    bottom: 0
  }
}));

export default function ClubDashboardLayoutBackMobile({ children }) {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#E5E5E5',
          width: '100%',
          height: '100%'
        }}
      >
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
        <BottomBar />
      </div>
    </>
  );
}
