import React from 'react';
import { withRouter } from 'react-router';


class NewFrom extends React.Component {
	constructor(props){
		super(props);
    this.state = {
      company: '',
      position: ''
    };
    // this._newApplication = this._newApplication.bind(this);
    this.update = this.update.bind(this);
    this._setClass = this._setClass.bind(this);
    this._generateInput = this._generateInput.bind(this);
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
    let newButton = document.getElementById("new");
    if (this.props.new) {
      newButton.style.height = "60px";
      document.getElementById("newForm").style.height = "200px";
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
               for={property}>
          <span className="input__label-content input__label-content--form">
            {property.toUpperCase()}
          </span>
        </label>
      </div>
    );
  }

	render() {
		return (
      <div className='form-container form-primary' id='newForm'>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
            <section className='form-input'>
              {this._generateInput('company')}
              {this._generateInput('position')}
            </section>
            <div className='form-button'>
              <span>Submit</span>
            </div>
          </form>
        </div>
      </div>
		);
	}

}

export default withRouter(NewFrom);
