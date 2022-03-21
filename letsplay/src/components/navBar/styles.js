import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },

  avatar: {
    backgroundColor: '#6E7582',
    cursor: 'pointer',
    marginTop: '40%',
  },

  appBar: {
    backgroundColor: '#046582',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarMargin: {
    marginRight: '50px',
  },
}));
