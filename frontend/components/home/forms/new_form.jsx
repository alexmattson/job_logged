import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';
import { generateInput } from '../../../helper/form_helper';

class NewFrom extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      job_title: '',
			submit: false
    };
    this.update = this.update.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (this.state.submit) {
			this.setState({submit: false});
			if (newProps.errors.length < 1){
				$.notify('Application Created', {
					position:'bottom left',
					className: 'success'
				});
				this.props.router.push(`/application/${newProps.applications.current.id}`);
			}
		}
	}

  componentDidUpdate(newProps, nextProps) {
    let newButton = document.getElementById("new");
    if (this.props.new) {
      newButton.style.height = "50px";
      document.getElementById("newForm").style.height = '200px';
    } else {
      if (newButton) {
        newButton.style.height = "40px";
        document.getElementById("newForm").style.height = "0px";
      }
    }
  }

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		const application = merge({}, this.state, {progress: 'application'});
		this.props.createApplication({application});
		this.setState({submit: true});
	}

	render() {
		return (
      <div className='form-container form-primary form-left' id='newForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
            <section className='form-input'>
              {generateInput(this.state, 'company', this.update('company'))}
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

export default withRouter(NewFrom);
