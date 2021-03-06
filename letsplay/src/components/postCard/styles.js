import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
    marginTop: '3%',
    backgroundColor: '#046582',
  },
  media: {
    height: 0,
    paddingTop: '12%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  colorSecondary: {
    color: 'textSecondary',
  },
  avatar: {
    backgroundColor: '#6E7582',
  },
}));
