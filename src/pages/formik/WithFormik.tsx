import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "../../model/Person";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useValidators from "../../model/useValidators";
const repo = remult.repo(Person);

function WithFormik() {
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
          console.log(values);
          //he don't like date as string
          await repo.insert(values as any);
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
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" component="span" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" component="span" />
          </div>
          <div>
            <label htmlFor="isFalse">isFalse</label>
            <Field name="isFalse" type="checkbox" />
            <ErrorMessage name="isFalse" component="span" />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <Field name="date" type="date" />
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

export default WithFormik;
