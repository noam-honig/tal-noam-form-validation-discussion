import {
  Fields,
  Entity,
  remult,
  WebSqlDataProvider,
  SqlDatabase,
  Validators,
  JsonDataProvider,
  FieldRef,
} from "remult";

@Entity("person")
export class Person {
  @Fields.string<Person>({
    validate: (person) => {
      if (person.firstName.length < 3) throw Error("too short");
    },
  })
  firstName = "";
  @Fields.string({ validate: Validators.required })
  lastName = "";

  @Fields.boolean({
    validate: (_, fieldRef) => {
      if (fieldRef.value) fieldRef.error = "must be false";
    },
  })
  isFalse = true;

  @Fields.dateOnly({
    validate(entity, fieldRef) {
      if (fieldRef.value > new Date()) fieldRef.error = "must be in the past";
    },
  })
  date = new Date(2023, 6, 15);
}

remult.dataProvider = new JsonDataProvider(localStorage);

export function Min(length: number) {
  return (_: any, fieldRef: FieldRef<any, string>) => {
    if (fieldRef.value.length < 3) throw Error("too short");
  };
}
