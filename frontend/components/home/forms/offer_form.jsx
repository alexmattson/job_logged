import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class OfferForm extends React.Component {
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
				$.notify('Nice Work on the Offer!', {
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
    let offerButton = document.getElementById("offer");
    if (this.props.offer) {
      offerButton.style.height = "50px";
      document.getElementById("offerForm").style.height = "150px";
    } else {
      if (offerButton) {
        offerButton.style.height = "40px";
        document.getElementById("offerForm").style.height = "0px";
      }
    }

		if (this.props.applications) {
			$( "#dropdownOffer" ).select2({
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

	handleSubmit(e){
		e.preventDefault();
		let applicationId = $( ".progress-search" )[0].value;
		let app = this.props.applications.all[applicationId];
		const application = merge({}, app, {progress: 'offer'});
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
      <div className='form-container form-success form-right form-left'
					 id='offerForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						<section className='form-input progress-form'>
							<select className="progress-search"
											id='dropdownOffer' >
								{this._formatAppOptions()}
							</select>
							<span className='label'>Which application has an offer?</span>
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

export default withRouter(OfferForm);
