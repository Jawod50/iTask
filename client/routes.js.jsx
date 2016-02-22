import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import custom components
import Root from './global/components/Root.js.jsx';
import Landing from './static/landing/components/Landing.js.jsx';

//import Post

const routes =
      <Route path="/" component={Root} >
        <IndexRoute component={Landing} />
        {userRoutes}
        {postRoutes}
        {productRoutes}
      </Route>
;

export default routes;

import userRoutes from './modules/user/userRoutes.js.jsx';
import postRoutes from './modules/post/postRoutes.js.jsx';
import productRoutes from './modules/product/productRoutes.js.jsx';
