module.exports = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'laptop',
  },
  {
    key: 'articles',
    name: 'Article Manage',
    icon: 'book',
    clickable:true,
    child:[
      {key:'list',name:'Article List', icon:'bars'},
      {key:'category',name:'Category List', icon:'bars'},
      {key:'tag',name:'Label Tag', icon:'bars'}
    ]
  },
  {
    key:'ss',
    name:'SS Manage',
    icon:'laptop'
  }
];
