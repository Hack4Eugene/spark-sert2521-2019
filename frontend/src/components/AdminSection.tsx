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
  createStyles,
  CircularProgress,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/es/styles';

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
          {items.map((item: any) => {
            console.log(item);
            return <AdminCard key={`${item.id}`} {...item} />;
          })}
        </ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
};

const AdminCard = ({
  item,
  person,
  slug,
  ordered,
  delivered,
  funds,
  totalPrice,
  complete,
}: any) => {
  // distribute items?
  const [checkedOrdered, setOrdered] = useState(ordered ? true : false);
  const [checkedDelivered, setDelivered] = useState(delivered ? true : false);

  return (
    <Paper>
      {person.avatar && <Avatar src={person.avatar} />}
      <Typography>
        {item.name} for {person.name}
      </Typography>
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
      <CircularProgress value={(funds / totalPrice) * 100} variant="static" />
    </Paper>
  );
};

export default withStyles(styles)(AdminSection);
