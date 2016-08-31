import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class DeleteForm extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      job_title: ''
    };
    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
    let deleteButton = document.getElementById("delete");
    if (this.props.delete) {
      deleteButton.style.height = "60px";
      document.getElementById("deleteForm").style.height = "50px";
    } else {
      if (deleteButton) {
        deleteButton.style.height = "40px";
        document.getElementById("deleteForm").style.height = "0px";
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

	handleSubmit(e){
		e.preventDefault();
		this.props.destroyApplication(this.props.application);
		this.props.router.push('/');
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
      <div className='form-container form-danger form-right' id='deleteForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
            <section className='form-input'>
              <span>Are you sure you want to do this? This can't be undone!</span>
            </section>
            <div className='form-button' onClick={this.handleSubmit}>
              <span>I'm Sure</span>
            </div>
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(DeleteForm);
