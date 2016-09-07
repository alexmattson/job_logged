import React from 'react';
import { withRouter, hashHistory } from 'react-router';
import { isEmpty } from 'lodash';

class Searchbar extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		if (this.props.applications) {
			let $search = $( "#searchbar" ).select2({
				templateResult: formatApplication,
				placeholder: 'Search Applications',
				allowClear: true,
				dropdownCssClass: "search-dropdown"
			});

			$( "#searchbar" ).on('change', (e) => {
        if (self.dataAdapter !== null) {
  				if (e.target.value !== '') {
  					hashHistory.push(`/application/${e.target.value}`);
  					// $search.select2('val', '');
  				}
        }
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
    if (this.props.pathname === '/login' ||
				this.props.pathname === '/signup') {
			return;
		} else {
			return (
				<select className="searchbar"
								id='searchbar'>
					<option></option>
					{this._formatAppOptions()}
				</select>
			);
		}
	}

}

export default withRouter(Searchbar);
