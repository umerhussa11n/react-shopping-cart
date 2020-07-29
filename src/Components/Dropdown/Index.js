import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [curency, setCurrency] = React.useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-helper-label">Currency</InputLabel>
        <Select
          labelId="simple-select-helper-label"
          id="simple-select-helper"
          value={curency}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"USD"}>US Doller</MenuItem>
          <MenuItem value={"GBP"}>Pound Sterling</MenuItem>
          <MenuItem value={"INR"}>Indian Ruppes</MenuItem>
        </Select>
        <FormHelperText>Select the desired currency</FormHelperText>
      </FormControl>
    </div>
  );
}
