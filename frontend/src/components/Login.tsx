import * as React from 'react';
import axios from 'axios';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';

import { InputLabel, Button, CircularProgress } from '@material-ui/core';
import isLoggedIn from '../utilities/isLoggedIn';

import { store } from '../state';
import { updateUser } from '../state/actions';

interface LoginInfo {
  identifier: string;
  password: string;
}
const Login = ({ history }: any) => {
  const [failedLogin, setFailedLogin] = React.useState(false);
  return (
    <div className="loginForm">
      <h1>Login</h1>
      <Formik
        initialValues={{
          identifier: '',
          password: '',
        }}
        onSubmit={async (
          values: LoginInfo,
          { setSubmitting }: FormikActions<LoginInfo>
        ) => {
          console.log(values);
          try {
            await axios
              .post('http://localhost:8080/api/auth/login', values)
              .then(response => {
                window.localStorage.setItem(
                  'token',
                  response.data.response.token
                );
              });

            const authed = await isLoggedIn();
            console.log(authed);
            if (authed) {
              store.dispatch(
                updateUser({
                  username: authed.username,
                  email: authed.email,
                })
              );
              history.replace('/');
            }
          } catch {
            setSubmitting(false);
            setFailedLogin(true);
          }
        }}
        render={({ isSubmitting, isValid }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <InputLabel htmlFor="identifier">Username</InputLabel>
            <Field
              id="identifier"
              name="identifier"
              placeholder=""
              type="text"
              component={TextField}
              required
            />
            <InputLabel htmlFor="password">Password</InputLabel>
            <Field
              id="password"
              name="password"
              placeholder=""
              type="password"
              component={TextField}
              required
            />
            {isSubmitting ? (
              <CircularProgress style={{ margin: 'auto' }} size={50} />
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                style={{ display: 'block' }}
              >
                Login
              </Button>
            )}
          </Form>
        )}
      />
      {failedLogin && <h3>Login Failed</h3>}
    </div>
  );
};

export default Login;

// post user deets /api/auth/login
// body: identifier (username or email), password: text
// response: user object, token

// window.localstorage.token

// create: post /api/users/
// body: username, password, email, name
