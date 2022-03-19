import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#6E7582',
    cursor: 'pointer',
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
