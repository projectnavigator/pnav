import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  LandingPage,
  LoginPage,
  RegisterPage,
  AdminPage,
  ErrorPage,
  StatusPage,
  ProfilePage,
  DashboardPage,
  addTaskPage,
  addProjectPage,
  allProjectPage,
  allTaskPage,
  UpdateProjectPage,
  UpdateTaskPage,
  // PMHome,
  Home,
  ProgressReport,
  Database,
  Dash,
} from "./pages";
import { action as registerAction } from "./pages/RegisterPage";
import { action1 as addUserAction } from "./pages/Database";
import { action as loginAction } from "./pages/LoginPage";
import { action as deleteUserAction } from "./pages/deleteUser";
import { action as deleteProjectAction } from "./pages/deleteProjectPage";
import { action as updateProjectStatusAction } from "./pages/updateProjectStatusPage";
import { loader as dashboardLoader } from "./pages/DashboardPage";
import { loader as databaseLoader } from "./pages/Database";
import { loader as homeLoader } from "./pages/Home";
import { loader as statsLoader } from "./pages/ProgressReport";
import { action as addProject } from "./pages/Home";
import { loader as taskLoader } from "./pages/Dash";
import { action as addTask } from "./pages/Dash";
// import { loader as pmhomeLoader } from "./pages/PMHome";
// import { action as addPMProject } from "./pages/PMHome";
import { action as deleteTaskPage } from "./pages/deleteTaskPage";
import { loader as UpdateProjectPageLoader } from "./pages/updateProjectPage";
import { action as updateProjectPageAction } from "./pages/updateProjectPage";
import { loader as updateTaskPageLoader } from "./pages/updateTaskPage";
import { action as updateTaskPageAction } from "./pages/updateTaskPage";

const Router = createBrowserRouter ([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage />, action: loginAction },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Dash />,
            loader: taskLoader,
            action: addTask,
          },
          {
            path: "dash",
            element: <Home />,
            loader: homeLoader,
            action: addProject,
          },
          {
            path: "progress-report",
            element: <ProgressReport />,
            loader: statsLoader,
          },
          {
            path: "database",
            element: <Database />,
            action: addUserAction,
            loader: databaseLoader,
          },
          { path: "delete-user/:id", action: deleteUserAction },
          { path: "delete-project/:id", action: deleteProjectAction },
          { path: "project-status/:id", action: updateProjectStatusAction },
          { path: "delete-task/:id", action: deleteTaskPage },
          {
            path: "update-project/:id",
            element: <UpdateProjectPage />,
            loader: UpdateProjectPageLoader,
            action: updateProjectPageAction,
          },
          {
            path: "update-task/:id",
            element: <UpdateTaskPage />,
            loader: updateTaskPageLoader,
            action: updateTaskPageAction,
          },
          // {
          //   path: "pmhome",
          //   element: <PMHome />,
          //   loader: pmhomeLoader,
          //   action: addPMProject,
          // },
        ],
      },
    ],
  },

  // {
  //   path: "/about",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/about",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/about",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/about",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/about",
  //   element: <LandingPage />,
  // },
  // {
  //   path: "/about",
  //   element: <LandingPage />,
  // },
]);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
