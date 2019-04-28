import * as React from 'react';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField, SimpleFileUpload } from 'formik-material-ui';
import { Button, InputLabel, Typography } from '@material-ui/core';
import Select from 'react-select';
import postNewPerson from '../utilities/postNewPerson';
import getRequestItems from '../utilities/getRequestItems';
import FormField from '../components/FormField';

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

const PersonForm: React.SFC<{}> = ({ theme, classes }: any) => {
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
    <div className="container" style={{ textAlign: 'center' }}>
      <Typography variant="display1">Create Person</Typography>
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
            <FormField name="name" type="text" label="Name" required />

            <FormField name="bio" type="text" label="Bio" multiline required />

            <FormField name="slug" type="text" label="Slug" required />

            <div style={{ marginTop: 20 }}>
              <FormField
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
            </div>
            <FormField
              label="Photo"
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
              style={{ display: 'block', marginTop: 20 }}
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
