import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ReportItem } from "../lib/types";

export default function ReportDetailPage() {
  const params = useParams();
  const [report, setReport] = useState<ReportItem>();
  useEffect(() => {
    axios.get(`/reports/${params.reportId}`).then((res) => {
      setReport(res.data);
    });
  }, [params]);

  return (
    <main>
      {report && (
        <>
          <h1>{report.name}</h1>
          <div>{report.reportType}</div>
        </>
      )}
    </main>
  );
}
