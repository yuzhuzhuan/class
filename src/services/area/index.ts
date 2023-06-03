import request from '@/plugins/axios';

const service = {
  query(params: any) {
    return request.get('/areainfo', { params });
  },
};

export default service;
