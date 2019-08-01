const path = require('path');

// 初始化，构造上下文
module.exports = function init() {
  
  // 上下文
  const context = {
    config: {},
    _frame: {
      config: {},
    },
    _app: {
      config: {},
    },
  };

  console.log('加载框架配置中...');

  try {
    context._frame.config = require(path.join(__dirname, '..', 'src', 'index.json'));
  } catch (e) {
    new Error('找不到框架配置文件');
  }

  console.log('加载应用配置...');
  
  try {
    context._app.config = require(path.join(process.cwd(), 'src', 'app.json'));
  } catch (e) {
    console.warn('没有配置文件app.json，采用默认配置');
  }

  console.log('解析配置中...');

  context.config = {
    ...context._frame.config,
    ...context._app.config
  }

  return context;
}