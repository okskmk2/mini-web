import { createBrowserRouter } from "react-router";
import GnbLayout from "./layouts/GnbLayout";
import ReportLayout from "./layouts/ReportLayout";
import BlankLayout from "./layouts/BlankLayout";
import MainPage from "./pages/MainPage";
import ReportMainPage from "./pages/report/ReportMainPage";
import AgentMainPage from "./pages/agent/AgentMainPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import ReportDetailPage from "./pages/report/ReportDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GnbLayout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: "/report",
        Component: ReportLayout,
        children: [
          {
            index: true,
            Component: ReportMainPage,
          },
          {
            path: ":reportId",
            Component: ReportDetailPage,
          },
        ],
      },
      {
        path: "/agent",
        Component: AgentMainPage,
      },
    ],
  },
  {
    path: "/",
    Component: BlankLayout,
    children: [
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
