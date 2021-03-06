import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  bottomSpace: {
    marginBottom: '30px',
  },

  spinner: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  form: {
    margin: '3%',
    flexDirection: 'column',
    display: 'flex',
    width: '90%',
  },

  multiFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  twoField: {
    width: '48%',
  },

  cancelButton: {
    backgroudColor: '#e61919',
  },
});
