import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "../../model/Person";
import { useForm } from "react-hook-form";

import useValidators, {
  fromInput,
  toInput,
  validateInput,
} from "../../model/useValidators";
const repo = remult.repo(Person);
const $ = repo.metadata;
const fields = $.fields;
// how can i extract this from repo metadata?
//tried something like :... return any
//repo.metadata.fields.firstName.valueType
type FormValues = {
  firstName: string;
  lastName: string;
  isFalse: boolean;
  date: string;
};
function WithReactHookFormNoam() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: toInput(repo, new Person()),
    resolver: async (values) => {
      const errors = await validateInput(repo)(values);
      Object.keys(errors).forEach((key) => {
        errors[key] = { message: errors[key] };
      });

      return { values, errors };
    },
  });
  const onSubmit = async (values: any) => {
    await repo.insert(fromInput(repo, values));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.toArray().map((f) => {
          return (
            <div key={f.key}>
              <label htmlFor={f.key}>{f.caption}</label>
              <input
                {...register(f.key as keyof FormValues)}
                type={f.inputType}
              />
              <span>{errors[f.key as keyof FormValues]?.message}</span>
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WithReactHookFormNoam;
