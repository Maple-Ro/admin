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
    key: 'articles',
    name: 'Article Manage',
    icon: 'book',
    clickable:false,
    child:[
      {
        key: 'list',
        name: 'article list',
        icon: 'bars',
      },
      {
        key: 'new',
        name: 'create article',
        icon: 'edit',
      }
    ]
  },
];
