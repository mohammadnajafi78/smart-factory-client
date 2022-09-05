import React from 'react';
// import makeStyles from '@mui/styles/makeStyles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import JalaliUtils from '@date-io/jalaali';
// import { IconButton, InputAdornment, TextField } from '@mui/material';
// import { PortableWifiOffSharp, Today } from '@mui/icons-material';
// import 'moment/locale/fa';
// import jMoment from 'moment-jalaali';
import PropTypes from 'prop-types';
import AdapterJalali from '@date-io/date-fns-jalali';
import { TextField } from '@mui/material';
import moment from 'jalali-moment';
// const useStyles = makeStyles(theme => ({
//   datePicker: {
//     '& + &': {
//       marginLeft: '10px'
//     }
//   },
//   inputIcons: {
//     fill: 'black',
//     cursor: 'pointer'
//   }
// }));
// jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export default function Datepicker(props) {
  //   const classes = useStyles();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterJalali}>
        <DatePicker
          mask="____/__/__"
          value={
            props.value
              ? moment
                  .from(
                    p2e(moment(props.value).format('YYYY/MM/DD')),
                    'fa',
                    'YYYY/MM/DD'
                  )
                  .locale('en')
              : new Date()
          }
          onChange={newValue => {
            props.onChange(newValue);
          }}
          renderInput={params => (
            <TextField
              {...params}
              sx={{
                background: '#F2F2F2'
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
}

Datepicker.propTypes = {
  onChange: PropTypes.func.isRequired
};
