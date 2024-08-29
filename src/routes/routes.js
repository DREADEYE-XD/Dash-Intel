import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { ErrorPage } from "../pages/errorPage";
import { GraphView } from "../ui/dashboard/graphView";
import { SkeletonDash } from "../ui/dashboard/skeletonDash";
import FrameTimeGraph from "../components/graphView/mainGraphs/frameTimeGraph";
import FpsGraph from "../components/graphView/mainGraphs/fpsGraph";
import SkeletonGraph from "../components/graphView/mainGraphs/skeletonGraph";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    // children: [
    //   { index: true, element: <Home /> },
    //   { path: "home", element: <Home /> },
    //   { path: "menu", element: <Menu /> },
    //   { path: "product/:category/:id", element: <Product /> },
    // ],
    children: [
      {
        path: "/",
        element: <SkeletonDash />,
      },
      {
        path: "analysis",
        element: <SkeletonGraph/>
      },
      {
        path: "analysis/:gameName",
        element: <GraphView />,
        children: [
          {
            path: "",
            element: <FrameTimeGraph />,
          },
          {
            path: "frameTimeGraph",
            element: <FrameTimeGraph />,
          },
          {
            path: "fpsGraph",
            element: <FpsGraph />,
          },
        ],
      },
    ],
  },
]);
