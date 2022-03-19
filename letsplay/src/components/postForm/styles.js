import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  twoFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomSpace: {
    marginBottom: '30px',
  },

  spinner: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  form: {
    marginTop: '60px',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
  },

  shortField: {
    width: '48%',
  },
});
