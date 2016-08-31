import React from 'react';
import { withRouter } from 'react-router';
import merge from 'lodash/merge';

import NewFrom from './forms/new_form';

class HomeButtonGroup extends React.Component {
	constructor(props){
		super(props);
    this.nullState = {
      new: false,
      update: false,
      reject: false,
      offer: false
    };
    this.state = this.nullState;
    this._toggle = this._toggle.bind(this);
	}


  _toggle(form) {
    return (() => {
      if (this.state[form]) {
        this.setState(this.nullState);
      } else {
        let newState = merge({}, this.nullState, {[form]: true});
        this.setState(newState);
      }
    }).bind(this);
  }


	render() {
		return (
      <div>
        <div className='button-group'>
          <button className="btn btn-primary btn-lg"
                  id='new'
                  onClick={this._toggle('new')}>
            Sent An Application
          </button>
          <button className="btn btn-success btn-lg">
            Made Progress
          </button>
          <button className="btn btn-danger btn-lg">
            Rejected
          </button>
        </div>
        <NewFrom new={this.state.new} />
        <button className="btn btn-success btn-lg btn-full">
          Recieved An Offer
        </button>
      </div>
		);
	}

}

export default withRouter(HomeButtonGroup);
