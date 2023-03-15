import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "../../model/Person";
import { useForm } from "react-hook-form";

import useValidators from "../../model/useValidators";
const repo = remult.repo(Person);
const v = useValidators(repo);

// how can i extract this from repo metadata?
//tried something like :... return any
//repo.metadata.fields.firstName.valueType
type FormValues = {
  firstName: string;
  lastName: string;
  isFalse: boolean;
  date: string;
};
function WithReactHookFormResolver() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      isFalse: true,
      date: "2023-05-31",
    },
    resolver: async (data, context) => {
      console.log(data);
      const errors: any = {};
      for (const key in data) {
        const fieldValue = data[key as keyof typeof data];
        const errorMessage = await v[key as keyof typeof v](fieldValue);
        if (errorMessage) errors[key] = { message: errorMessage };
      }

      return { values: data, errors };
    },
  });
  const onSubmit = async (data: any) => {
    await repo.insert(data);
  };

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} />
          <span>{errors.firstName?.message}</span>
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName")} />
          <span>{errors.lastName?.message}</span>
        </div>

        <div>
          <label htmlFor="isFalse">isFalse</label>
          <input {...register("isFalse")} type="checkbox" />
          <span>{errors.isFalse?.message}</span>
        </div>

        <div>
          <label htmlFor="date">date</label>
          <input {...register("date")} type="date" />
          <span>{errors.date?.message}</span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WithReactHookFormResolver;
