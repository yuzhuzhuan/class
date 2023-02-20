const { lockfileVersion } = require('../package-lock.json');
const { engines } = require('../package');

if (lockfileVersion !== 2) {
  // 判断lockfileVersion版本，不是2就终止进程
  console.error(
    `Required node version ${engines.node} and npm version ${engines.npm}, And then please retry npm install.`,
  );
  process.exit(1);
}
