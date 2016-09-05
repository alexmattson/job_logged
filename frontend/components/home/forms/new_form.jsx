import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class NewFrom extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      job_title: '',
			submit: false
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
		const application = merge({}, this.state, {progress: 'application'});
		this.props.createApplication({application});
		this.setState({submit: true});
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
      <div className='form-container form-primary form-left' id='newForm'>
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

export default withRouter(NewFrom);
