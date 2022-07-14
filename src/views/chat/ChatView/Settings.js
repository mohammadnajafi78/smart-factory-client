import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, IconButton, SvgIcon, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Settings as SettingsIcon,
  Edit as EditIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const Settings = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Chats
      </Typography>
      <Box flexGrow={1} />
      <IconButton size="large">
        <SvgIcon fontSize="small">
          <SettingsIcon />
        </SvgIcon>
      </IconButton>
      <IconButton component={RouterLink} to="/app/chat/new" size="large">
        <SvgIcon fontSize="small">
          <EditIcon />
        </SvgIcon>
      </IconButton>
    </div>
  );
};

Settings.propTypes = {
  className: PropTypes.string
};

export default Settings;
