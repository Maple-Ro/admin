import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import {log} from './utils';
// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError (error) {
    console.error('app onError -- ', error)
  },
})
console.log('c_loading', {...createLoading()});
log({...createLoading()});
// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(require('./models/app'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
