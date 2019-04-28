import createStyles from '@material-ui/core/es/styles/createStyles';
import withStyles from '@material-ui/core/es/styles/withStyles';
import DonationPopup from './DonationPopup';
import * as React from 'react';
import { Button } from '@material-ui/core';

const styles = createStyles({});

const RequestDonationButton = (props: any) => {
  const { classes } = props;

  const id = props.slug;

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
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

export default withStyles(styles)(RequestDonationButton);
