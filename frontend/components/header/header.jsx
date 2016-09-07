import React from 'react';
import { withRouter } from 'react-router';
import { isEmpty } from 'lodash';

import Searchbar from './searchbar';

class Header extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      menu: false
    };
    this._toggleMenu = this._toggleMenu.bind(this);
		this.goHome = this.goHome.bind(this);
	}

  _toggleMenu() {
    if (this.state.menu) {
      document.getElementById("sidebar").className = "sidebar";
      this.setState({menu: false});
    } else {
      document.getElementById("sidebar").className = "sidebar show";
      this.setState({menu: true});
    }
  }

	goHome() {
		this.props.router.push('/');
	}

	render() {
		return (
      <header id="header" className="header">
        <div className="pull-left h-logo">
          <img src='https://s16.postimg.io/4gxl6aq1x/logo_light.png'
               alt='Logo'
               className='logo'
							 onClick={this.goHome}/>
        </div>

				<Searchbar pathname={this.props.location.pathname}
									 applications={this.props.applications}/>

        <div className='sidebar-icon'>
          <i className="fa fa-list sm-sidebar-icon"
             onClick={this._toggleMenu}
          ></i>
        </div>
      </header>
		);
	}

}

export default withRouter(Header);
