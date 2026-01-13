import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { ChartDataItem, ReportItem } from "../lib/types";
import { axiosClient } from "../lib/axiosClient";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function ReportDetailPage() {
  const params = useParams();
  const [report, setReport] = useState<ReportItem>();
  const [startDt, setStartDt] = useState<string>("2026-01-01");
  const [endDt, setEndDt] = useState<string>("2026-01-07");
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const chartOptions = useMemo(
    () => ({
      chart: { type: "line" },
      title: { text: "일별 판매 실적" },
      xAxis: {
        categories: chartData.map((item) => item.sale_date),
        title: { text: "날짜" },
      },
      yAxis: {
        title: { text: "금액" },
      },
      series: [
        {
          name: "판매량",
          data: chartData.map((item) => item.amount),
          color: "#2b908f",
        },
      ],
    }),
    [chartData]
  );

  useEffect(() => {
    axiosClient.get(`/reports/${params.reportId}`).then((res) => {
      setReport(res.data);
    });
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosClient
      .get("/chart-data", {
        params: {
          startDt,
          endDt,
        },
      })
      .then((res) => {
        setChartData(res.data);
      });
  };

  return (
    <main>
      {report && (
        <>
          <h1>{report.name}</h1>
          <form className="filter-container" onSubmit={handleSubmit}>
            <label>
              <span>조회시작일자</span>
              <input
                type="date"
                value={startDt}
                onChange={(e) => {
                  setStartDt(e.currentTarget.value);
                }}
              />
            </label>
            <label>
              <span>조회종료일자</span>
              <input
                type="date"
                value={endDt}
                onChange={(e) => {
                  setEndDt(e.currentTarget.value);
                }}
              />
            </label>
            <button type="reset">초기화</button>
            <button type="submit">조회</button>
          </form>
          <div>리포트 타입: {report.reportType}</div>
          {chartData.length > 0 ? (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          ) : (
            <p>조회결과가 없습니다.</p>
          )}
        </>
      )}
    </main>
  );
}
