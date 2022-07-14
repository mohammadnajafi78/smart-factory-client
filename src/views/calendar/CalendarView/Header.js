import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Breadcrumbs, Button, Grid, Link, SvgIcon, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  }
}));

const Header = ({ className, onAddClick, ...rest }) => {
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
    <Grid
      className={clsx(classes.root, className)}
      container
      justifyContent="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
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
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            {t('common.Dashboard')}
          </Link>
          <Typography variant="body1" color="textPrimary">
            {t('calendar.Calendar')}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          {t('calendar.HereIsWhatYouPlanned')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={onAddClick}
          className={classes.action}
          startIcon={
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          {t('calendar.NewEvent')}
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onAddClick: PropTypes.func
};

Header.defaultProps = {
  onAddClick: () => {}
};

export default Header;
