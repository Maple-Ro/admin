import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
// import pathToRegexp from 'path-to-regexp'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const handleChildRoute = ({ location, params, routes }) => {
    // console.log(location, params, routes)
  };
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, callback) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'));
          callback(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'));
              callback(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },
        {
          path: 'articles/list',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/articles'));
              callback(null, require('./routes/articles'))
            }, 'articles')
          },
        },
        {
          path: 'articles/post',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/articles'));
              callback(null, require('./routes/articles/post'))
            }, 'post')
          },
        },
        {
          path: 'articles/category',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/articles'));
              callback(null, require('./routes/articles/category'))
            }, 'category')
          },
        },{
          path: 'articles/tag',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/articles'));
              callback(null, require('./routes/articles/tag'))
            }, 'tag')
          },
        },{
          path: 'ss',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'));
              callback(null, require('./routes/dashboard/ss'))
            }, 'ss')
          },
        },
        {
          path: '*',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              callback(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ];

  routes[0].childRoutes.map(item => {
    item.onEnter = handleChildRoute;
    return item
  });

  return <Router history={history} routes={routes} />
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers
