import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '2%',
    width: '90%',
    height: '90%',
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
