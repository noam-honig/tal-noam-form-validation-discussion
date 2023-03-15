import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <div>
          <ul>
            <li>
              <NavLink to="/finalForm/">FinalForm - Global validation</NavLink>
            </li>
            <li>
              <NavLink to="/finalForm/field">
                FinalForm - Field validation
              </NavLink>
            </li>
            <li>
              <NavLink to="/reactHookForm/">
                React Hook Form - Global validation
              </NavLink>
            </li>
            <li>
              <NavLink to="/reactHookForm/field">
                React Hook Form - Field validation
              </NavLink>
            </li>
            <li>
              <NavLink to="/formik/">Formik - Global validation</NavLink>
            </li>
            <li>
              <NavLink to="/formik/field">Formik - Field validation</NavLink>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
