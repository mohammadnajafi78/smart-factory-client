import React, { useRef, useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Avatar,
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import { Home as HomeIcon } from 'react-feather';
import { useDispatch, useSelector } from 'src/store';
// import { getContacts } from 'src/slices/chat';
// import OnlineIndicator from 'src/components/OnlineIndicator';
import MessageIcon from 'src/assets/img/icons/message.svg';
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

const Message = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);
  const { History } = useHistory();

  const handleClick = () => {
    // setOpen(true);
    History.push('/app/home');
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  //   useEffect(() => {
  //     dispatch(getContacts());
  //   }, [dispatch]);

  return (
    <>
      <Tooltip title="Home">
        <IconButton
          //   color="inherit"
          onClick={handleClick}
          ref={ref}
          size="large"
          style={{
            background: '#FFFFFF',
            boxShadow: '1px 1px 6px rgba(201, 201, 201, 0.25)',
            borderRadius: ' 6px',
            width: '49px',
            height: '44px'
            // margin: '5px'
          }}
        >
          <Icon src={MessageIcon} alt="home" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Message;
