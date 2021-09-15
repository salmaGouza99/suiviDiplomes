import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import frLocale from "date-fns/locale/fr";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  input: {
    color: "white",
    paddingLeft: theme.spacing(1.2),
    marginBottom: theme.spacing(1),
    '&:hover': {
        background: "#670c68",
    },
    borderRadius: 10
  },
  datePicker: {
    '& .MuiPickersModal-dialog': {
      headerColor: 'red'
    }
  }
});

function TodayDate({ classes, ...rest }) {
  // State
  const [date, changeDate] = useState(new Date());

  return (
      <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
          {/* fix the date of DatePicker in today date to show it in the header component */}
          <DatePicker
            variant="inline"
            format="d MMM yyyy"
            onChange={changeDate}
            style={{width: 117}}
            DialogProps={{ className: classes.datePicker }}
            InputProps={{  disableUnderline: true, className: classes.input }}
          />
      </MuiPickersUtilsProvider>
  );
}

TodayDate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodayDate);