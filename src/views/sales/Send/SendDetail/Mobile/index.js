import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Actions from './Actions';
import { Box } from '@mui/material';

export default function SendDetailMobile(props) {
  const data = props.location.state;
  const [path, setPath] = useState(props.location.pathname.split('/')[4]);

  useEffect(() => {
    setPath(path);
  }, []);

  return (
    <>
      {
        <Box
          sx={{
            padding: '65px 0px 14px',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-between',
            height: 'inherit',
            backgroundColor: 'white'
          }}
        >
          <Actions {...props} data={data} />
        </Box>
      }
    </>
  );
}
