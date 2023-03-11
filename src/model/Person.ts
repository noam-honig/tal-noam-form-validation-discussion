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
}

remult.dataProvider = new JsonDataProvider(localStorage);
// bug: id already exists when using localStorage, and inserting the same firstName
