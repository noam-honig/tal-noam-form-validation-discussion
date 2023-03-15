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
