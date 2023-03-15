import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "../../model/Person";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useValidators, {
  fromInput,
  toInput,
  validateInput,
} from "../../model/useValidators";
const repo = remult.repo(Person);
const $ = repo.metadata.fields;
const fields = [$.firstName, $.lastName, $.date];
function WithFormikNoam() {
  return (
    <div>
      <Formik
        initialValues={toInput(repo, {
          ...new Person(),
          date: new Date(2023, 4, 31),
        })}
        onSubmit={async (values) => {
          await repo.insert(fromInput(repo, values));
        }}
        validate={validateInput(repo)}
      >
        <Form>
          {fields.map((f) => {
            return (
              <div key={f.key}>
                <label htmlFor={f.key}>{f.caption}</label>
                <Field name={f.key} type={f.inputType} />
                <ErrorMessage name={f.key} component="span" />
              </div>
            );
          })}

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default WithFormikNoam;
