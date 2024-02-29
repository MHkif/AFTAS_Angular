import { IdentityDocumentType } from '../enums/identityDocType';

export interface User {
  num: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  nationality: string;
  accessionDate: Date;
  identityDocument: IdentityDocumentType;
  role: string;
  identityNumber: string;
  activate: boolean;
  token: string;
}

export interface UserReq {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  nationality: string;
  accessionDate: Date;
  identityDocument: string;
  identityNumber: string;
}

export interface PageUsers {
  content: Array<User>;
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: boolean;
  empty: boolean;
}
