import React, { useRef, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Avatar, Box, ButtonBase, Hidden, Menu, MenuItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useAuth from 'src/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

const Account = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const { user, logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      localStorage.removeItem('settings');
      //change for redirect to logout
      history.push('/login');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  return <>
    <Box
      display="flex"
      alignItems="center"
      component={ButtonBase}
      onClick={handleOpen}
      ref={ref}
    >
      {/*<Avatar alt="User" className={classes.avatar} src={user.avatar} />*/}
      <Avatar className={classes.avatar} src={user.avatar} />
      <Hidden mdDown>
        <Typography variant="h6" color="inherit">
          {user.name}
        </Typography>
      </Hidden>
    </Box>
    <Menu
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      keepMounted
      PaperProps={{ className: classes.popover }}
      getContentAnchorEl={null}
      anchorEl={ref.current}
      open={isOpen}
    >
      <MenuItem component={RouterLink} to="/app/social/profile">
        {t('common.Profile')}
      </MenuItem>
      <MenuItem component={RouterLink} to="/app/account">
        {t('common.Account')}
      </MenuItem>
      <MenuItem onClick={handleLogout}>{t('common.Logout')}</MenuItem>
    </Menu>
  </>;
};

export default Account;
