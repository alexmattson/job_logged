import React from 'react';
import { withRouter } from 'react-router';
import { isEmpty } from 'lodash';

class Header extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      menu: false
    };
    this._toggleMenu = this._toggleMenu.bind(this);
	}

	componentDidUpdate() {
		if (this.props.applications) {
			$( "#searchbar" ).select2({
				templateResult: formatApplication,
				placeholder: 'Search Applications',
				allowClear: true,
				dropdownCssClass: "search-dropdown"
			});

			$( "#searchbar" ).on("change", (e) => {
				this.props.router.push(`/application/${e.target.value}`);
			});

			let apps = this.props.applications.all;
			let formatApplication = (app) => {
				if (!app.id) { return app.text; }
				let id = app.id;
				var $app = $(
					'<div class="company">' +
						apps[id].company +
					'</div>' +
					'<div>' +
						apps[id].job_title +
					'</div>'
				);
				return $app;
			};
		}
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

	_formatAppOptions() {
		let apps = this.props.applications;
		if (!isEmpty(apps)) {
			apps = Object.keys(apps).map(id => {
				return apps[id];
			});
			apps = apps.map(app => {
				return (
					<option value={app.id} key={`${app.company}${app.id}`}>
						{app.company} | {app.job_title}
					</option>
				);
			});
			return apps;
		} else {
			return;
		}
	}

	render() {
		return (
      <header id="header" className="header">
        <div className="pull-left h-logo">
          <img src='https://s16.postimg.io/4gxl6aq1x/logo_light.png'
               alt='Logo'
               className='logo' />
        </div>

				<select className="searchbar"
								id='searchbar'>
					<option></option>
					{this._formatAppOptions()}
				</select>

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
