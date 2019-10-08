export interface Response {
  data: {
    [item: string]: any;
    token: string;
  };
  success: boolean;
}
