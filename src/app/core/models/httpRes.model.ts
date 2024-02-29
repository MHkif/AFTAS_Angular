export interface HttpRes {
  statusCode: number | null | undefined;
  path: string | any;
  status: string | any;
  message: string | any;
  developerMessage: string | any;
  timeStamp: Date | any;
  data: any;
}
