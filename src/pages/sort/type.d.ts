interface IForm {
  name: string;
  manager: string;
  introduce: string;
  id?: number;
  pid?: number | null;
  email: string;
  createTime: string;
}

interface IDialogData {
  id: number;
  label: string;
  children?: object[];
  pid?: number;
}

interface IList {
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

interface IChildren {
  createTime: string;
  email: string;
  id: string;
  introduce: string;
  label: string;
  manager: string;
  departmentName: string;
  pid: number;
}
interface SortItem {
  id: number;
  name: string;
  phone: number;
  email: string;
  address: string;
  index: string;
  actions: string;
}
