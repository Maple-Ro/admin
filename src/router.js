import React, { PropTypes } from 'react'
import { Router } from 'dva/router'
// import pathToRegexp from 'path-to-regexp'
import App from './routes/app'

const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
};

const Routers = function ({ history, app }) {
  const handleChildRoute = ({ location, params, routes }) => {
    console.log(location, params, routes)
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
        }, {
          path: 'users',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'));
              callback(null, require('./routes/users/'))
            }, 'users')
          },
        },{
          path: 'articles/list',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/articles'));
              callback(null, require('./routes/articles'))
            }, 'list')
          },
        },{
          path: 'articles/new',
          getComponent (nextState, callback) {
            require.ensure([], require => {
              registerModel(app, require('./models/articles'));
              callback(null, require('./routes/articles/create'))
            }, 'new')
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
