import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import {log} from './utils';
import Routers from './router';
import App from './models/app';
// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError (error) {
    console.error('app onError -- ', error)
  },
});
log(...createLoading());
// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(App);

// 4. Router
app.router(Routers);

// 5. Start
app.start('#root');
