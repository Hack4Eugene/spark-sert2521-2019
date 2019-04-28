import React, { useState } from 'react';
import {
  Paper,
  AppBar,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Avatar,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/es/styles';

const styles = (theme: any) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const AdminSection = ({ classes, title, items }: any) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {items.map((item: any) => (
          <AdminCard {...items} key={`${item.itemName}${item.personName}`} />
        ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const AdminCard = ({
  itemName,
  personName,
  avatar,
  slug,
  ordered,
  delivered,
  percentFunded,
}: any) => {
  // distribute items?
  const [checkedOrdered, setOrdered] = useState(ordered);
  const [checkedDelivered, setDelivered] = useState(delivered);
  return (
    <Paper>
      Avatar src={avatar}/>
      <Typography>
        {itemName} for {personName}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedOrdered}
            onChange={() => setOrdered(!checkedOrdered)}
            value="Ordered"
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
          />
        }
        label="Delivered"
      />
      <LinearProgress value={percentFunded} />
    </Paper>
  );
};

export default withStyles(styles)(AdminSection);
