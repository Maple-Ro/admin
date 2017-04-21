module.exports = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'laptop',
  },
  {
    key: 'users',
    name: 'User Manage',
    icon: 'user',
  },{
    key: 'Articles',
    name: 'Article Manage',
    icon: 'book',
    clickable:false,
    child:[
      {
        key: 'article-list',
        name: 'article list',
        icon: 'bars',
      },
      {
        key: 'create-article',
        name: 'create article',
        icon: 'edit',
      }
    ]
  },
];
