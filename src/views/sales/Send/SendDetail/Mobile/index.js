import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Actions from './Actions';

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
