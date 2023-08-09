import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import { Download, Plus } from 'react-feather';
import {Box} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DownloadIcon from '@mui/icons-material/FileDownload';

export default function FilesMenu({ data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <ConfirmButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        لیست دانلودها
      </ConfirmButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {
          data?.map((item, index) => {
            return (
              <a
                href={item.url}
                download
                target="_blank"
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <ListItem
                  //   style={style}
                  //   key={index}
                  // component="div"
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <DownloadIcon sx={{width: '24px', marginLeft: '4px', color: 'rgb(0, 52, 109)'}}/>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ color: 'rgb(0, 52, 109)' }}
                    />
                  </ListItemButton>
                </ListItem>
              </a>
            );}
            )}
        </Box>
      </Popover>
    </div>
  );
}
