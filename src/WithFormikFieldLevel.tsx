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
        initialValues={{
          firstName: "",
          lastName: "",
          isFalse: true,
          date: "2023-05-31",
        }}
        onSubmit={async (values) => {
          //date as string
          await repo.insert(values as any);
        }}
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" validate={v.firstName} />
            <ErrorMessage name="firstName" component="span" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" validate={v.lastName} />
            <ErrorMessage name="lastName" component="span" />
          </div>
          <div>
            <label htmlFor="isFalse">isFalse</label>
            <Field name="isFalse" type="checkbox" validate={v.isFalse} />
            <ErrorMessage name="isFalse" component="span" />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <Field name="date" type="date" validate={v.date} />
            <ErrorMessage name="date" component="span" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
