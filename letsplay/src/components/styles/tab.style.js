import { Tabs, withStyles } from '@material-ui/core';

export const CustomTabs = withStyles({
  root: {
    '&:hover': {
      opacity: 1,
    },
    '&$selected': {
      color: '#15131',
    },
    '&:focus': {
      color: '#0000000',
    },
  },
  indicator: {
    backgroundColor: '#046582',
  },
})(Tabs);
