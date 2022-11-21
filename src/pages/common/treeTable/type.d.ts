export type IForm = {
    name: string;
    manager: string;
    introduce: string;
    id?: number;
    pid?: number | null;
    email: string;
    createTime: string;
}

export type IDialogData = {
    id: number;
    label: string;
    children?: object[];
    pid?: number;
}

export type IList = {
    children?: IChildren[];
    createTime: string;
    email: string;
    id: string;
    introduce: string;
    label?: string;
    manager: string;
    name: string;
    pid: number;
}

export type IChildren = {
    createTime: string;
    email: string;
    id: string;
    introduce: string;
    label: string;
    manager: string;
    name: string;
    pid: number;
}
