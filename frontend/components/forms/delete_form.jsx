import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class DeleteForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidUpdate() {
    let deleteButton = document.getElementById("delete");
    if (this.props.delete) {
      deleteButton.style.height = "50px";
      document.getElementById("deleteForm").style.height = "50px";
    } else {
      if (deleteButton) {
        deleteButton.style.height = "40px";
        document.getElementById("deleteForm").style.height = "0px";
      }
    }
  }

	handleSubmit(e){
		e.preventDefault();
		this.props.destroyApplication(this.props.application);
		this.props.router.push('/');
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
