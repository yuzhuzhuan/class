import request from '@/utils/request';

const service = {
  query(params: any) {
    return request.get('/areainfo', { params });
  },
};

export default service;
