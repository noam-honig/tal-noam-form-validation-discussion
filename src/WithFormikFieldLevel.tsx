import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./App.css";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "./model/Person";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useValidators from "./useValidators";
const repo = remult.repo(Person);

function App() {
  const v = useValidators(repo);

  return (
    <div>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={async (values) => {
          await repo.insert(values);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" validate={v.firstName} />
          <ErrorMessage name="firstName" component="div" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" validate={v.lastName} />
          <ErrorMessage name="lastName" component="div" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
