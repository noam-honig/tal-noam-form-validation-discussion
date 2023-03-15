import { remult, Repository } from "remult";
import { Person } from "../../model/Person";
import useValidators, {
  fromInput,
  validateInput,
} from "../../model/useValidators";
import { Field, Form } from "react-final-form";

const repo = remult.repo(Person);

// BUG IN FINAL FORM: sent to validate just if value is not empty
// therefore missed the "shouldn't be empty" validation

function WithFinalForm() {
  const v = useValidators(repo);

  return (
    <div>
      <Form
        initialValues={{
          firstName: "",
          lastName: "",
          isFalse: true,
          date: "2023-05-31",
        }}
        onSubmit={async (values) => {
          await repo.insert(fromInput(repo, values));
        }}
        validate={validateInput(repo)}
      >
        {({ handleSubmit, submitting, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" defaultValue={""}>
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="lastName">
              {({ input, meta }) => (
                <div>
                  <label>Last Name</label>
                  <input {...input} type="text" placeholder="Last Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="isFalse" type="checkbox">
              {({ input, meta }) => (
                <div>
                  <label>isFalse</label>
                  <input {...input} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="date">
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

export default WithFinalForm;
