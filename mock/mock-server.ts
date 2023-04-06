const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const path = require('path');
const MockServer = require('mockjs');

const mockDir = path.join(process.cwd(), 'mock');

// 注册接口路由，每增加一个路由，app._router.stack就增加一个堆栈
function registerRoutes(app) {
  let mockLastIndex;
  let count = 0;
  const { mocks } = require('./index.ts');
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });

  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
    count++;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
    start: app._router.stack.length - count,
    count,
  };
}

// 删除对应的接口路由缓存
function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

// // for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${url}`),
    type: type || 'get',
    response(req, res) {
      console.log(`request invoke:${req.path}`);
      res.json(MockServer.mock(respond instanceof Function ? respond(req, res) : respond));
    },
  };
};
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  //   let mockRoutes = registerRoutes(app);
  //   let { mockRoutesLength } = mockRoutes;
  //   let { mockStartIndex } = mockRoutes;

  let { mockRoutesLength, mockStartIndex } = registerRoutes(app);
  let { start, count } = registerRoutes(app);

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;
          start = mockRoutes.start;
          count = mockRoutes.count;

          // console.log(
          //   chalk.magentaBright(
          //     `\n > Mock Server hot reload success! changed  ${path}`
          //   )
          // );
        } catch (error) {
          // console.log(chalk.redBright(error));
        }
      }
    });
};
