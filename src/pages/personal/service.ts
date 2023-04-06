import request from "@/utils/request";

class ServicePersonal {
  prefix = "/user";

  /**
   * 更新用户文件
   * @param data
   * @returns
   */
  update(params: any) {
    return request({
      method: "PUT",
      url: `${this.prefix}`,
      data: params
    });
  }

  password(params: any) {
    return request({
      method: "PUT",
      url: `${this.prefix}/password`,
      data: params
    });
  }
}

export default new ServicePersonal()