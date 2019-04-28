import * as React from 'react';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';

const FormField = (props: any) => {
  return (
    <Field
      InputLabelProps={{ required: false }}
      style={{ marginTop: 20 }}
      component={TextField}
      {...props}
    />
  );
};

export default FormField;
