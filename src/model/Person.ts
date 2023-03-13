import {
  Fields,
  Entity,
  remult,
  WebSqlDataProvider,
  SqlDatabase,
  Validators,
  JsonDataProvider,
} from "remult";

@Entity("person")
export class Person {
  @Fields.string({
    validate: (_, fieldRef) => {
      if (fieldRef.value.length < 3) fieldRef.error = "too short";
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
  isFalse = false;

  @Fields.date({
    validate(entity, fieldRef) {
      if (new Date(fieldRef.value) > new Date())
        fieldRef.error = "must be in the past";
    },
  })
  date = new Date();
}

remult.dataProvider = new JsonDataProvider(localStorage);
// bug: id already exists when using localStorage, and inserting the same firstName
