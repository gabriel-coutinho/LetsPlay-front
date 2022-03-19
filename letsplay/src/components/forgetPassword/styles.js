import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  bottomSpace: {
    marginBottom: '30px',
  },

  center: {
    alignSelf: 'center',
  },

  spinner: {
    width: 'fit-content',
    heigh: 'fit-content',
    margin: '20px auto',
    color: 'rgb(4, 81, 105)',
  },

  form: {
    marginTop: '60px',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
  },
});
