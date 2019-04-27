import * as React from 'react';
import axios from 'axios';

import { Formik, Field, Form, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';

import { InputLabel, Button } from '@material-ui/core';

interface LoginInfo {
  identifier: string;
  password: string;
}

const Login = () => {
  return (
    <div className="loginForm">
      <h1>Login</h1>
      <Formik
        initialValues={{
          identifier: '',
          password: '',
        }}
        onSubmit={(
          values: LoginInfo,
          { setSubmitting }: FormikActions<LoginInfo>
        ) => {
          console.log(values);
        }}
        render={() => (
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
              placeholder="username/email"
              type="text"
              component={TextField}
            />
            <InputLabel htmlFor="password">Password</InputLabel>
            <Field
              id="password"
              name="password"
              placeholder="username/email"
              type="password"
              component={TextField}
            />
            <Button type="submit" style={{ display: 'block' }}>
              Login
            </Button>
          </Form>
        )}
      />
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
