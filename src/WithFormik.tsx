import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./App.css";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "./model/Person";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useValidators from "./useValidators";
const repo = remult.repo(Person);

function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={async (values) => {
          console.log(values);
          await repo.insert(values);
        }}
        validate={async (values) => {
          const v = useValidators(repo);
          const errors: any = {};
          for (const key in values) {
            const value = values[key as keyof typeof values];
            const error = await v[key as keyof typeof v](value);
            if (error) {
              errors[key as string] = error;
            }
          }
          return errors;
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" component="div" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" component="div" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
