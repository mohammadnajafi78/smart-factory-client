import React from 'react';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {},
  main: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.44)',
    color: '#fff',
    padding: '15px',
    fontSize: '12px',
    fontHeight: 400,
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function LoginFooter() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.main}>
      <span>{t('login.footer')}</span>
      <span>{'Copyright ©2019-2020 by IRISA Company all rights reserved'}</span>
    </div>
  );
}

export default LoginFooter;
