import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  SvgIcon,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/lab';
import { Trash as TrashIcon } from 'react-feather';
import { useDispatch } from 'src/store';
import { createEvent, deleteEvent, updateEvent } from 'src/slices/calendar';
import { useTranslation } from 'react-i18next';
import jMoment from 'moment-jalaali';
// import JalaliUtils from '@date-io/jalaali';

const getInitialValues = (event, range) => {
  if (event) {
    return _.merge(
      {},
      {
        allDay: false,
        color: '',
        description: '',
        end: moment()
          .add(30, 'minutes')
          .toDate(),
        start: moment().toDate(),
        title: '',
        submit: null
      },
      event
    );
  }

  if (range) {
    return _.merge(
      {},
      {
        allDay: false,
        color: '',
        description: '',
        end: new Date(range.end),
        start: new Date(range.start),
        title: '',
        submit: null
      },
      event
    );
  }

  return {
    allDay: false,
    color: '',
    description: '',
    end: moment()
      .add(30, 'minutes')
      .toDate(),
    start: moment().toDate(),
    title: '',
    submit: null
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'IRANSans',
    fontSize: '14px'
  },
  confirmButton: {
    marginLeft: theme.spacing(2)
  }
}));

const AddEditEventForm = ({
  event,
  onAddComplete,
  onCancel,
  onDeleteComplete,
  onEditComplete,
  range
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const localSettings = localStorage.getItem('settings');

  let direction = null;
  if (localSettings && localSettings.length > 0) {
    direction = JSON.parse(localSettings)['direction'];
  } else {
    direction = 'rtl';
  }
  const [locale] = useState(direction === 'rtl' ? 'fa' : 'en-gb');
  if (direction === 'rtl') {
    jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  const isCreating = !event;

  const handleDelete = async () => {
    try {
      await dispatch(deleteEvent(event.id));
      onDeleteComplete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={getInitialValues(event, range)}
      validationSchema={Yup.object().shape({
        allDay: Yup.bool(),
        description: Yup.string().max(5000),
        end: Yup.date().when(
          'start',
          (start, schema) =>
            start &&
            schema.min(start, t('calendar.EndDateMustBeLaterThanStartDate'))
        ),
        start: Yup.date(),
        title: Yup.string()
          .max(255)
          .required(t('calendar.TitleIsRequired'))
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          const data = {
            allDay: values.allDay,
            description: values.description,
            end: values.end,
            start: values.start,
            title: values.title
          };

          if (event) {
            await dispatch(updateEvent(event.id, data));
          } else {
            await dispatch(createEvent(data));
          }

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar(t('calendar.CalendarUpdated'), {
            variant: 'success'
          });

          if (isCreating) {
            onAddComplete();
          } else {
            onEditComplete();
          }
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
        setFieldTouched,
        setFieldValue,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              {isCreating ? t('calendar.AddEvent') : t('calendar.EditEvent')}
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label={t('calendar.Title')}
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />
            <Box mt={2}>
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label={t('calendar.Description')}
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
              />
            </Box>
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.allDay}
                    name="allDay"
                    onChange={handleChange}
                  />
                }
                label={t('calendar.AllDay')}
              />
            </Box>
            {/* <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  fullWidth
                  inputVariant="outlined"
                  label={t('calendar.StartDate')}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={date =>
                    date ? date.format('jYYYY/jMM/jDD hh:mm A') : ''
                  }
                  name="start"
                  onClick={() => setFieldTouched('end')}
                  onChange={date => setFieldValue('start', date)}
                  value={values.start}
                  locale={locale}
                />
              </LocalizationProvider>
            </Box> */}
            {/* <Box mt={2}>
              <MuiPickersUtilsProvider utils={JalaliUtils} locale={locale}>
                <DateTimePicker
                  fullWidth
                  inputVariant="outlined"
                  label={t('calendar.EndDate')}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  labelFunc={date =>
                    date ? date.format('jYYYY/jMM/jDD hh:mm A') : ''
                  }
                  name="end"
                  onClick={() => setFieldTouched('end')}
                  onChange={date => setFieldValue('end', date)}
                  value={values.end}
                />
              </MuiPickersUtilsProvider>
            </Box> */}
            {Boolean(touched.end && errors.end) && (
              <Box mt={2}>
                <FormHelperText error>{errors.end}</FormHelperText>
              </Box>
            )}
          </Box>
          <Divider />
          <Box p={2} display="flex" alignItems="center">
            {!isCreating && (
              <IconButton onClick={() => handleDelete()} size="large">
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Box flexGrow={1} />
            <Button onClick={onCancel}>{t('calendar.Cancel')}</Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
              className={classes.confirmButton}
            >
              {t('calendar.Confirm')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

AddEditEventForm.propTypes = {
  event: PropTypes.object,
  onAddComplete: PropTypes.func,
  onCancel: PropTypes.func,
  onDeleteComplete: PropTypes.func,
  onEditComplete: PropTypes.func,
  range: PropTypes.object
};

AddEditEventForm.defaultProps = {
  onAddComplete: () => {},
  onCancel: () => {},
  onDeleteComplete: () => {},
  onEditComplete: () => {}
};

export default AddEditEventForm;
