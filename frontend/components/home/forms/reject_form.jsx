import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class RejectForm extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      job_title: '',
			applicationId: '',
			submit: false
    };
		this.handleSubmit = this.handleSubmit.bind(this);
		this._formatAppOptions = this._formatAppOptions.bind(this);
	}

	componentWillReceiveProps(newProps, newState, x) {
		if (this.state.submit) {
			this.setState({submit: false});
			if (newProps.errors.length < 1){
				$.notify('The Beatles were turned down before they made it!', {
					position:'bottom left',
					className: 'success'
				});
				debugger
				// Redirect
				this.props.router.push(`/application/${this.state.applicationId}`);

			}
		}
	}

  componentDidUpdate() {
    let rejectButton = document.getElementById("reject");
    if (this.props.reject) {
      rejectButton.style.height = "50px";
      document.getElementById("rejectForm").style.height = "150px";
    } else {
      if (rejectButton) {
        rejectButton.style.height = "40px";
        document.getElementById("rejectForm").style.height = "0px";
      }
    }


		if (this.props.applications) {
			$( "#dropdownReject" ).select2({
				templateResult: formatApplication
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

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		let applicationId = $( ".progress-search" )[0].value;
		let app = this.props.applications.all[applicationId];
		const application = merge({}, app, {progress: 'rejected'});
		this.props.updateApplication(application);

		this.setState({
			submit: true,
			applicationId
		});
	}

	_formatAppOptions() {
		let apps = this.props.applications;
		if (apps) {
			apps = Object.keys(apps.all).map(id => {
				return apps.all[id];
			});
			apps = apps.map(app => {
				return (
					<option value={app.id} key={`${app.company}${app.id}`}>
						{app.company} | {app.job_title}
					</option>
				);
			});
		}
		return apps;
	}

	render() {
		return (
      <div className='form-container form-danger form-right' id='rejectForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						<section className='form-input progress-form'>
							<select className="progress-search"
											id='dropdownReject' >
								{this._formatAppOptions()}
							</select>
							<span className='label'>Which application was rejected?</span>
						</section>
            <div className='form-button' onClick={this.handleSubmit}>
              <span>Submit</span>
            </div>
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(RejectForm);
