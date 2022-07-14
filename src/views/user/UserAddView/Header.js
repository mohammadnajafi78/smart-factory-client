import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'IRANSans'
  }
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const localSettings = localStorage.getItem('settings');

  let direction = null;
  if (localSettings && localSettings.length > 0) {
    direction = JSON.parse(localSettings)['direction'];
  } else {
    direction = 'rtl';
  }

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Breadcrumbs
        separator={
          direction === 'ltr' ? (
            <NavigateNextIcon fontSize="small" />
          ) : (
            <NavigateBeforeIcon fontSize="small" />
          )
        }
        aria-label="breadcrumb"
      >
        <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
          {t('common.Dashboard')}
        </Link>
        <Link
          variant="body1"
          color="inherit"
          to="/app/management"
          component={RouterLink}
        >
          {t('Management')}
        </Link>
        <Typography variant="body1" color="textPrimary">
          {t('Users')}
        </Typography>
      </Breadcrumbs>
      <Typography variant="h3" color="textPrimary">
        {t('Add User')}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
