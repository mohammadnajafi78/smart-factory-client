import React, { useRef, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch } from 'src/store';
import HomeIcon from 'src/assets/img/icons/home.svg';
import Icon from 'src/components/Mobile/Icon';

const useStyles = makeStyles(theme => ({
  popover: {
    width: 320,
    padding: theme.spacing(2)
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: {
    whiteSpace: 'nowrap'
  }
}));

const Home = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    history.push('/home');
  };

  return (
    <>
      <Tooltip title="خانه">
        <IconButton
          onClick={handleClick}
          ref={ref}
          size="large"
          style={{
            background: '#FFFFFF',
            boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
            borderRadius: ' 6px',
            width: '49px',
            height: '44px'
          }}
        >
          <Icon src={HomeIcon} alt="home" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Home;
