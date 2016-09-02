import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

class DeleteForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidUpdate() {
    let deleteButton = document.getElementById(
			`deleteEvent${this.props.event.id}`
		);
    if (this.props.deleteEvent) {
      document.getElementById(
				`deleteEvent${this.props.event.id}Form`
			).style.height = "50px";
			document.getElementById(
				`event${this.props.event.id}`
			).style.overflow = "hidden";
			document.getElementById(
				`event${this.props.event.id}`
			).style['max-height'] = "0px";
    } else {
      if (deleteButton) {
        document.getElementById(
					`deleteEvent${this.props.event.id}Form`
				).style.height = "0px";
				document.getElementById(
					`event${this.props.event.id}`
				).style.overflow = "scroll";
				document.getElementById(
					`event${this.props.event.id}`
				).style['max-height'] = "100px";
      }
    }
  }

	handleSubmit(e){
		e.preventDefault();
		let event = merge({},
										 	this.props.event,
											{application_id: this.props.applicationId})
		this.props.destroyEvent(event);
		this.props.toggleParent();
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
      <div className='form-container form-danger form-right'
					 id={`deleteEvent${this.props.event.id}Form`}>
        <div className='form-buffer'>
          <form className="content bgcolor-5 form">
            <section className='form-input'>
              <span>Are you sure you want to do this?</span>
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
