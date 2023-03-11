import "./App.css";
import { remult } from "remult";
import { Person } from "./model/Person";
import useValidators from "./useValidators";
import { Field, Form } from "react-final-form";

const repo = remult.repo(Person);

function App() {
  const v = useValidators(repo);
  const onSubmit = async (data: any) => {
    await repo.insert(data);
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
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
