type UserItem = {
  id: number;
  username: string;
  name: string;
  password: string;
  enable: number;
  usertype: number;
};
type TreeItem = {
  id: number | string;
  manager: string;
  departmentName: string;
  introduce: string;
  email: string;
  createTime: string;
  pid: number | null;
  actions: string;
};
