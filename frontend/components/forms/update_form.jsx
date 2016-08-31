import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class UpdateForm extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      job_title: '',
			progress: '',
			choseCompany: false
    };
    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this._handleBack = this._handleBack.bind(this);
		this._previousActionButton = this._previousActionButton.bind(this);
		this._nextActionButton = this._nextActionButton.bind(this);
		this._inputFields = this._inputFields.bind(this);
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

  componentDidUpdate() {
    let updateButton = document.getElementById("update");
    if (this.props.update) {
      updateButton.style.height = "60px";
      document.getElementById("updateForm").style.height = "200px";
    } else {
      if (updateButton) {
        updateButton.style.height = "40px";
        document.getElementById("updateForm").style.height = "0px";
      }
    }
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

	_previousActionButton() {
		if (this.state.choseCompany) {
			return (
				<div className='form-button-back' onClick={this._handleBack}>
					<span>Back</span>
				</div>
			);
		} else { return (<div></div>); }
	}

	_nextActionButton() {
		if (this.state.choseCompany) {
			return (
				<div className='form-button' onClick={this.handleSubmit}>
					<span>Submit</span>
				</div>
			);
		} else {
			return (
				<div className='form-button' onClick={this.handleSubmit}>
					<span>Next</span>
				</div>
			);
		}
	}

	_inputFields() {
		if (this.state.choseCompany) {
			return (
				<section className='form-input'>
					{this._generateInput('progress')}
				</section>
			);
		} else {
			return (
				<section className='form-input'>
					{this._generateInput('company')}
					{this._generateInput('job_title')}
				</section>
			);
		}
	}

	_handleBack(e) {
		e.preventDefault();
		this.setState({choseCompany: false});
	}

	handleSubmit(e){
		e.preventDefault();
		if (this.state.choseCompany) {
			let apps = this.props.applications;
			let application;
			Object.keys(apps).forEach(id => {
				if (apps[id]['company'] === this.state.company &&
						apps[id]['position'] === this.state.position &&
						!application) {
							application = apps[id];
						}
			});
			this.props.updateApplication(
				merge({}, application, this.state)
			);
		} else {
			this.setState({choseCompany: true});
		}
	}

	humanize(str) {
	  let frags = str.split('_');
	  for (let i=0; i<frags.length; i++) {
	    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	  }
	  return frags.join(' ');
	}

	render() {
		return (
      <div className='form-container form-info' id='updateForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
						{this._previousActionButton()}
						{this._inputFields()}
						{this._nextActionButton()}
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(UpdateForm);
