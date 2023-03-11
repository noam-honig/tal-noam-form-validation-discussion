import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./App.css";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "./model/Person";
import { useForm } from "react-hook-form";

import useValidators from "./useValidators";
const repo = remult.repo(Person);
const v = useValidators(repo);

// how can i extract this from repo metadata?
//tried something like :... return any
//repo.metadata.fields.firstName.valueType
type FormValues = {
  firstName: string;
  lastName: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
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
        <label htmlFor="firstName">First Name</label>
        <input {...register("firstName")} />
        <div>{errors.firstName?.message}</div>

        <label htmlFor="lastName">Last Name</label>
        <input {...register("lastName")} />
        <div>{errors.lastName?.message}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
