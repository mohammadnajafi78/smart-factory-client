import jMoment from "moment-jalaali";
import React from "react";
// import JalaliUtils from "@date-io/jalaali";
// import {DateTimePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";


jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function PersianDatePickerWrapper(props) {
  const {onClick, onChange, name ,label, value, locale} = props;

  return (
    // <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
    //   <DateTimePicker
    //     label={label}
    //     name={name}
    //     onClick={onClick}
    //     onChange={onChange}
    //     value={value}
    //     locale={locale}
    //   />
    // </MuiPickersUtilsProvider>
  );
}

export default PersianDatePickerWrapper;
