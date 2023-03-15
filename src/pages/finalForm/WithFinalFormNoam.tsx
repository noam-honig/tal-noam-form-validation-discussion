import { remult, Repository } from "remult";
import { Person } from "../../model/Person";
import useValidators, {
  fromInput,
  toInput,
  validateInput,
} from "../../model/useValidators";
import { Field, Form } from "react-final-form";

const repo = remult.repo(Person);
const $ = repo.metadata;
const fields = $.fields;
function WithFinalFormNoam() {
  const v = useValidators(repo);

  return (
    <div>
      <Form
        initialValues={toInput(repo, new Person())}
        onSubmit={async (values) => {
          await repo.insert(fromInput(repo, values));
        }}
        validate={validateInput(repo)}
      >
        {({ handleSubmit, submitting, values, errors }) => (
          <form onSubmit={handleSubmit}>
            {fields.toArray().map((f) => {
              return (
                <Field key={f.key} name={f.key}>
                  {({ input, meta }) => (
                    <div>
                      <label>{f.caption}</label>
                      <input
                        {...input}
                        type={f.inputType}
                        placeholder={f.caption}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              );
            })}

            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </form>
        )}
      </Form>
    </div>
  );
}

export default WithFinalFormNoam;
