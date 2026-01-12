import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import type { ReportItem } from "../lib/types";
import { axiosClient } from "../lib/axiosClient";

export default function ReportLayout() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  useEffect(() => {
    axiosClient.get("/reports").then((res) => {
      setReports(res.data);
    });
  }, []);
  return (
    <div className="ReportLayout">
      <aside>
        {reports.map((report, i) => (
          <NavLink key={"report" + i} to={`/report/${report.id}`}>
            {report.name}
          </NavLink>
        ))}
      </aside>
      <Outlet />
    </div>
  );
}
