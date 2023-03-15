import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import WithReactHookFormResolver from "./pages/reactHookForm/WithReactHookFormResolver";
import WithReactHookFormFieldLevel from "./pages/reactHookForm/WithReactHookFormFieldLevel";
import WithFormik from "./pages/formik/WithFormik";
import WithFormikFieldLevel from "./pages/formik/WithFormikFieldLevel";
import WithFinalForm from "./pages/finalForm/WithFinalForm";
import WithFinalFormFieldLevel from "./pages/finalForm/WithFinalFormFieldLevel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "reactHookForm",
        children: [
          { index: true, element: <WithReactHookFormResolver /> },
          { path: "field", element: <WithReactHookFormFieldLevel /> },
        ],
      },
      {
        path: "formik",
        children: [
          { index: true, element: <WithFormik /> },
          { path: "field", element: <WithFormikFieldLevel /> },
        ],
      },
      {
        path: "finalForm",
        children: [
          { index: true, element: <WithFinalForm /> },
          { path: "field", element: <WithFinalFormFieldLevel /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
