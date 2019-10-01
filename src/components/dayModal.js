import React, { Component } from "react";
import PropTypes from "prop-types";
import * as dateFns from "date-fns";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

const reminders =  [
  {
    start: '2019-01-01 00:00:00',
    end: '2019-01-01 02:00:00',
    title: 'New Year Party',
    city: 'xyz Location',
    color: "Yellow"
  },{
    start: '2019-01-01 01:00:00',
    end: '2019-01-01 02:00:00',
    title: 'New Year Wishes',
    city: 'Call to every one',
    color: "Yellow"

  },
  {
    start: '2019-01-02 00:30:00',
    end: '2019-01-02 01:30:00',
    title: 'Parag Birthday Party',
    city: 'Call him',
    color: "Yellow"

  },
  {
    start: '2019-01-03 01:30:00',
    end: '2019-01-03 02:20:00',
    title: 'My Birthday Party',
    city: 'Lets Enjoy',
    color: "Yellow"

  },
  {
    start: '2019-02-04 04:10:00',
    end: '2019-02-04 04:40:00',
    title: 'Engg Expo 2019',
    text:" asdASDASDASDASD",
    city: 'Expoo Vanue not confirm',
    color: "Yellow"

  },
]


function DayModal(props) {
  const { onClose, selectedValue, open, data } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{/* /* {props.data} */}reminders</DialogTitle>
      <List>
         {data[1].map(reminder => (
          <ListItem button onClick={() => handleListItemClick(reminder)} key={reminder}>
            <span>
              {reminder.city}
            </span>
            <ListItemAvatar>
            {reminder.title}
            </ListItemAvatar>
            <ListItemText primary={reminder} />
          </ListItem>
        ))} 

        <ListItem button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="add reminder" />
        </ListItem>
      </List>
    </Dialog>
  );
}

DayModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
/*   selectedValue: PropTypes.string.isRequired,
 */};

export default DayModal;
