import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

export const CustomButton = withStyles({
  root: {
    color: '#F9F7F7',
    backgroundColor: 'rgb(4, 101, 130)',
    '&:hover': {
      backgroundColor: 'rgb(4, 81, 105)',
    },
  },
})(Button);

export const CommentButton = withStyles({
  root: {
    color: '#F9F7F7',
    backgroundColor: 'rgb(4, 101, 130)',
    '&:hover': {
      backgroundColor: 'rgb(4, 81, 105)',
    },
    fontSize: '0.8rem',
  },
})(Button);

export const HeaderButton = withStyles({
  root: {
    color: '#3F72AF',
    border: 'solid 1px #3F72AF',
    '&:hover': {
      backgroundColor: '#DBE2EF',
      border: 'solid 1px #DBE2EF',
    },
    margin: '0px 20px',
    marginBottom: '10px',
    padding: '10px 20px',
  },
})(Button);

export const AccordionButton = withStyles({
  root: {
    color: '#3F72AF',
    margin: '0px 20px',
    padding: '10px 20px',
  },
})(Button);
