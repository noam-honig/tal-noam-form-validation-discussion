import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./App.css";
import { remult, ErrorInfo, Repository } from "remult";
import { Person } from "./model/Person";
import { useForm } from "react-hook-form";
import useValidators from "./useValidators";

const repo = remult.repo(Person);

// how can i extract this from repo metadata?
//tried something like :... return any
//repo.metadata.fields.firstName.valueType
type FormValues = {
  firstName: string;
  lastName: string;
  isFalse: boolean;
  date: string;
};

function App() {
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
  });
  const onSubmit = async (data: FormValues) => {
    await repo.insert(data as any);
  };

  const v = useValidators(repo);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName", { validate: v.firstName })} />
          <span>{errors.firstName?.message}</span>
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register("lastName", { validate: v.lastName })} />
          <span>{errors.lastName?.message}</span>
        </div>

        <div>
          <label htmlFor="isFalse">isFalse</label>
          <input
            {...register("isFalse", { validate: v.isFalse })}
            type="checkbox"
          />
          <span>{errors.isFalse?.message}</span>
        </div>

        <div>
          <label htmlFor="date">date</label>
          <input {...register("date", { validate: v.date })} type="date" />
          <span>{errors.date?.message}</span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
