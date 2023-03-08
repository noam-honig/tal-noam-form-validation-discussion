import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import "./App.css"
import { remult, ErrorInfo, Repository } from "remult"
import { Person } from "./model/Person"

const repo = remult.repo(Person)

function useValidators<T>(
  repo: Repository<T>,
  state: T,
  setError: Dispatch<SetStateAction<ErrorInfo<T> | undefined>>
): Validators<T> {
  return new Proxy(
    {},
    {
      get(target, key: string, receiver) {
        return async () => {
          const ref = repo.getEntityRef({ [key]: (state as any)[key] } as any)
          const field = ref.fields.find(key)
          const validationIsOk = await field.validate()
          setError((error) => ({
            modelState: {
              ...error?.modelState,
              [key]: validationIsOk ? undefined : field.error,
            },
          }))
        }
      },
    }
  ) as any
}

export type Validators<entityType> = {
  [Properties in keyof entityType]: () => void
}


function App() {
  
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState<ErrorInfo<Person>>()
  const v = useValidators(repo, { firstName, lastName }, setError)
  const addPerson = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setError(undefined)
      await repo.insert({ firstName, lastName })
    } catch (error: any) {
      setError(error)
    }
  }

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={v.firstName}
          />
          {error?.modelState?.firstName}
        </div>
        <div>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={v.lastName}
          />
          {error?.modelState?.lastName}
        </div>
        <button>Insert</button>
      </form>
    </div>
  )
}

export default App
