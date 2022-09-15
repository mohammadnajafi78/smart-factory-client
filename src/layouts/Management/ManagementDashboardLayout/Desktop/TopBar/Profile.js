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
import ProfileIcon from 'src/assets/img/icons/profile.svg';
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

const Profile = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    // setOpen(true);
    history.push('/profile');
  };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  //   useEffect(() => {
  //     dispatch(getContacts());
  //   }, [dispatch]);

  return (
    <>
      <Tooltip title="پروفایل">
        <IconButton
          //   color="inherit"
          onClick={handleClick}
          ref={ref}
          size="large"
          style={{
            width: '49px',
            height: '44px'
          }}
        >
          <Icon src={ProfileIcon} alt="home" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Profile;
