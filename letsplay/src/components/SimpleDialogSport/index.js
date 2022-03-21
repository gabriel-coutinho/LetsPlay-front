import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, sports } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Escolha um esporte</DialogTitle>
      <List>
        {sports.map((sport) => (
          <ListItem button onClick={() => handleListItemClick(sport)} key={sport}>
            <ListItemText primary={sport} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
