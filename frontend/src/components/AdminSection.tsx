import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Avatar,
  FormControlLabel,
  Checkbox,
  createStyles,
  CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/es/styles';
import List from '@material-ui/core/es/List';
import ListItem from '@material-ui/core/es/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme: any) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expansion: {
      display: 'flex',
      flexDirection: 'column',
    },
  });

const AdminSection = ({ classes, title, items }: any) => {
  console.log(items);
  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      {items && (
        <ExpansionPanelDetails className={classes.expansion}>
          <List>
            {items.map((item: any) => {
              return <AdminCard key={`${item.id}`} {...item} />;
            })}
          </List>
        </ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
};

const AdminCard = ({
  item,
  person,
  ordered,
  delivered,
  funds,
  totalPrice,
  complete,
}: any) => {
  // distribute items?
  const [checkedOrdered, setOrdered] = useState(!!ordered);
  const [checkedDelivered, setDelivered] = useState(!!delivered);

  return (
    <ListItem divider>
      {person.avatar && <Avatar src={person.avatar} />}
      <ListItemText secondary={`requested ${item.name}`}>
        {person.name}
      </ListItemText>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedOrdered}
            onChange={() => setOrdered(!checkedOrdered)}
            value="Ordered"
            disabled={!complete || ordered || !delivered}
          />
        }
        label="Ordered"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedDelivered}
            onChange={() => setDelivered(!checkedDelivered)}
            value="Delivered"
            color="primary"
            disabled={!complete || !delivered}
          />
        }
        label="Delivered"
      />
      <CircularProgress
        value={(f => (f <= 100 ? f : 100))((funds / totalPrice) * 100)}
        variant="static"
      />
    </ListItem>
  );
};

export default withStyles(styles)(AdminSection);
