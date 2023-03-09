import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./App.css";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "./model/Person";
import { ErrorMessage, Field, Form, Formik } from "formik";

const repo = remult.repo(Person);

function useValidators<T>(repo: Repository<T>): Validators<T> {
  return new Proxy(
    {},
    {
      get(target, key: string, receiver) {
        return async (value: any) => {
          const ref = repo.getEntityRef({ [key]: value } as any);
          const field = ref.fields.find(key);
          const isValid = await field.validate();
          return isValid ? undefined : field.error;
        };
      },
    }
  ) as any;
}

export type Validators<entityType> = {
  [Properties in keyof entityType]: (value: string) => void;
};

function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={async (values) => {
          await repo.insert(values);
        }}
        validate={async (values) => {
          const v = useValidators(repo);
          const errors = {
            firstName: await v.firstName(values.firstName),
            lastName: await v.lastName(values.lastName),
          };
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
