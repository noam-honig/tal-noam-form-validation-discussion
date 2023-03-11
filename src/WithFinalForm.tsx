import "./App.css";
import { remult } from "remult";
import { Person } from "./model/Person";
import useValidators from "./useValidators";
import { Field, Form } from "react-final-form";

const repo = remult.repo(Person);

// BUG IN FINAL FORM: sent to validate just if value is not empty
// therefore missed the "shouldn't be empty" validation

function App() {
  const v = useValidators(repo);
  const onSubmit = async (data: any) => {
    await repo.insert(data);
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={async (values) => {
          console.log(values);
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
        {({ handleSubmit, submitting, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName">
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

            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </form>
        )}
      </Form>
    </div>
  );
}

export default App;
