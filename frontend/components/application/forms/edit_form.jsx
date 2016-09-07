import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';
import { generateInput } from '../../../helper/form_helper';

class EditForm extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      job_title: '',
			submit: false,
			needToSet: true
    };
    this.update = this.update.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (this.state.submit) {
			this.setState({submit: false});
			if (newProps.errors.length < 1){
				$.notify('Application Updated', {
					position:'bottom left',
					className: 'success'
				});
				this.props.toggleParent();
			}
		}
	}

  componentDidUpdate(newProps) {
		if (this.state.needToSet && newProps.application.id) {
			this.setState({
				company: newProps.application.company,
				job_title: newProps.application.job_title,
				needToSet: false
			});
		}

    let editButton = document.getElementById("edit");
    if (this.props.edit) {
      editButton.style.height = "50px";
      document.getElementById("editForm").style.height = "200px";
    } else {
      if (editButton) {
        editButton.style.height = "40px";
        document.getElementById("editForm").style.height = "0px";
      }
    }
  }

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		this.setState({submit: true});
		let app = this.props.application;
		let updateInfo = {
			company: this.state.company,
			job_title: this.state.job_title
		};
		const application = merge({}, app, updateInfo);
		this.props.updateApplication(application);
	}

	render() {
		return (
      <div className='form-container form-primary form-left' id='editForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
            <section className='form-input'>
              {generateInput(this.state, 'company', this.update('comapny'))}
              {generateInput(this.state, 'job_title', this.update('job_title'))}
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

export default withRouter(EditForm);
