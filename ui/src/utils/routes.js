import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../pages/dashboard/Home";
import Profile from "../pages/dashboard/Profile";
import Post from "../pages/dashboard/Post";

// const routes = [
// //   {
// //     title: "Authentication pages",
// //     layout: "auth",
// //     pages: [
// //       {
// //         name: "register",
// //         path: "/register",
// //         element: <Register />
// //       },
// //       {
// //         name: "login",
// //         path: "/login",
// //         element: <Login />
// //       },
// //     ],
// //   },
//   {
//     title: "Dashboard pages",
//     layout: "dashboard",
//     pages: [
//       {
//         name: "dashboard",
//         path: "/",
//         // element: <Home />,
//       },
//       {
//         name: "profile",
//         path: "/profile/:userid",
//         // element: <Profile />,
//       },
//       {
//         name: "posts",
//         path: "/posts/:userid",
//         // element: <Post />,
//       },
//     ],
//   },
// ];

// export default routes;


  const routes = [
    // {
      // title: "Authentication pages",
      // layout: "auth",
      // pages: [
      //   {
      //     name: "register",
      //     path: "/register",
      //     element: <Register />
      //   },
      //   {
      //     name: "login",
      //     path: "/login",
      //     element: <Login />
      //   },
      // ],
    // },
    {
      title: "Authentication pages",
      layout: "auth",
      pages: [
        {
          name: "register",
          path: "/register",
          element: 'Register'
        }
      ]
    }
  ];


  export default routes;

