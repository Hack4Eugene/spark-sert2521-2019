import createStyles from '@material-ui/core/es/styles/createStyles';
import withStyles from '@material-ui/core/es/styles/withStyles';
import DonationPopup from './DonationPopup';
import * as React from 'react';
import { Button } from '@material-ui/core';

const styles = createStyles({
  donateButton: {
    width: '25vh',
    margin: 'auto',
    marginBottom: '20px',
  },
});

const PersonDonationButton = (props: any) => {
  const { classes } = props;

  const id = props.slug;

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        className={classes.donateButton}
        variant={'contained'}
        color={'primary'}
        onClick={() => {
          setOpen(true);
        }}
      >
        Donate
      </Button>
      {open ? <DonationPopup open={true} type={'person'} id={id} /> : null}
    </>
  );
};

export default withStyles(styles)(PersonDonationButton);
