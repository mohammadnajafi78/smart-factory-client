import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Actions from './Actions';

const useStyles = makeStyles(theme => ({
  paper: {
    borderRadius: '20px 20px 0px 0px',
    zIndex: 999,
    position: 'fixed',
    bottom: 0,
    minHeight: '40%'
  }
}));
export default function ReceivedDetailMobile(props) {
  const data = props.location.state;
  const [path, setPath] = useState(props.location.pathname.split('/')[4]);

  useEffect(() => {
    setPath(path);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 0px',
          justifyContent: 'space-between',
          height: 'inherit',
          backgroundColor: 'white'
        }}
      >
        {<Actions {...props} data={data} />}
      </Box>
    </>
  );
}
