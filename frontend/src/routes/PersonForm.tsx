import * as React from 'react';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, InputLabel } from '@material-ui/core';
import Select from 'react-select';
import postNewPerson from '../utilities/postNewPerson';
import getRequestItems from '../utilities/getRequestItems';

export interface Person {
  name: string;
  bio: string;
  slug: string;
  requests: Array<number>;
}

interface Request {
  name: string;
  price: number;
  id: number;
}

interface Options {
  value: string;
  label: string;
}

const PersonForm: React.SFC<{}> = () => {
  const [requestOptions, setOptions] = React.useState();
  const [success, setSuccess] = React.useState('');
  const getOptions = async () => {
    const results = await getRequestItems();
    setOptions(results);
  };
  React.useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="container">
      <h1>Person Details</h1>
      <Formik
        initialValues={{
          name: '',
          bio: '',
          slug: '',
          requests: [],
        }}
        onSubmit={async (
          values: Person,
          { setSubmitting, resetForm }: FormikActions<Person>
        ) => {
          try {
            postNewPerson(values);
            setSuccess('success');
            resetForm();
          } catch {
            setSuccess('fail');
          }
        }}
        render={({ setFieldValue, isSubmitting, isValid }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <InputLabel htmlFor="name">Name</InputLabel>
            <Field
              id="name"
              name="name"
              placeholder="John"
              type="text"
              component={TextField}
              required
            />

            <InputLabel htmlFor="bio">Bio</InputLabel>
            <Field
              id="bio"
              name="bio"
              placeholder="Doe"
              type="text"
              component={TextField}
              multiline
              required
            />

            <InputLabel htmlFor="slug">Nickname</InputLabel>
            <Field
              id="slug"
              name="slug"
              placeholder="JimmyJohn"
              type="text"
              component={TextField}
              required
            />

            <InputLabel htmlFor="requests">Requests</InputLabel>
            <Field
              id="requests"
              name="requests"
              component={Select}
              isMulti
              closeMenuOnSelect={false}
              options={requestOptions}
              onChange={(value: Array<any>) =>
                setFieldValue('requests', value.map(v => ({ item: v.value })))
              }
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              style={{ display: 'block' }}
            >
              Submit
            </Button>
          </Form>
        )}
      />
      {success &&
        (success === 'success' ? (
          <h3>Person added!</h3>
        ) : (
          <h3>Please try again</h3>
        ))}
    </div>
  );
};

export default PersonForm;
