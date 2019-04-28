import Popover from '@material-ui/core/Popover';
import * as React from 'react';
import createStyles from '@material-ui/core/es/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/es/styles/withStyles';
import { Field, Form, Formik, FormikActions } from 'formik';
import axios from 'axios';
import { Button, CircularProgress, InputLabel } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Dialog from '@material-ui/core/es/Dialog';

const styles = createStyles({
  popover: {
    position: 'relative',
    textAlign: 'center',
    padding: '20px',
  },
  popoverDiv: {
    position: 'absolute',
  },
});

console.log(styles);

function getType(s: String): DonationType {
  switch (s) {
    case 'person':
      return DonationType.PERSON;
    case 'request':
      return DonationType.REQUEST;
    default:
      return DonationType.PERSON;
  }
}

enum DonationType {
  PERSON,
  REQUEST,
}

interface DonationForm {
  amount: String;
  type: DonationType;
  identifier: String;
}

// Props: <DonationPopup type={PERSON} personId={1} open={true}>
// Or:    <DonationPopup type={REQUEST} requestId{1} open={true}>

const DonationPopup = (props: any) => {
  const { classes } = props;

  console.log(classes);

  return (
    <>
      <div className={classes.popoverDiv}>
        <Dialog open={props.open}>
          <div className={classes.popover}>
            <Formik
              initialValues={{
                amount: '0',
                type: getType(props.type),
                identifier: 'scienceguy',
              }}
              onSubmit={async (
                form: DonationForm,
                { setSubmitting }: FormikActions<DonationForm>
              ) => {
                var amount = parseFloat(form.amount.toString());

                if (isNaN(amount)) {
                  alert('Please enter a number.');
                  setSubmitting(false);
                  return;
                }

                if (form.identifier == '') {
                  alert('No associated ident');
                  setSubmitting(false);
                  return;
                }
                if (amount <= 0) {
                  alert('Too low!');
                  setSubmitting(false);
                  return;
                }
                if (form.type == DonationType.PERSON) {
                  try {
                    await axios
                      .post(
                        'http://localhost:8080/api/payments/people/' +
                          form.identifier,
                        { amount: form.amount }
                      )
                      .then(response => {
                        console.log(response);
                        if (response.status == 200) {
                          if (response.data.success) {
                            window.location = response.data.response.link;
                          } else {
                            alert('Transaction unsuccessful!');
                            setSubmitting(false);
                          }
                        }
                      });
                  } finally {
                  }
                }
              }}
              render={({ isSubmitting }) => (
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    margin: '0 auto',
                  }}
                >
                  <InputLabel htmlFor="amount">
                    Amount
                    <br />
                    (in dollars)
                  </InputLabel>
                  <Field
                    id=""
                    name="amount"
                    placeholder=""
                    type="text"
                    component={TextField}
                    step={'any'}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ display: 'block' }}
                  >
                    {isSubmitting ? (
                      <CircularProgress style={{ margin: 'auto' }} size={20} />
                    ) : (
                      <div>Donate</div>
                    )}
                  </Button>
                </Form>
              )}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default withStyles(styles)(DonationPopup);
