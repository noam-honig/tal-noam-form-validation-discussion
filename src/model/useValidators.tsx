import { Repository } from "remult";

export default function useValidators<T>(repo: Repository<T>): Validators<T> {
  return new Proxy(
    {},
    {
      get(target, key: string, receiver) {
        return async (value: any) => {
          const ref = repo.getEntityRef({ [key]: value } as any);
          const field = ref.fields.find(key);
          const isValid = await field.validate();

          console.log({
            key: key,
            value: value,
            isDate: value instanceof Date,
            isValid: isValid,
            error: field.error,
          });

          return isValid ? undefined : field.error;
        };
      },
    }
  ) as any;
}

export type Validators<entityType> = {
  [Properties in keyof entityType]: (value: any) => string | undefined;
};

export function fromInput(repo: Repository<any>, value: any) {
  let result = { ...value };
  for (const f of repo.metadata.fields.toArray()) {
    if (value[f.key] !== undefined) {
      result[f.key] = f.valueConverter.fromInput!(value[f.key], f.inputType);
    }
  }
  return result;
}
export function toInput(repo: Repository<any>, value: any) {
  let result = { ...value };
  for (const f of repo.metadata.fields.toArray()) {
    if (value[f.key] !== undefined) {
      result[f.key] = f.valueConverter.toInput!(value[f.key], f.inputType);
    }
  }
  return result;
}
export function validateInput(repo: Repository<any>) {
  return async (values: any) => {
    const ref = repo.getEntityRef(fromInput(repo, values) as any);
    const errors: any = {};
    if (!(await ref.validate())) {
      for (const f of ref.fields.toArray()) {
        if (f.error) errors[f.metadata.key] = f.error;
      }
    }
    return errors;
  };
}
