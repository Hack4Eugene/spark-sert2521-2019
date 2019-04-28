import * as React from 'react';
import axios from 'axios';

import { Formik, Form, FormikActions } from 'formik';

import { Button, CircularProgress, Typography } from '@material-ui/core';
import isLoggedIn from '../utilities/isLoggedIn';
import FormField from './FormField';

import { store } from '../state';
import { updateUser } from '../state/actions';

interface LoginInfo {
  identifier: string;
  password: string;
}
const Login = ({ history }: any) => {
  const [failedLogin, setFailedLogin] = React.useState(false);
  return (
    <div className="loginForm" style={{ textAlign: 'center' }}>
      <Typography variant="display1">Login</Typography>
      <Formik
        initialValues={{
          identifier: '',
          password: '',
        }}
        onSubmit={async (
          values: LoginInfo,
          { setSubmitting }: FormikActions<LoginInfo>
        ) => {
          setFailedLogin(false);
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
            <FormField
              name="identifier"
              placeholder=""
              type="text"
              label="Username"
              required
            />
            <FormField
              name="password"
              type="password"
              label="Password"
              required
            />
            {isSubmitting ? (
              <CircularProgress style={{ margin: 'auto' }} size={50} />
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                style={{ display: 'block', marginTop: 20 }}
              >
                Login
              </Button>
            )}
          </Form>
        )}
      />
      {failedLogin && <Typography variant="subtitle2">Login Failed</Typography>}
    </div>
  );
};

export default Login;
