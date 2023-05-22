interface UserItem {
  id: number;
  username: string;
  name: string;
  password: string;
  enable: number;
  usertype: number;
  actions: string;
}
interface TreeItem {
  id: number | string;
  manager: string;
  departmentName: string;
  introduce: string;
  email: string;
  createTime: string;
  pid: number | null;
  actions: string;
}
