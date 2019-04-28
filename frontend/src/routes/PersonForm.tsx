import * as React from 'react';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
import { Button, InputLabel } from '@material-ui/core';
import Select from 'react-select';
import postNewPerson from '../utilities/postNewPerson';
import getRequestItems from '../utilities/getRequestItems';

export interface Person {
  name: string;
  bio: string;
  slug: string;
  image: string;
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

  const makeFileString = async (event: any, setFieldValue: any) => {
    const reader = new FileReader();
    // const result = reader.readAsDataURL(
    //   event.currentTarget.files[0]
    // );
    const file = event.currentTarget.files[0];
    console.log(file);
    await reader.readAsDataURL(file);
    const result = reader.result;
    console.log(result);
    setFieldValue('image', result);
  };

  return (
    <div className="container">
      <h1>Person Details</h1>
      <Formik
        initialValues={{
          name: '',
          bio: '',
          slug: '',
          image: '',
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
              margin="normal"
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
            <InputLabel htmlFor="image">Photo</InputLabel>
            <Field
              id="image"
              name="image"
              component={SimpleFileUpload}
              type="file"
              onChange={(event: any) =>
                setFieldValue('image', event.currentTarget.files[0])
              }
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
