export enum ReportType {
  MSTR = "MR",
  WEB = "WB",
  HYBRID = "MX",
}

export interface ReportItem {
  id: number;
  name: string;
  reportType: ReportType;
}
