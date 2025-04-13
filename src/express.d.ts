declare module 'express' {
  interface Request {
    id: string;
    [key: string]: any;
  }
}
