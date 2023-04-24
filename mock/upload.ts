module.exports = [
  {
    url: '/url/upload',
    type: 'post',
    response: () => {
      setTimeout(() => {
        return {
          data: '上传成功',
          msg: '上传成功',
          code: 200,
        };
      }, 5000);
    },
  },
];
