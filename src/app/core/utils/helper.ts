import { MatDialogConfig } from "@angular/material/dialog";

export const APP_KEYS = {
  authToken: 'myToken',
  tokenExpiry: 'tokenExpiry',
  loggedinUser: 'loggedinUser',
};

export const MESSAGES = {
  GENERIC_ERROR: 'An error occured during processing the request',
};

export const STATIC_VALUES = {
  snackbarHideDuration: 3000, // in ms
};

export interface AppHttpResponse {
  status: number;
  data?: any;
  message?: string;
}

export interface IBaseEntity {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface IBaseFilter {
  searchString: string;
  page: number;
  limit: number;
}

export interface IPagination {
  fromItem: number;
  toItem: number;
  totalItems: number;
  page: number;
  limit: number;
}

export const PAGE_LIMIT = 20;

export const REGEX = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  mobileNo: /^\d{10}$/,
  phoneNo: /[6789][0-9]{9}/,
  pinCode: /^[0-9]{6}$/,
  aadhaarNo: /^[0-9]{12}$/,
  panCard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  voterId: /^[A-Z]{3}[0-9]{7}$/,
  rationCard: /^[A-Z]{2}[0-9]{12}$/,
  drivingLicence: /^[A-Z]{2}[0-9]{13}$/,
  positiveInteger: /^[1-9]\d*(\.\d+)?$/,
  humanName: /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/,
  userName: /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-.]?)+$/,
  specialCharacters: /[a-zA-Z0-9]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,15}$/,
  code: /^([a-zA-Z_.][a-zA-Z0-9_.]*?)+$/,
  alphanumericWithSpeicalChar: /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 -:@%]*)?$/,
  projectCode: /^[a-zA-Z_][a-zA-Z0-9_]{0,62}$/,
};


export const DEFAULT_DIALOG_CONFIGS: MatDialogConfig = {
  width: '30%',
  disableClose: true,
  autoFocus: false
};

export type IHttpState = { [key: string]: any };
