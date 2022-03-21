import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  bottomSpace: {
    marginBottom: '30px',
  },

  form: {
    margin: '3%',
    flexDirection: 'column',
    display: 'flex',
    width: '90%',
  },

  spinner: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  multiFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  twoField: {
    width: '48%',
  },
});
