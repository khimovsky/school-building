export interface ReportDTO {
  totalSum: number;
  dailySum: number;
  weekSum: number;
  params: {
    getFunction: string;
    hl: string;
  };
}
