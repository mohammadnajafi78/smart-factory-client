import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
// Button,
CssBaseline, Grid, Box, alpha, FormHelperText
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Close,
  Person,
  PersonAdd,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import slide1 from 'src/assets/img/erp01.jpg';
import slide2 from 'src/assets/img/erp02.jpg';
import slide3 from 'src/assets/img/erp03.jpg';
import slide4 from 'src/assets/img/erp04.jpg';
// import slide5 from 'src/assets/img/05.jpg';
// import slide6 from 'src/assets/img/06.jpg';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import LoginFooter from './LoginFooter';
import LoginHeader from './LoginHeader';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from 'src/hooks/useAuth';
import { Alert } from '@mui/material';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {},
  disabledButton: {
    backgroundColor: theme.palette.secondary
  },
  customCard: {
    backgroundColor: alpha(theme.palette.background.default, 0.33)
  },
  alert: {
    backgroundColor: alpha(theme.palette.text.primary, 0.63),
    color: theme.palette.background.default
  },
  signInSideBar: {
    width: '145px',
    height: '40px',
    background: 'rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    position: 'fixed',
    top: '185px',
    color: '#fff',
    borderRadius: '0px 50px 50px 0px',
    cursor: 'pointer',
    left: '-110px',
    textAlign: 'left',
    paddingLeft: '23px',
    float: 'right',
    paddingTop: '6px',
    transition: 'right 2s ease-in-out 1s',
    '&:hover': {
      transition: 'right 2s  ease-in-out 1s',
      left: '-25px',
      marginLeft: '10px'
    }
  },
  signInTitle: {
    color: theme.palette.background.default,
    padding: '12px'
  },
  signInHeader2: {
    backgroundColor: alpha(theme.palette.text.primary, 0.73),
    textAlign: 'center',
    padding: '5px'
  },
  signInCardContent: {
    padding: '15px 30px 0px !important !important'
  },
  main: {
    '@media screen and (min-width: 960px)': {
      width: 800
    },
    '@media screen and (max-width: 460px)': {
      width: '100%'
    },
    display: 'block', // Fix IE 11 issue.
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%'
  },
  closeBtn: {
    fill: theme.palette.background.default,
    fontSize: '15px'
  },
  customText: {
    backgroundColor: alpha('#F00', 0.8),
    color: 'white !important',
    textAlign: 'center',
    padding: '15px',
    fontSize: '12px !important',
    borderRadius: '5px'
  },
  inputIcons: {
    fill: theme.palette.text.secondary,
    cursor: 'pointer'
  },
  loginBtn: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Transition = (props) => {
  return (
    <Slide
      direction={
        localStorage.getItem('settings')['direction'] == 'rtl'
          ? 'left'
          : 'right'
      }
      {...props}
    />
  );
};
const tutorialSteps = [
  {
    label: '',
    imgPath: slide1
  },
  {
    label: '',
    imgPath: slide2
  },
  {
    label: '',
    imgPath: slide3
  },
  {
    label: '',
    imgPath: slide4
  }
];

function SignIn(props) {
  const classes = useStyles();
  const { login } = useAuth();
  const { t } = useTranslation();

  const className = props;
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [randNum, setRandNum] = useState(0);

  useEffect(() => {
    setRandNum(Math.floor(Math.random() * 4));
  }, []);

  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundImage: `url(${tutorialSteps[randNum].imgPath})`,
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {!open && (
        <div className={classes.signInSideBar} onClick={handleOpen}>
          <span
            style={{
              fontSize: '12px',
              verticalAlign: 'top',
              paddingLeft: '10px',
              paddingRight: '2px',
              lineHeight: '2',
              marginLeft:
                localStorage.getItem('settings') &&
                JSON.parse(localStorage.getItem('settings'))['direction'] ===
                  'ltr'
                  ? '45px'
                  : '0px'
            }}
          >
            {t('login.login')}
          </span>
          <PersonAdd />
        </div>
      )}
      <LoginHeader />
      <main className={classes.main}>
        <CssBaseline />
        <div>
          <Grid container justifyContent="center">
            <Slide
              direction={
                localStorage.getItem('settings')
                  ? JSON.parse(localStorage.getItem('settings'))[
                      'direction'
                    ] === 'ltr'
                    ? 'right'
                    : 'left'
                  : 'left'
              }
              in={open}
              timeout={1000}
            >
              <Card
                style={{
                  //   backgroundColor: 'rgba(255, 255, 255, 0.73)',
                  border: '1px solid rgba(0, 0, 0, 0.22)',
                  width: '422px'
                }}
                className={classes.customCard}
              >
                <CardHeader
                  title={t('translations:login.loginTitle')}
                  action={
                    <IconButton aria-label="settings" size="large">
                      <Close
                        onClick={handleClose}
                        className={classes.closeBtn}
                      />
                    </IconButton>
                  }
                  className={classes.signInHeader2}
                  classes={{
                    title: classes.signInTitle
                  }}
                />

                <CardContent
                  classes={{
                    root: classes.signInCardContent
                  }}
                >
                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                      submit: null
                    }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.username) {
                        errors.username = 'نام کاربری اجباری می باشد';
                      }
                      if (!values.password) {
                        errors.password = 'کلمه عبور اجباری می باشد';
                      }
                      return errors;
                    }}
                    onSubmit={async (values, { setErrors, setSubmitting }) => {
                      try {
                        await login(values.username, values.password);
                        setSubmitting(false);
                      } catch (err) {
                        setErrors({
                          submit: t('login.validation')
                        });
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({
                      errors,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      touched,
                      values
                    }) => (
                      <form
                        noValidate
                        onSubmit={handleSubmit}
                        className={clsx(classes.root, className)}
                      >
                        {errors.submit && (
                          <Box mt={2}>
                            <FormHelperText
                              className={classes.customText}
                              error
                            >
                              {errors.submit}
                            </FormHelperText>
                          </Box>
                        )}
                                                                   
                        <TextField
                          error={Boolean(touched.username && errors.username)}
                          fullWidth
                          // helperText={touched.username && errors.username}
                          name="username"
                          label={t('login.username')}
                          variant="outlined"
                          type="text"
                          value={values.username}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <IconButton edge="end" size="large">
                                <Person className={classes.inputIcons} />
                              </IconButton>
                            )
                          }}
                        />
                                                                   
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          // helperText={touched.password && errors.password}
                          name="password"
                          label={t('login.password')}
                          variant="outlined"
                          type={passwordVisibility ? 'text' : 'password'}
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={() =>
                                  setPasswordVisibility(!passwordVisibility)
                                }
                                edge="end"
                                size="large">
                                {passwordVisibility ? (
                                  <Visibility className={classes.inputIcons} />
                                ) : (
                                  <VisibilityOff
                                    className={classes.inputIcons}
                                  />
                                )}
                              </IconButton>
                            )
                          }}
                        />
                                         
                        <Box>
                          <Button
                            color="secondary"
                            disabled={isSubmitting}
                            fullWidth
                            // size="large"
                            type="submit"
                            variant="contained"
                            className={classes.loginBtn}
                          >
                            {t('login.login')}
                          </Button>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </CardContent>

                <Box mt={1}>
                  <Alert severity="info" className={classes.alert}>
                    <div>
                      Use <b>demo@irisaco.com</b> and password{' '}
                      <b>Password123</b>
                    </div>
                  </Alert>
                </Box>
              </Card>
            </Slide>
          </Grid>
        </div>
      </main>
      <LoginFooter />
    </div>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withRouter(SignIn);
