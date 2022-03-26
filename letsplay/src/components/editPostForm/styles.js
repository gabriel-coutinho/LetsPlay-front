import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    margin: 'auto',
    marginBottom: '1%',
    backgroundColor: '#BB8082',
  },

  multiFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomSpace: {
    marginBottom: '30px',
  },

  bottomSpaceButton: {
    marginBottom: '1%',
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

  twoField: {
    width: '48%',
  },

  threeField: {
    width: '32%',
  },

  largeField: {
    width: '80%',
  },

  shortField: {
    width: '17%',
  },
});
