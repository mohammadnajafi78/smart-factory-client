import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Box, Button, Card, CardContent, Grid, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import wait from 'src/utils/wait';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'IRANSans'
  }
}));

const UserAddView = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        email: '',
        isVerified: false,
        name: '',
        family: '',
        phone: '',
        password: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t('user.MustBeAValidEmail'))
          .max(255)
          .required(t('Email is required')),
        hasDiscountedPrices: Yup.bool(),
        isVerified: Yup.bool(),
        name: Yup.string()
          .max(255)
          .required(t('Name is required')),
        family: Yup.string()
          .max(255)
          .required(t('Family is required')),
        phone: Yup.number(t('Phone must be number')),
        password: Yup.string('')
          .min(8, t('Password must contain at least 8 characters'))
          .required(t('Enter your password')),
        confirmPassword: Yup.string(t('Enter your password'))
          .required(t('Confirm your password'))
          .oneOf([Yup.ref('password')], t('Password does not match'))
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          // NOTE: Make API request
          await wait(500);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(t('User Added'), {
            variant: 'success',
            action: <Button>{t('See all')}</Button>
          });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
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
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label={t('user.FirstName')}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.family && errors.family)}
                    fullWidth
                    helperText={touched.family && errors.family}
                    label={t('user.LastName')}
                    name="family"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.family}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label={t('common.EmailAddress')}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label={t('common.PhoneNumber')}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label={t('user.Password')}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    variant="outlined"
                    type="password"
                    required
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label={t('user.ConfirmPassword')}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    variant="outlined"
                    type="password"
                    required
                  />
                </Grid>
                <Grid item />
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t('user.AddUser')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

UserAddView.propTypes = {
  className: PropTypes.string
};

export default UserAddView;
