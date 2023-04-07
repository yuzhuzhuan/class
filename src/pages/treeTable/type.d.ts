export interface IForm {
  name: string;
  manager: string;
  introduce: string;
  id?: number;
  pid?: number | null;
  email: string;
  createTime: string;
}

export interface IDialogData {
  id: number;
  label: string;
  children?: object[];
  pid?: number;
}

export interface IList {
  children?: IChildren[];
  createTime: string;
  email: string;
  id: string;
  introduce: string;
  label?: string;
  manager: string;
  departmentName: string;
  pid: number;
}

export interface IChildren {
  createTime: string;
  email: string;
  id: string;
  introduce: string;
  label: string;
  manager: string;
  departmentName: string;
  pid: number;
}
