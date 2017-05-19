import React, {PropTypes} from 'react';
import {connect} from 'dva';

import ArticleList from './list';
import ArticleNew from './new';

function Article({location, dispatch, loading, articles}) {

}


export default connect(({articles, loading})=>({articles, loading:loading.models.articles}))(Article);
