import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

import SidebarContainer from './sidebar/sidebar_container';
import HeaderContainer from './header/header_container';

class App extends React.Component {
  constructor (props) {
    super(props);
    this._returnHome = this._returnHome.bind(this);
  }

  _returnHome(){
    this.props.router.push('/');
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <div className='app'>
          <SidebarContainer />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
