import { TextField, withStyles } from '@material-ui/core';

export const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#6E7582',
    },
    '& p.MuiFormHelperText-root': {
      color: '#F9F7F7',
      fontSize: '15px',
    },
    '& p.Mui-focused': {
      color: '#112D4E',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#112D4E',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6E7582',
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
    },
  },
})(TextField);

export const FormTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#F39189',
    },
    '& p.Mui-focused': {
      color: '#F39189',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#BB8082',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#BB8082',
      },
      '&:hover fieldset': {
        borderColor: '#BB8082',
      },
    },
  },
})(TextField);
