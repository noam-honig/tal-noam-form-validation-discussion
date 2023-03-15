import { remult } from "remult";
import { Person } from "../../model/Person";
import useValidators from "../../model/useValidators";
import { Field, Form } from "react-final-form";

const repo = remult.repo(Person);

function WithFinalFormFieldLevel() {
  const v = useValidators(repo);

  return (
    <div>
      <Form
        onSubmit={async (values) => {
          await repo.insert(values);
        }}
        initialValues={{
          firstName: "",
          lastName: "",
          isFalse: true,
          date: "2023-05-31",
        }}
      >
        {({ handleSubmit, submitting, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" validate={v.firstName}>
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="lastName" validate={v.lastName}>
              {({ input, meta }) => (
                <div>
                  <label>Last Name</label>
                  <input {...input} type="text" placeholder="Last Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="isFalse" type="checkbox" validate={v.isFalse}>
              {({ input, meta }) => (
                <div>
                  <label>isFalse</label>
                  <input {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="date" validate={v.date}>
              {({ input, meta }) => (
                <div>
                  <label>Date</label>
                  <input {...input} type="date" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </form>
        )}
      </Form>
    </div>
  );
}

export default WithFinalFormFieldLevel;
