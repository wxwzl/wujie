import { Outlet, Link, createBrowserRouter, RouterProvider, useNavigation } from "react-router-dom";
import React from "react";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "about",
          // Single route in lazy file
          // async lazy() {
          //   // Multiple routes in lazy file
          //   let { About } = await import("./pages/About");
          //   return { Component: About };
          // },
          lazy: () => import("./pages/About"),
        },
        {
          path: "home",
          lazy: () => import("./pages/Home"),
        },
        {
          path: "*",
          element: <NoMatch />,
        },
      ],
    },
  ],
  {
    basename: window.__POWERED_BY_QIANKUN__ ? "/react18" : "/",
  }
);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
function Layout() {
  let navigation = useNavigation();

  return (
    <div>
      <h1>Lazy Loading Example using RouterProvider</h1>

      <div style={{ position: "fixed", top: 0, right: 0 }}>
        {navigation.state !== "idle" && <p>Navigation in progress...</p>}
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages (Dashboard)</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <div style={{ "textAlign": "center" }}>
        <Outlet />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
