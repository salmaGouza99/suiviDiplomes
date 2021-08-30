import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import frLocale from "date-fns/locale/fr";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  input: {
    color: "white",
    paddingLeft: theme.spacing(1.8),
    marginBottom: theme.spacing(1),
    '&:hover': {
        background: "#3A7BAF",
    },
  }
});

function TodayDate({ classes, ...rest }) {
  const [date, changeDate] = useState(new Date());

  return (
      <MuiPickersUtilsProvider locale={frLocale} utils={DateFnsUtils}>
          <DatePicker
            //readOnly
            variant="inline"
            format="d MMM yyyy"
            //value={date}
            onChange={changeDate}
            style={{width: 125}}
            InputProps={{  disableUnderline: true, className: classes.input }}
          />
      </MuiPickersUtilsProvider>
  );
}

TodayDate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodayDate);