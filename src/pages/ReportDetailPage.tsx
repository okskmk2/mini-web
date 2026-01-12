import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ReportItem } from "../lib/types";
import { axiosClient } from "../lib/axiosClient";

export default function ReportDetailPage() {
  const params = useParams();
  const [report, setReport] = useState<ReportItem>();
  useEffect(() => {
    axiosClient.get(`/reports/${params.reportId}`).then((res) => {
      setReport(res.data);
    });
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main>
      {report && (
        <>
          <h1>{report.name}</h1>
          <form className="filter-container" onSubmit={handleSubmit}>
            <label>
              <span>조회시작일자</span>
              <input type="date" />
            </label>
            <label>
              <span>조회종료일자</span>
              <input type="date" />
            </label>
            <button type="reset">초기화</button>
            <button type="submit">조회</button>
          </form>
          <div>리포트 타입: {report.reportType}</div>
        </>
      )}
    </main>
  );
}
