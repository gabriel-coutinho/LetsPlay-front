import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginBottom: '1%',
    backgroundColor: '#BB8082',
  },
  labelIcon: {
    display: 'flex',
  },
  media: {
    height: 0,
    paddingTop: '12%', // 16:9
  },
  a: {
    cursor: 'pointer',
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
  gray: {
    backgroundColor: '#6E7582',
  },
}));
