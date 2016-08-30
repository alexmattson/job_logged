import React from 'react';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from './app';


class AppRouter extends React.Component{
  constructor(props){
    super(props);
  }


  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>

        </Route>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
