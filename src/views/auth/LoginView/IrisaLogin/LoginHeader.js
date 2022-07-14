import React from 'react';
import irisaLogo from '../../../../assets/img/irisa.jpg';
import erp from '../../../../assets/img/ERP4-Color.png';
import { Box, alpha } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {},
  main: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    width: '100%',
    zIndex: '1',
    backgroundColor: alpha(theme.palette.background.default, 0.8),
    padding: '10px 10px 0px 10px',
    fontSize: '16px',
    display: 'flex',
    fontHeight: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.text.primary
  },
  image: {
    margin: '3px',
    marginLeft: '10px'
  }
}));

function LoginHeader() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.main}>
      <span>
        <img src={irisaLogo} width={'70px'} className={classes.image} />
      </span>
      <span>{t('login.header')}</span>
      <span>
        <img src={erp} width={'70px'} className={classes.image} />
      </span>
    </div>
  );
}

export default LoginHeader;
