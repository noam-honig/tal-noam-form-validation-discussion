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
import WithFormikNoam from "./pages/formik/WithFormikNoam";
import WithFinalFormNoam from "./pages/finalForm/WithFinalFormNoam";
import WithReactHookFormNoam from "./pages/reactHookForm/WithReactHookFormNoam";

export const router = createBrowserRouter([
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
          { path: "noam", element: <WithReactHookFormNoam /> },
        ],
      },
      {
        path: "formik",
        children: [
          { index: true, element: <WithFormik /> },
          { path: "field", element: <WithFormikFieldLevel /> },
          { path: "noam", element: <WithFormikNoam /> },
        ],
      },
      {
        path: "finalForm",
        children: [
          { index: true, element: <WithFinalForm /> },
          { path: "field", element: <WithFinalFormFieldLevel /> },
          { path: "noam", element: <WithFinalFormNoam /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
