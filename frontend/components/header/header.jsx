import React from 'react';
import { withRouter } from 'react-router';

class Header extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      menu: false
    };
    this._toggleMenu = this._toggleMenu.bind(this);
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


	render() {
		return (
      <header id="header" className="header">
        <div className="pull-left h-logo">
          <img src='https://s18.postimg.org/s0k7wgl11/logo_light.png'
               alt='Logo'
               className='logo' />
        </div>
        <div>
          <i className="fa fa-list sm-sidebar-icon"
             onClick={this._toggleMenu}
          ></i>
        </div>
      </header>
		);
	}

}

export default withRouter(Header);
