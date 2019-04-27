import * as React from "react";

import { Formik, Field, Form, FormikActions } from "formik";
import { TextField } from "formik-material-ui";
import { Button, InputLabel } from "@material-ui/core";
import Select from "react-select";
import axios from "axios";

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

  const getOptions = async () => {
    console.log("requesting");
    const items = await axios("http://localhost:8080/api/items");
    const mappedItems: Options = items.data.response.map(
      ({ name, price, id }) => {
        price = ((price * 100) / 100).toFixed(2);
        return { label: `${name} - $${price}`, value: id };
      }
    );
    console.log(mappedItems);
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
          name: "",
          bio: "",
          slug: "",
          requests: []
        }}
        onSubmit={(
          values: Person,
          { setSubmitting }: FormikActions<Person>
        ) => {
          // axios
          //   .post("http://localhost:8080/api/people", values, {
          //     headers: {
          //       Authorization:
          //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6InBheWl0Zm9yd2FyZC5jb20iLCJpZCI6MSwiZXhwIjoxNTU2Nzg0MDMxfQ.5qz6hifpIm7Rc5ni6myjPdketXgt4Mn0MCdaGfHKIDftd7BiwC5oJ6xGReCdvyn_Be5 - HgEiKJZp12KttFjInw"
          //     }
          //   })
          //   .then(response => console.log(response));

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
        render={({ setFieldValue }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
              margin: "0 auto"
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
              onChange={value =>
                setFieldValue("requests", value.map(v => v.value))
              }
            />
            <Button type="submit" style={{ display: "block" }}>
              Submit
            </Button>
          </Form>
        )}
      />
    </div>
  );
};
const requestOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
export default PersonForm;
