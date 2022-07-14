import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, Hidden, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useAuth from 'src/hooks/useAuth';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    backgroundColor: theme.palette.common.white
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            variant="overline"
            color="textSecondary"
          >
            {t('Overview')}
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            {t('Good Morning')}
            {' '}
            {user.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >

          </Typography>

        </Grid>
        <Hidden mdDown>
          <Grid
            item
            md={6}
          >
            <img
              alt="Cover"
              className={classes.image}
              src="/static/images/undraw_growth_analytics_8btt.svg"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
