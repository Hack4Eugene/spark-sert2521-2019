import * as React from 'react';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, InputLabel } from '@material-ui/core';
import Select from 'react-select';
import axios from 'axios';
import getAuthHeader from '../utilities/getAuthHeader';

interface Person {
  name: string;
  bio: string;
  slug: string;
  requests: Array<number>;
}

interface Response {
  data: object;
  response: Array<Request>;
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
    const items = await axios('http://localhost:8080/api/items');
    const mappedItems: Options = items.data.response.map(
      ({ name, price, id }: Request) => {
        price = Number(((price * 100) / 100).toFixed(2));
        return { label: `${name} - $${price}`, value: id };
      }
    );
    setOptions(mappedItems);
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
          const { name, bio, slug, requests } = values;

          try {
            await axios
              .post(
                'http://localhost:8080/api/people',
                { name, bio, slug },
                {
                  headers: getAuthHeader(),
                }
              )
              .then(response => console.log(response));
            await axios
              .post(
                `http://localhost:8080/api/person/${slug}/requests`,
                requests,
                {
                  headers: getAuthHeader(),
                }
              )
              .then(response => console.log(response));
            setSuccess('success');
            resetForm();
          } catch {
            setSuccess('fail');
          }
        }}
        render={({ setFieldValue, isSubmitting }) => (
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
            />

            <InputLabel htmlFor="bio">Bio</InputLabel>
            <Field
              id="bio"
              name="bio"
              placeholder="Doe"
              type="text"
              component={TextField}
              multiline
            />

            <InputLabel htmlFor="slug">Nickname</InputLabel>
            <Field
              id="slug"
              name="slug"
              placeholder="JimmyJohn"
              type="text"
              component={TextField}
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
                setFieldValue('requests', value.map(v => v.value))
              }
            />
            <Button
              type="submit"
              disabled={isSubmitting}
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
