import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

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
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
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

	_setClass(property) {
		if (this.state[property] === '') {
			return "";
		} else {
			return "input--filled";
		}
	}

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

  _generateInput(property) {
    return (
      <div className={this._setClass(property)}>
        <input className="input__field input__field--form"
          type={property}
          value={this.state[property]}
          onChange={this.update(property)} />
        <label className="input__label input__label--form"
               htmlFor={property}>
          <span className="input__label-content input__label-content--form">
            {this.humanize(property)}
          </span>
        </label>
      </div>
    );
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

	humanize(str) {
	  let frags = str.split('_');
	  for (let i=0; i < frags.length; i++) {
	    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	  }
	  return frags.join(' ');
	}

	render() {
		return (
      <div className='form-container form-primary form-left' id='editForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
            <section className='form-input'>
              {this._generateInput('company')}
              {this._generateInput('job_title')}
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
