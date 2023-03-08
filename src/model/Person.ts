import {
  Fields,
  Entity,
  remult,
  WebSqlDataProvider,
  SqlDatabase,
  Validators,
  JsonDataProvider,
} from "remult"

@Entity("person")
export class Person {
  @Fields.string({ validate: Validators.required })
  firstName = ""
  @Fields.string({ validate: Validators.required })
  lastName = ""
}

remult.dataProvider = new JsonDataProvider(localStorage)
