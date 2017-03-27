import dva from 'dva';
import './index.css';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history'

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }), // 去除 _k
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
// app.router(require('./router'));
app.router(require('./components/Example'))

// 5. Start
app.start('#root');
