import { NavLink, Outlet } from "react-router-dom";
import { router } from "../App";
export default function RootLayout() {
  return (
    <>
      <header>
        <div>
          <ul>
            {router.routes[0].children!.map((r) => {
              return (
                <>
                  {r.children?.map((r_sub) => {
                    return (
                      <li>
                        <NavLink to={`${r.path}/${r_sub.path || ""}`}>
                          {r.path} {r_sub.path}
                        </NavLink>
                      </li>
                    );
                  })}
                </>
              );
            })}
          </ul>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
