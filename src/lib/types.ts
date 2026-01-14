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

export interface ChartDataItem {
  sale_date: string;
  amount: number;
}

export enum ChatType {
  USER = "U",
  AI = "A",
}

export enum ChatStatus {
  PEND,
  PROCESS,
  ERROR,
  DONE,
}

export interface ChatItem {
  chatType: ChatType;
  text: string;
  chatStatus?: ChatStatus;
}
