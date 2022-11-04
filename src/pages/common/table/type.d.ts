export type Params = {
   pageSize: number;
   pageIndex: number;
   name: string;
}
export type UserData = {
   name: string;
   idCard: string;
   email: string;
   gender: number | string;
   address: string;
   createTime: string;
   phone: string;
   id: string;
}

export type IForm = {
   name: string;
   gender: number | string;
   phone: string;
   idCard: string;
   address: string;
   email: string;
   id: string;
   createTime: string;
}
