import { createBrowserRouter } from "react-router";
import GnbLayout from "./components/GnbLayout";
import MainPage from "./pages/MainPage";
import ReportMainPage from "./pages/ReportMainPage";
import AgentMainPage from "./pages/AgentMainPage";
import ReportLayout from "./components/ReportLayout";
import NotFoundPage from "./pages/error/NotFoundPage";
import BlankLayout from "./components/BlankLayout";
import ReportDetailPage from "./pages/ReportDetailPage";

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
